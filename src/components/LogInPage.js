import React,{ useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import '../styles/LoginStyle/LoginStyle.css'
import { ToastContainer, toast } from 'react-toastify'
import api from '../api/apiCalls'
import { auth } from '../services/AuthService';

export default function LogInPage() {

  let [usernameInput, setUsernameInput] = useState("")
  let [passwordInput, setPasswordInput] = useState("")
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const navigate = useNavigate()

  const logInBtn = async () => {
    if(usernameInput.length === 0 || passwordInput.length === 0){
      toast.error('Please fill all input fields')
    }
    else{
      let userInfos = {
        username: String(usernameInput),
        password: String(passwordInput)
      }
      try{
        const response = await api.post('/auth/jwt/create/',  userInfos)
        auth.login(response.data.access, response.data.refresh, usernameInput)
        navigate('/')
        console.log(response.data)
      }
      catch(error){
        if(error.response.data.detail === 'No active account found with the given credentials'){
          toast.error('Uncorrect password or username')
        }
        else{
          console.log(error.response.data)
        }
      }
    }
  }

  return <div className='loginPage'>
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
        <img className='logo' onClick={()=>{navigate('/')}} src="./assets/logo.png" alt="" />
        <div className="text">
          <h1>Log in</h1>
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
  <ToastContainer />
</div>
}
