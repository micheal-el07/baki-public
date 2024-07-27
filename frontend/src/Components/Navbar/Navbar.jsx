import React from 'react'
import './Navbar.css'

const Navbar = (props) => {
    return (
        <div className='navbar'>
            <div class="topPage">
                <div class="topPage-webName subTop">
                    <form action="/" method="get">
                        <h1>Bayar</h1>
                    </form>
                </div>
                <div class="topPage-date subTop mid-top">
                    <h2>
                        {props.fullDate}
                    </h2>
                </div>
                {props.location === "home" ?
                    <>
                        <div class="topPage-balance subTop mid-top">
                            <h2>
                                Balance: RM {(props.totalIncome - props.totalExpanses - props.dueAmount).toFixed(2)}
                            </h2>
                        </div>
                        <div class="topPage-others subTop">
                            <form action="/transaction" method="get">
                                <button class="add-transaction">ADD</button>
                            </form>
                            <form action="/" method="get">
                                <button class="login-out"><img class="icon" alt=''></img></button>
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
