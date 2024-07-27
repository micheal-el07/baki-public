import React, { useContext } from 'react'
import '../Pages/CSS/Home.css'
import Navbar from '../Components/Navbar/Navbar.jsx'
import Date from '../Components/Date/Date.jsx'
import Income from '../Components/Income/Income.jsx'
import Expanses from '../Components/Expanses/Expanses.jsx'
import Due from '../Components/Due/Due.jsx'
import { PageContext } from '../Context/PageContext'

const Home = (props) => {
  const { allTransaction } = useContext(PageContext)

  return (
    <>
      <Navbar fullDate={Date.fullDate} location={"home"} />

      <div className='home'>
        <Income title={"Income"} />
        <Expanses title={"Expanses"} />
        <Due title={"Due"} />
      </div>
    </>
  )
}

export default Home
