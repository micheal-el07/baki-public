import React, { useContext } from 'react'
import './Expanses.css'
import TransactionHeader from '../TransactionHeader/TransactionHeader'
import { PageContext } from '../../Context/PageContext'
import Transaction from '../Transaction/Transaction'

const Expanses = (props) => {
  const { allTransaction } = useContext(PageContext)

  var totalAmount = 0

  for (let item of allTransaction) {
    if (item.type === "expanses") {
      totalAmount += item.amount
    }
  }

  return (
    <div className='expanses'>
      <TransactionHeader title={props.title} amount={totalAmount} />

      {allTransaction.map((item, i) => {
        if (item.type === "expanses") {
          return <Transaction key={i} id={item.id} name={item.name} type={item.type} amount={item.amount} date={item.date} />
        }
        else {
          return null;
        }
      })}
    </div>
  )
}

export default Expanses
