import React, { useContext, useEffect } from 'react'
import './Income.css'
import TransactionHeader from '../TransactionHeader/TransactionHeader'
import Transaction from '../Transaction/Transaction'

const Income = (props) => {
  var totalAmount = props.data.reduce((n, {amount}) => n + amount, 0)

  return (
    <div className='income'>
        <TransactionHeader title={props.title} amount={parseFloat(totalAmount).toFixed(2)} />

        {props.data.map((item, i) => {
            return <Transaction key={i} id={item.id} name={item.name} type={item.type} amount={item.amount} date={item.date} />
        })}
    </div>
  )
}

export default Income
