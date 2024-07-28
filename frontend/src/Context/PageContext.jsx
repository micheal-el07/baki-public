import React, { createContext } from 'react'
import axios from 'axios';
import Date from '../Components/Date/Date'

const API_URL = 'http://localhost:4005';
const current_user = 1;
const dateToday = Date

const transactions = await axios.get(`${API_URL}/transactions/${dateToday.month.monthNumber}/${current_user}`)
const allTransaction = transactions.data

let recurring  = await axios.get(`${API_URL}/recurring/${current_user}`)
recurring = recurring.data

console.log(allTransaction, " from pagecontext")

export const PageContext = createContext(null);

const expanseTrans = allTransaction.filter(item => item.type === "expanses")
const incomeTrans = allTransaction.filter(item => item.type === "income")

const PageContextProvider = (props) => {

    const contextValue = { allTransaction, incomeTrans, expanseTrans, recurring }

    return (
        <PageContext.Provider value={contextValue}>
            {props.children}
        </PageContext.Provider>
    )
}

export default PageContextProvider
