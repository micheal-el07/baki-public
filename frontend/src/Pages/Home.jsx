// import React, { useContext } from 'react'
import React, { useState, useContext } from 'react'
import '../Pages/CSS/Home.css'
import Navbar from '../Components/Navbar/Navbar.jsx'
import Date from '../Components/Date/Date.jsx'
import Income from '../Components/Income/Income.jsx'
import Expanses from '../Components/Expanses/Expanses.jsx'
import Due from '../Components/Due/Due.jsx'
import { PageContext } from '../Context/PageContext'


const Home = (props) => {
  const { allTransaction } = useContext(PageContext)
  // const [numTrans, setNumTrans] = useState(0)

  const incomeTransactions = allTransaction.filter((item) => {
    return (item.type === 'income')
  })

  const expansesTransactions = allTransaction.filter((item) => {
    return (item.type === 'expanses')
  })

  const recurringTransactions = allTransaction.filter((item) => {
    return (item.type === 'recurring')
  })


  return (
    <>
      <Navbar fullDate={Date.fullDate} location={"home"} />
      <div className='home'>
        <Income data={incomeTransactions} title={"Income"} />
        <Expanses data={expansesTransactions} title={"Expanses"} />
        <Due data={[expansesTransactions, recurringTransactions]} title={"Monthly"} />
      </div>
    </>
  )
}

export default Home
