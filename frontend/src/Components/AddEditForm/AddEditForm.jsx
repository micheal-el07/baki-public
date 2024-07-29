import React, { useContext, useEffect, useState } from 'react'
import './AddEditForm.css'
import { PageContext } from '../../Context/PageContext'
import { Navigate, useNavigate } from "react-router-dom"

const AddEditForm = (props) => {
    const navigate = useNavigate()
    const { allTransaction, addTransaction, current_user, editTransaction } = useContext(PageContext)

    const edit_id = props.param
    const to_edit = allTransaction.find((item) => {
        if (item.id === Number(edit_id)) {
            return item
        }
    })

    const [form, setForm] = useState({
        name: "",
        type: "",
        amount: 0,
        date: ""
    })
    console.log(form)


    const handleChange = e => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    function handleSubmit(current_user, toedit_id, form) {
        const result = addTransaction(current_user, toedit_id, form)
        if (result) {
            window.alert("Successfully added")
        }
        setForm({
            name: "",
            type: "",
            amount: "",
            date: ""
        })
        window.location.reload()
    }

    const handleEdit = (id, edited) => {
        console.log(edited, "handleEdit is called")
        const response = editTransaction(id, edited)
        // navigate(-1);
    }


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
            <form className='form-main'>
                <h2>{modName} Form</h2>
                <input onChange={handleChange} type="text" name='name' className='add-edit' placeholder={condition === "edit" ? to_edit.name : "Name"} />
                <input onChange={handleChange} type="text" name='type' className='add-edit' placeholder={condition === "edit" ? to_edit.type : "Type"} />
                <input onChange={handleChange} type="text" name='amount' className='add-edit' placeholder={condition === "edit" ? to_edit.amount : "Amount"} />
                <input onChange={handleChange} type="date" name='date' className='add-edit' />
                <button type="button" onClick={condition === "edit" ? () => { handleEdit(edit_id, form) } : () => handleSubmit(current_user, form)} className='submit-button'>{(props.purpose).toUpperCase()}</button>
            </form>
        </div>
    )
}

export default AddEditForm
