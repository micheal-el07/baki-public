import React, { useContext, useEffect, useState } from 'react'
import './Transaction.css'
import { PageContext } from '../../Context/PageContext'



const Transaction = (props) => {
  const { deleteTransaction } = useContext(PageContext)
  const [showing, setShowing] = useState(true)
  const [num, setNum] = useState(0)

  function to_delete(pop) {
    // setNum(pop)
    deleteTransaction(pop)
    window.location.reload()
  }

  return (
    <div className='transaction'>
      <div className={`expanses-${props.id} subTransaction subIncome`} style={{ background: props.type === "income" ? "rgb(139, 239, 161)" : "rgb(255, 96, 96, 0.7)" }}>


        <p className="table-data">
          {props.name}
        </p>
        {/* <p className="table-data" hidden={showing === true ? false : true}>
          {props.name}
        </p>
        <input onChange={handleChange} type="text" hidden={showing === true ? true : false} name='name' /> */}

        {/* --------------------------------------------------- */}

        <p className="table-data" name="type">
          {props.type}
        </p>
        {/* <p className="table-data" hidden={showing === true ? false : true}>
          {props.type}
        </p>
        <input type="text" hidden={showing === true ? true : false} name='type' /> */}

        {/* --------------------------------------------------- */}

        <p className="table-data" name="amount" >
          RM {props.amount}
        </p>
        {/* <p className="table-data" hidden={showing === true ? false : true}>
          RM {props.amount}
        </p>
        <input type="text" hidden={showing === true ? true : false} name='input-amount input-trans' value={props.amount} /> */}

        {/* --------------------------------------------------- */}

        <p className="table-data" name='date'>
          {props.date}
        </p>
        {/* <p className="table-data" hidden={showing === true ? false : true}>
          {props.date}
        </p>
        <input type="date" hidden={showing === true ? true : false} name='input-date input-trans' value={props.date} /> */}

        {/* --------------------------------------------------- */}

        <div className="edit-delete" hidden={false}>
          <button className="update-transaction" hidden={showing === true ? false : true}>E</button>
          <button className="submit-transaction" hidden={showing === true ? true : false}>D</button>
          {/* <button className="delete-transaction">X</button> */}
          <button onClick={() => { to_delete(props.id) }} className="delete-transaction">X</button>
        </div>

      </div>
    </div>
  )
}

export default Transaction
