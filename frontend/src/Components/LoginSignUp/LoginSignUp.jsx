import React, { useState } from 'react'
import './LoginSignUp.css'

const LoginSignUp = () => {
    const [isLogin, setIsLogin] = useState("Login")
    const [form, setForm] = useState({
        username: "",
        password: "",
        name: "",
        repassword: "",
    })

    const handleChange = (e) => {
        setForm(prev => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    console.log(form)

    return (
        <div className='loginsignup-container'>
            <div className="login-signup-form" style={{height:isLogin==="SignUp" ? 500:350}}>
                <label htmlFor="username">Username:</label>
                <input onChange={handleChange} type="text" name='username' id='username' />
                {
                    (isLogin === "SignUp") ?
                        <>
                            <label htmlFor="name">Name:</label>
                            <input type="text" name='name' id='name' />
                        </>
                        :
                        <></>
                }
                <label htmlFor="password" className='label-password'>Password:</label>
                <input onChange={handleChange} type="password" name='password' id='password' />
                {
                    (isLogin === "SignUp") ?
                        <>
                            <label htmlFor="re-password">Re-enter password:</label>
                            <input type="password" name='re-password' id='re-password' />
                        </>
                        :
                        <></>
                }
                <button className='login-signup-button'>Continue</button>
                {/* <button onClick={(isLogin === "Login") ? login() : signup()} >Continue</button> */}
            </div>
        </div>
    )
}

export default LoginSignUp
