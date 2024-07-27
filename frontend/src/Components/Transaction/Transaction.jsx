import React from 'react'
import './Transaction.css'

const Transaction = (props) => {
  return (
    <div className='transaction'>
      <div className={`expanses-${props.id} subTransaction subIncome`} style={{background:props.type==="income"?"rgb(139, 239, 161)":"rgb(255, 96, 96, 0.7)"}}>
        <p className="table-data">
          { props.name }
        </p>
        <p className="table-data">
          { props.type }
        </p>
        <p className="table-data">RM { props.amount }
        </p>
        <p className="table-data">
          { props.date }
        </p>
        <div className="edit-delete">
          <button className="update-transaction">E</button>
          <button className="delete-transaction">X</button>
        </div>
      </div>
    </div>
  )
}

export default Transaction
