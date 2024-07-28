import React, { useContext, useEffect, useState } from 'react'
import './Expanses.css'
import TransactionHeader from '../TransactionHeader/TransactionHeader'
import Transaction from '../Transaction/Transaction'

const Expanses = (props) => {
  var totalAmount = props.data.reduce((n, {amount}) => n + amount, 0)

  return (
    <div className='expanses'>
      <TransactionHeader title={props.title} amount={parseFloat(totalAmount).toFixed(2)} />

      {props.data.map((item, i) => {
          return <Transaction key={i} id={item.id} name={item.name} type={item.type} amount={item.amount} date={item.date} />
      })}
    </div>
  )
}

export default Expanses
