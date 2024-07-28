import React from 'react'
import AddEditForm from '../Components/AddEditForm/AddEditForm'
import { useParams } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'

const AddEdit = (props) => {
    // console.log(props.category, ' in addedit')
    const { transactionId } = useParams();
    // console.log(transactionId, ' param in addedit')
    // console.log((transactionId))
    
    return (
        <div>
            <Navbar />
            <AddEditForm purpose={props.category} param={transactionId} />
        </div>
    )
}

export default AddEdit
