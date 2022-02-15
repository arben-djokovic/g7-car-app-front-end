import React,{ useEffect, useRef, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import '../styles/RegisterStyle/RegisterStyle.css'
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterPage() {

  const refName = useRef()
  const refEmail = useRef()
  const refNumber = useRef()
  const refPassword = useRef()

  let [passwordInput, setPasswordInput] = useState('')
  let [nameInput, setNameInput] = useState('')
  let [numberInput, setNumberInput] = useState('')
  let [emailInput, setEmailInput] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const navigate = useNavigate()

  const registerBtn = () => {
    if(emailInput.length < 4 || !emailInput.includes('@') || !emailInput.includes('.') || passwordInput.length < 5 || nameInput.length < 3 || numberInput.length < 6){

      if(emailInput.length < 4 || !emailInput.includes('@') || !emailInput.includes('.')){
        refEmail.current.style.color = 'red'
        toast.error("Please input real email!")
      }
      else{
        refEmail.current.style.color = 'transparent'
      }
      if(passwordInput.length < 5){
        refPassword.current.style.color = 'red'
        toast.error("Password must have minimum 5 characters!")
      }
      else{
        refPassword.current.style.color = 'transparent'
      }
      if(nameInput.length < 3){
        refName.current.style.color = 'red'
        toast.error("Name must have minimum 3 characters!")
      }
      else{
        refName.current.style.color = 'transparent'
      }
      if(numberInput.length < 6){
        refNumber.current.style.color = 'red'
        toast.error("Number must have minimum 6 numbers!")
      }
      else{
        refNumber.current.style.color = 'transparent'
      }
    }
    else{
      toast.success('Inputs are good')
    }
  }

  return <div className='registerPage'>
  <Header />
  <div className="registerSection">
    <div className="form">
      <div className="formInputDiv">
        <p>Name<span ref={refName} className='required'>*error</span></p>
        <input onChange={(e)=>{setNameInput(e.target.value)}} placeholder='Full Name' type="name" />
      </div>
      <div className="formInputDiv">
        <p>Email<span ref={refEmail} className='required'>*error</span></p>
        <input onChange={(e)=>{setEmailInput(e.target.value)}} placeholder='name@mail.com' type="email" />
      </div>
      <div className="formInputDiv">
        <p>Phone number<span ref={refNumber} className='required'>*error</span></p>
        <input onChange={(e)=>{setNumberInput(e.target.value)}} placeholder='000-000-000' type="number" />
      </div>
      <div className="formInputDiv">
        <p>Password<span ref={refPassword} className='required'>*unfinished</span></p>
        <input onChange={(e)=>{setPasswordInput(e.target.value)}} placeholder='password' type="password" />
      </div>
      <div onClick={registerBtn} className="loginBtn">Create My Account</div>
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
  <ToastContainer />
</div>;
}
