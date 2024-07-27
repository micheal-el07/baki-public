import React from 'react'
import './TransactionHeader.css'

const TransactionHeader = (props) => {
    return (
        <div className='transaction-header'>
            <div class="main-info">
                <h2>{props.title}</h2>
                <h2>RM {props.amount}</h2>
            </div>
            <div class="columns-expanses">
                <p class="table-data data-header">Name</p>
                <p class="table-data data-header">Type</p>
                <p class="table-data data-header">Amount</p>
                <p class="table-data data-header">Date</p>
                <p class="table-data data-header filler"></p>

            </div>
        </div>
    )
}

export default TransactionHeader
