import React from 'react';
import Header from './Header';
import Footer from './Footer';
import '../styles/RegisterStyle/RegisterStyle.css'
import { useNavigate } from 'react-router';

export default function RegisterPage() {

  const navigate = useNavigate()

  return <div className='registerPage'>
  <Header />
  <div className="registerSection">
    <div className="form">
      <div className="formInputDiv">
        <p>Name</p>
        <input placeholder='Full Name' type="name" />
      </div>
      <div className="formInputDiv">
        <p>Email</p>
        <input placeholder='name@mail.com' type="email" />
      </div>
      <div className="formInputDiv">
        <p>Phone number</p>
        <input placeholder='000-000-000' type="tel" />
      </div>
      <div className="formInputDiv">
        <p>Password</p>
        <input placeholder='password' type="password" />
      </div>
      <div className="loginBtn">Create My Account</div>
      <p className='register'>Already have an account? <span onClick={()=>{
        navigate('/log-in')
      }}>Login here</span></p>
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
</div>;
}
