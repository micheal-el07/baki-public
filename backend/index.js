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

// function getDate() {
//     let today = new Date();
//     const dayToday = today.getDate();
//     const monthNumber = today.getMonth() + 1;
//     const monthName = today.toLocaleString('default', { month: 'long' });
//     const yearToday = today.getFullYear();
//     const todayDate = `${dayToday} ${monthName} ${yearToday}`
//     let dateFormat = { day: dayToday, month: { monthName, monthNumber }, year: yearToday, fullDate: todayDate }
//     return dateFormat;
// }

// async function getTransaction() {
//     const date = getDate()
//     const result = await db.query(
//         "SELECT name, type, amount, TO_CHAR(date, 'DD/MM/YYYY') AS date FROM transactions");
//     return result.rows;
// }

// async function getTransactionByMonth(month) {
//     try {
//         const result = await db.query(
//             "SELECT id, name, type, amount, TO_CHAR(date, 'DD/MM/YYYY') AS date FROM transactions where extract(month from date) = $1",
//             [month]);
//         return result.rows;
//     } catch (err) {
//         console.log(err)
//     }

// }

// async function getRecurring() {
//     let dueAmount = 0;
//     const dateToday = getDate().day;
//     const result = await db.query(
//         "SELECT * FROM recurring");
//     const recurring = result.rows;
//     let dueDate = []
//     let alreadyDue = []
//     let dueItem = { name: "", due: 0 }
//     for (item of recurring) {
//         if (item.dayOfMonth > dateToday) {
//             dueDate.push(item)
//             dueAmount += item.amount
//         } else {
//             alreadyDue.push(item)
//         }
//     }
//     return { dueItems: dueDate, dueAmount: dueAmount, alreadyDue: alreadyDue };
// }

// async function getRecurringAll() {
//     const result = await db.query(
//         "SELECT * FROM recurring");
//     const recurring = result.rows;
//     return recurring;
// }

// async function carryForward() {
//     const date = getDate()
//     const expanses = await getTransactionByMonth(date.month.monthNumber-1);
//     let totalExpanses = 0
//     let totalIncome = 0
//     for (item of expanses) {
//         if (item.type === "expanses") {
//             totalExpanses += item.amount;
//         } else if (item.type === "income") {
//             totalIncome += item.amount
//         }
//     }
//     return { totalIncome: totalIncome, totalExpanses: totalExpanses }
// }

// async function getTotalExpanses() {
//     const lastMonth = carryForward()
//     const date = getDate();
//     const expanses = await getTransactionByMonth(date.month.monthNumber);
//     let totalExpanses = 0
//     let totalIncome = 0
//     for (item of expanses) {
//         if (item.type === "expanses") {
//             totalExpanses += item.amount;
//         } else if (item.type === "income") {
//             totalIncome += item.amount
//         }
//     }
//     return { totalIncome: totalIncome, totalExpanses: totalExpanses }
// }

// async function dueCrossCheck() {
//     const date = getDate();
//     let dueToPay = 0;
//     const allBill = await getRecurringAll();
//     const currentMonthExpanses = await getTransactionByMonth(date.month.monthNumber);
//     let dueBill = {};
//     const paidBill = [];
//     const unpaidBill = { upcoming: [], due: [] };
//     for (let item of allBill) {
//         let paid = false
//         for (let bill of currentMonthExpanses) {
//             if (bill.name === item.name) {
//                 paid = true
//             } else {
//             }
//         }
//         if (paid) {
//             paidBill.push(item)
//         } else {
//             dueToPay += item.amount
//             if (item.dayOfMonth > date.day) {
//                 unpaidBill.upcoming.push(item)
//             } else {
//                 unpaidBill.due.push(item)
//             }
//         }
//     }
//     return dueBill = { paid: paidBill, unpaid: unpaidBill, dueAmount:dueToPay }
// }

app.get('/user/:id', async (req, res) => {
    const id = req.params.id;
    const result = await db.query(
        "SELECT * FROM users WHERE id=$1", [id]
    );
    res.status(200).json(result.rows);
})

app.get('/transactions/:user', async (req, res) => {
    const user = req.params.user;
    console.log(user);
    try {
        const result = await db.query(
            "SELECT id, name, amount, type, userid, TO_CHAR(date, 'DD/MM/YYYY') AS date FROM transactions WHERE userid = $1",
            [user]
        );
        console.log(result.rows);
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(404).json("Error occur.");
    }
});

// Get transacton by month and user '/transaction/6/1' - 6 for june and 1 for user with id 1
app.get('/transactions/:month/:user', async (req, res) => {
    const user = req.params.user;
    const month = req.params.month;
    console.log(user, month);
    try {
        const result = await db.query(
            "SELECT id, name, type, amount, TO_CHAR(date, 'DD/MM/YYYY') AS date FROM transactions where extract(month from date) = $1 and userid = $2",
            [month, user]
        );
        console.log(result.rows);
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(404).json("Error occur.");
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
        res.status(404).json(err);
    }
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});