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

var incomeTrans = []
var expanseTrans = []

allTransaction.map((item) => {
    if (item.type === "income") {
        incomeTrans.push(item)
    }
})
// console.log(incomeTrans, " is income")

allTransaction.map((item) => {
    if (item.type === "expanses") {
        expanseTrans.push(item)
    }
})
// console.log(expanseTrans, " is expanse")

const PageContextProvider = (props) => {

    const contextValue = { allTransaction, incomeTrans, expanseTrans, recurring }

    return (
        <PageContext.Provider value={contextValue}>
            {props.children}
        </PageContext.Provider>
    )
}

export default PageContextProvider
