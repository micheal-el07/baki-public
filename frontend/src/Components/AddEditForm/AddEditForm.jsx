import React, { useContext, useState } from 'react'
import './AddEditForm.css'
import { PageContext } from '../../Context/PageContext'

const AddEditForm = (props) => {

    const { allTransaction } = useContext(PageContext)
    

    const edit_id = props.param
    // console.log(edit_id, " param in addeditform")

    const to_edit = allTransaction.find((item) => {
        if (item.id === Number(edit_id)) {
            return item
        }
    })

    const handleChange = e => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }


    const [form, setForm] = useState({
        name: "",
        type: "",
        amount: 0,
        date: ""
    })

    console.log(form)

    let path = ""

    if (props.purpose === "add") {
        path = `/${props.purpose}`
    } else {
        path = `/${props.purpose}/${props.param}`
    }

    const condition = props.purpose

    const name = props.purpose
    const modName = name[0].toUpperCase() + name.slice(1)

    return (
        <div className='add-edit-form'>
            <form action={path} method="post" className='form-main'>
                <h2>{modName} Form</h2>
                <input onChange={handleChange} type="text" name='name' className='add-edit' placeholder={condition === "edit" ? to_edit.name : "Name"} />
                <input onChange={handleChange} type="text" name='type' className='add-edit' placeholder={condition === "edit" ? to_edit.type : "Type"} />
                <input onChange={handleChange} type="text" name='amount' className='add-edit' placeholder={condition === "edit" ? to_edit.amount : "Amount"} />
                <input onChange={handleChange} type="date" name='date' className='add-edit'/>
                <button type="submit" className='submit-button'>{(props.purpose).toUpperCase()}</button>
            </form>
        </div>
    )
}

export default AddEditForm
