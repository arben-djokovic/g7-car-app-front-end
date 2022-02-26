import React,{ useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import '../styles/LoginStyle/LoginStyle.css'

export default function LogInPage() {

  let [usernameInput, setUsernameInput] = useState("")
  let [passwordInput, setPasswordInput] = useState("")
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const navigate = useNavigate()

  const logInBtn = () => {
  }

  return <div className='loginPage'>
  <Header />
  <div className="login">
    <div className="form">
      <div className="formInputDiv">
        <p>Username</p>
        <input onChange={(e)=>{setUsernameInput(e.target.value)}} placeholder='username' type="name" />
      </div>
      <div className="formInputDiv">
        <p>Password</p>
        <input onChange={(e)=>{setPasswordInput(e.target.value)}} placeholder='password' type="password" />
      </div>
      <div onClick={logInBtn} className="loginBtn">Login</div>
      <p className='register'>Don’t have an account? <span onClick={()=>{
        navigate('/register')
      }}>Register here</span></p>
    </div>
    <div className="welcome">
      <div className="welcomeContent">
        <img className='logo' src="./assets/logo.png" alt="" />
        <div className="text">
          <h1>Register</h1>
          <h3>Welcome to Autohunt</h3>
        </div>
        <div className="icons">
          <img src="./assets/facebook-icon.png" alt="" />
          <img src="./assets/instagram-icon.png" alt="" />
          <img src="./assets/youtube-icon.png" alt="" />
        </div>
      </div>
    </div>
  </div>
  <Footer />
</div>
}
