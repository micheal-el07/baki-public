import React, { useContext } from 'react'
import './Income.css'
import TransactionHeader from '../TransactionHeader/TransactionHeader'
import { PageContext } from '../../Context/PageContext'
import Transaction from '../Transaction/Transaction'

const Income = (props) => {
  const { allTransaction } = useContext(PageContext)

  var totalAmount = 0
  {
    allTransaction.map((item) => {
      if (item.type === "income") {
        totalAmount += item.amount
      }
    })
  }

  return (
    <div className='income'>
        <TransactionHeader title={props.title} amount={totalAmount} />

        {allTransaction.map((item, i) => {
          if (item.type === "income") {
            return <Transaction key={i} id={item.id} name={item.name} type={item.type} amount={item.amount} date={item.date} />
          }
          else {
            return null;
          }
        })}
    </div>
  )
}

export default Income
