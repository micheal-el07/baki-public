import React from 'react'
import './Navbar.css'

const Navbar = (props) => {
    return (
        <div className='navbar'>
            <div className="topPage">
                <div className="topPage-webName subTop">
                    <form action="/" method="get">
                        <h1>Bayar</h1>
                    </form>
                </div>
                <div className="topPage-date subTop mid-top">
                    <h2>
                        {props.fullDate}
                    </h2>
                </div>
                {props.location === "home" ?
                    <>
                        <div className="topPage-balance subTop mid-top">
                            <h2>
                                Balance: RM {(props.totalIncome - props.totalExpanses - props.dueAmount).toFixed(2)}
                            </h2>
                        </div>
                        <div className="topPage-others subTop">
                            <form action="/transaction" method="get">
                                <button className="add-transaction">ADD</button>
                            </form>
                            <form action="/" method="get">
                                <button className="login-out"><img className="icon" alt=''></img></button>
                            </form>
                        </div>
                    </> :
                    <></>
                }
            </div>
        </div>
    )
}

export default Navbar
