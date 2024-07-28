import React, { useContext } from 'react'
import './Transaction.css'
import { PageContext } from '../../Context/PageContext'
import { useNavigate } from 'react-router-dom'
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

const Transaction = (props) => {
  const { deleteTransaction } = useContext(PageContext)

  function to_delete(pop) {
    deleteTransaction(pop)
    window.location.reload()
  }

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/edit/${props.id}`;
    navigate(path)
  }

  const red = "rgb(139, 239, 161)"
  const green = "rgb(255, 96, 96, 0.7)"
  const purple = "rgb(155, 102, 255)"


  return (
    <div className='transaction'>
      <div className={`expanses-${props.id} subTransaction subIncome`}
        style={{ background: props.type === "income" ? red : green }}>
        <p className="table-data">{props.name}</p>

        <p className="table-data" name="type">{props.type}</p>

        <p className="table-data" name="amount" >RM {props.amount}</p>

        <p className="table-data" name='date'>{props.date}</p>

        <div className="edit-delete" hidden={false}>
          <button onClick={routeChange} className="update-transaction">E</button>
          <button onClick={() => { to_delete(props.id) }} className="delete-transaction">X</button>
        </div>

      </div>
    </div>
  )
}

export default Transaction
