import React, { createContext } from 'react'
import axios from 'axios';
import Date from '../Components/Date/Date'
import { Navigate } from 'react-router-dom';

const API_URL = 'http://localhost:4005';
const current_user = 1;
const dateToday = Date

const transactions = await axios.get(`${API_URL}/transactions/${dateToday.month.monthNumber}/${current_user}`)
const allTransaction = transactions.data

let recurring  = await axios.get(`${API_URL}/recurring/${current_user}`)
recurring = recurring.data

async function addTransaction(user, body) {
    console.log("addtransaction is triggered")
    const result = await axios.post(`${API_URL}/transaction/${Number(user)}`, body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }})
    const response = result.status
    console.log(response)
    return response
}

async function editTransaction(id, body) {
    const result = await axios.patch(`${API_URL}/transaction/${Number(id)}`, body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }})
    const response = result.rows
    if (result.data) {
        window.alert("Transaction editted.")
    }
    return response
}

async function deleteTransaction(id) {
    await axios.delete(`${API_URL}/transaction/${Number(id)}`)
}

export const PageContext = createContext(null);

const expanseTrans = allTransaction.filter(item => item.type === "expanses")
const incomeTrans = allTransaction.filter(item => item.type === "income")

const PageContextProvider = (props) => {

    const contextValue = { allTransaction, incomeTrans, expanseTrans, recurring, current_user, deleteTransaction, addTransaction, editTransaction }

    return (
        <PageContext.Provider value={contextValue}>
            {props.children}
        </PageContext.Provider>
    )
}

export default PageContextProvider
