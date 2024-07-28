import React from 'react'
import './TransactionHeader.css'

const TransactionHeader = (props) => {
    return (
        <div className='transaction-header'>
            <div className="main-info">
                <h2>{props.title}</h2>
                <h2>RM {props.amount}</h2>
            </div>
            <div className="columns-expanses">
                <p className="table-data data-header">Name</p>
                <p className="table-data data-header">Type</p>
                <p className="table-data data-header">Amount</p>
                <p className="table-data data-header">Date</p>
                <p className="table-data data-header filler"></p>
            </div>
        </div>
    )
}

export default TransactionHeader
