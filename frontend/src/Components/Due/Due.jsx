import React, { useContext } from 'react'
import './Due.css'
import TransactionHeader from '../TransactionHeader/TransactionHeader'
import { PageContext } from '../../Context/PageContext'
import Date from '../Date/Date.jsx'
import Transaction from '../Transaction/Transaction'

const Due = (props) => {
    const { recurring, allTransaction } = useContext(PageContext)
    const dateToday = Date
    let due_bills = { after_due: [], before_due: [] }

    for (let item_recurring of recurring) {
        let is_billed = false
        if (allTransaction.find((item) => item.name === item_recurring.name)) {
            is_billed = true
        }
        // Check if the items of recurring that have not yet paid is over the today day or not
        if (!is_billed) {
            if (item_recurring.dayOfMonth >= dateToday.day) { 
                due_bills.before_due.push(item_recurring)
            } else {
                due_bills.after_due.push(item_recurring)
            }
        }
    }

    return (
        <div className='due'>
            {/* amount={total_due} */}
            <TransactionHeader title={props.title} />
            <div className="to-due">
                <h3>To be Paid</h3>
                {due_bills.before_due.map((item, i) => {
                    return <Transaction key={i} id={item.id} name={item.name} type={item.type} amount={item.amount} date={item.date} />
                })}
            </div>
            <div className="pass-due">
                <h3>Pass Due</h3>
                {due_bills.after_due.map((item, i) => {
                    return <Transaction key={i} id={item.id} name={item.name} type={item.type} amount={item.amount} date={item.date} />
                })}
            </div>
        </div>
    )
}

export default Due
