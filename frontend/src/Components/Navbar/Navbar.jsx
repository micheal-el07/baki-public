import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const Navbar = (props) => {
    const transactions = props.allTransactions

    function exportPDF(transactions) {
        const unit = "pt"
        const size = "A4"
        const orientation = "potrait"

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size)

        doc.setFontSize(15)

        const title = "Transaction in current month"
        const headers = [["ID", "Name", "Amount", "Date"]]
        const data = transactions.map((item, i) => [i+1, item.name, item.amount, item.date])

        let content = {
            startY: 50,
            head: headers,
            body: data
        }

        // doc.text(title, marginLeft, 40)
        doc.text(title, marginLeft, 40)
        doc.autoTable(content)
        doc.save("Transaction.pdf")
    }

    return (
        <div className='navbar'>
            <div className="topPage">
                <div className="topPage-webName subTop">
                    <form action="/" method="get">
                        <Link style={{ textDecoration: "none", color: "black" }} to={"/"}><h1>Bayar</h1></Link>
                    </form>
                </div>
                <div className="topPage-date subTop mid-top">
                    <h2>
                        {props.fullDate}
                    </h2>
                </div>
                {props.location === "home" ?
                    <>
                        <div className="topPage-balance subTop mid-top">
                            <h2>
                                Balance: RM {(props.totalIncome - props.totalExpanses - props.dueAmount).toFixed(2)}
                            </h2>
                            <button onClick={() => exportPDF(transactions)}>
                                Get PDF
                            </button>
                        </div>
                        <div className="topPage-others subTop">
                            <form action="/add" method="get">
                                <button className="add-transaction">ADD</button>
                            </form>
                            <form action="/" method="get">
                                <button className="login-out"><img className="icon" alt=''></img></button>
                            </form>
                        </div>
                    </> :
                    <></>
                }
            </div>
        </div>
    )
}

export default Navbar
