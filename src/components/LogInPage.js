import React from 'react';
import { useNavigate } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import '../styles/LoginStyle/LoginStyle.css'

export default function LogInPage() {
  const navigate = useNavigate()

  return <div className='loginPage'>
  <Header />
  <div className="login">
    <div className="form">
      <div className="formInputDiv">
        <p>Email</p>
        <input placeholder='name@mail.com' type="email" />
      </div>
      <div className="formInputDiv">
        <p>Password</p>
        <input placeholder='password' type="password" />
      </div>
      <div className="loginBtn">Login</div>
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
