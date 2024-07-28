const express = require('express');
const pg = require('pg');
const bodyParser = require('body-parser');
const env = require('dotenv');
var cors = require('cors');

const app = express();
const port = 4005;
env.config();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});
db.connect();

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
            "SELECT id, name, amount, type, userid, TO_CHAR(date, 'DD/MM/YYYY') AS date FROM transactions WHERE userid = $1",
            [user]
        );
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
            "SELECT id, name, type, amount, TO_CHAR(date, 'DD/MM/YYYY') AS date FROM transactions where extract(month from date) = $1 and userid = $2",
            [month, user]
        );
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json("Error occur on server side while fetching transactions of each month for a user.", err);
    }
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

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});