const express = require('express');
const pg = require('pg');
const bodyParser = require('body-parser');
const env = require('dotenv');
var cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');
const passport = require('passport');
const { Strategy } = require('passport-local');
const jwt = require('jsonwebtoken');

const app = express();
const port = 4005;
const saltRounds = 10;
env.config();
app.use(cors());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 1
        }
    })
)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});
db.connect();

app.post("/register", async (req, res) => {
    try {
        const { username: uname, password, name } = req.body;
        console.log(uname, password, name)
        const result = await db.query(
            "SELECT * FROM users WHERE username = $1", [uname,]
        )
        if (result.rows.length > 0) {
            res.status(404).json({ message: `User with username ${uname} already existed, please sign in.`, success: false })
        } else {
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                if (err) {
                    console.log("Error hashing the password!", err);
                } else {
                    const result = await db.query(
                        "INSERT INTO users (username, password, name) VALUES ($1, $2, $3) RETURNING *",
                        [uname, hash, name]
                    )
                    const user = result.rows[0];
                    res.status(200).json({message:user, success:true});
                }
            })
        }

    } catch (err) {
        res.status(500).json({message:"Error accessing database", success:false, errors:err})
    }
})

app.post("/login", async (req, res) => {
    try {
        const { username: usename, password } = req.body;
        const result = await db.query(
            "SELECT * FROM users WHERE username = $1",
            [usename,]
        );

        if (result.rows.length > 0) {
            const user = result.rows[0];
            const { username, temppass } = user;

            if (usename === username && password === temppass) {
                const data = {
                    user: {
                        id: user.id
                    }
                }
                const token = jwt.sign(data, 'secret_baki');
                res.json({ success: true, token })
            } else {
                res.json({ success: false, errors: "Wrong password!" })
            }
        }
    } catch (err) {
        res.status(404).json({ message: "Cannot login", result: "error", error: err })
    }
})


app.get('/user/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await db.query(
            "SELECT * FROM users WHERE id=$1", [id]
        );
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json("Error occur on server side while fetching a specific user.", err);
    }
})

app.get('/transactions/:user', async (req, res) => {
    const user = req.params.user;
    try {
        const result = await db.query(
            "SELECT id, name, amount, type, userid, TO_CHAR(date, 'DD/MM/YYYY') AS date FROM transactions WHERE userid = $1 ORDER BY date desc",
            [user]
        );
        console.log(result.rows)
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json("Error occur on server side while fetching all transactions for a user.", err);
    }
});

// Get transacton by month and user '/transaction/6/1' - 6 for june and 1 for user with id 1
app.get('/transactions/:month/:user', async (req, res) => {
    const user = req.params.user;
    const month = req.params.month;
    try {
        const result = await db.query(
            "SELECT id, name, type, amount, TO_CHAR(date, 'DD/MM/YYYY') AS date FROM transactions where extract(month from date) = $1 and userid = $2 ORDER BY date desc",
            [month, user]
        );
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json("Error occur on server side while fetching transactions of each month for a user.", err);
    }
})

app.post("/transaction/:user", async (req, res) => {
    const user = req.params.user;
    const name = req.body.name;
    const type = req.body.type;
    const amount = req.body.amount;
    const date = new Date() || req.body.date;
    try {
        const result = await db.query(
            "INSERT INTO transactions (name, type, amount, date, userid) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [name, type, amount, date, user])
        res.status(200).json(result.rows)
    } catch (err) {
        res.status(500).json(err);
    }
})

// app.post("/login", async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         const userWithUsername = await db.query(
//             "SELECT * FROM users WHERE username = $1", [username]
//         );
//     } catch (err) {
//         return res.status(500).json("Error finding user with username: ", username, err)
//     }

//     if (userWithUsername.rows = 0) {
//         return res.status(400).json({ message: `Username with name ${username} does not exist!`, status: "error" })
//     }

//     if (userWithUsername.rows > 0) {

//     }
// })

app.patch("/transaction/:id", async (req, res) => {
    const id = req.params.id;
    const target_query = await db.query("SELECT * FROM transactions WHERE id = $1", [id]);
    const target = target_query.rows[0];
    var hold_amount = req.body.amount
    if (req.body.amount == 0) {
        hold_amount = ""
    } else {
        hold_amount = req.body.amount
    }
    const name = req.body.name || target.name;
    const type = req.body.type || target.type;
    const amount = hold_amount || target.amount;
    const date = req.body.date || target.date;

    const result = await db.query("UPDATE transactions SET name=$1, type=$2, amount=$3, date=$4 WHERE id=$5 RETURNING *",
        [name, type, amount, date, id]
    )
    res.json(result.rows)
})

app.get("/recurring/:user", async (req, res) => {
    const user = req.params.user;
    try {
        const result = await db.query(
            "SELECT * FROM recurring WHERE userid = $1", [user]
        );
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json("Error occur on server side while fetching recurring for a user.", err);
    }
})

app.delete("/transaction/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await db.query(
            "DELETE FROM transactions WHERE id = $1", [id]
        )
        res.status(200).json("Ok")
    } catch (err) {
        res.status(500).json("Error occur on server side while fetching deleting specific application.", err);
    }
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});