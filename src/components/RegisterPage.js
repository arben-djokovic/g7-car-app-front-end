import React, { useEffect, useRef, useState } from 'react';
import '../styles/RegisterStyle/RegisterStyle.css'
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../api/apiCalls'
import validator from 'validator'
import Select from 'react-select'
import { auth } from '../services/AuthService';

export default function RegisterPage() {

  const refName = useRef()
  const refEmail = useRef()
  const refNumber = useRef()
  const refPassword = useRef()
  const refUsername = useRef()
  const refLocation = useRef()

  let [passwordInput, setPasswordInput] = useState('')
  let [nameInput, setNameInput] = useState('')
  let [numberInput, setNumberInput] = useState('')
  let [emailInput, setEmailInput] = useState('')
  let [usernameInput, setUsernameInput] = useState('')
  let [optionsLocation, setOptionsLocation] = useState([])
  let [location, setLocation] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchLocation()
  }, [])
  const fetchLocation = async () => {
    try {
      const response = await api.get('/locations')
      let brands = []
      response.data.forEach(element => {
        brands.push({ value: element.value, label: element.value, latitude: element.latitude, longitude: element.longitude })
      });
      setTimeout(() => {
        setOptionsLocation(brands)
      }, 100);
    }
    catch (err) {
      console.log(err)
    }
  }
  const navigate = useNavigate()
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: 'white',
      backgroundColor: '#152836',
      padding: 20,
      margin: 0,
      cursor: 'pointer'
    }),
    menu: (provided, state) => ({
      ...provided,
      color: 'white'
    }),
    control: () => ({
      // // none of react-select's styles are passed to <Control />
      // width: 200,
      display: 'flex',
      color: 'white',
    }),
    singleValue: (provided, state) => {
      const transition = 'opacity 300ms';
      const color = 'color: white'

      return { ...provided, transition, color };
    }
  };

  const registerBtn = () => {
    if (!validator.isEmail(emailInput) || passwordInput.length < 5 || nameInput.length < 3 || numberInput.length < 6 || usernameInput.includes(' ') || usernameInput.length < 3 || location.length === 0) {
      if (!validator.isEmail(emailInput)) {
        refEmail.current.style.color = 'red'
        toast.error("Please input real email!")
      }
      else {
        refEmail.current.style.color = 'transparent'
      }
      if (passwordInput.length < 5) {
        refPassword.current.style.color = 'red'
        toast.error("Password must have minimum 5 characters!")
      }
      else {
        refPassword.current.style.color = 'transparent'
      }
      if (nameInput.length < 3) {
        refName.current.style.color = 'red'
        toast.error("Name must have minimum 3 characters!")
      }
      else if (nameInput.length >= 3) {
        refName.current.style.color = 'transparent'
      }
      if (numberInput.length < 6) {
        refNumber.current.style.color = 'red'
        toast.error("Number must have minimum 6 numbers!")
      }
      else {
        refNumber.current.style.color = 'transparent'
      }
      if (usernameInput.includes(' ') || usernameInput.length < 3) {
        refUsername.current.style.color = 'red'
        toast.error("Username can't have space and must have minimum 3 characters")
      }
      else {
        refNumber.current.style.color = 'transparent'
      }
      if (location.length === 0) {
        refLocation.current.style.color = 'red'
        toast.error("Select Location")
      }
      else {
        refLocation.current.style.color = 'transparent'
      }
    }
    else {
      refEmail.current.style.color = 'transparent'
      refName.current.style.color = 'transparent'
      refNumber.current.style.color = 'transparent'
      refPassword.current.style.color = 'transparent'
      refUsername.current.style.color = 'transparent'
      let newUser = {
        user: {
          email: String(emailInput),
          password: String(passwordInput),
          username: String(usernameInput)
        },
        location: String(location),
        phone: String(numberInput),
        full_name: nameInput
      }
      let userLogIn = {
        username: usernameInput,
        password: passwordInput
      }
      addNewUser(newUser, userLogIn)
    }
  }
  const addNewUser = async (newUser, userLogIn) => {
    try {
      const response = await api.post('/user/create/', newUser)
      try {
            const response = await api.post('/auth/jwt/create/', userLogIn)
            auth.login(response.data.access, response.data.refresh, userLogIn.username)
            navigate('/')
          }
          catch (error) {
            navigate('/log-in')
          }
    }
    catch (error) {
      console.log(error)
    }
  }

  return <div className='registerPage'>
    <div className="registerSection">
      <div className="form">
        <div className="formInputDiv">
          <p>Name<span ref={refName} className='required'>*error</span></p>
          <input onChange={(e) => { setNameInput(e.target.value) }} placeholder='Full Name' type="name" />
        </div>
        <div className="formInputDiv">
          <p>Username<span ref={refUsername} className='required'>*error</span></p>
          <input onChange={(e) => { setUsernameInput(e.target.value) }} placeholder='username' type="name" />
        </div>
        <div className="formInputDiv">
          <p>Email<span ref={refEmail} className='required'>*error</span></p>
          <input onChange={(e) => { setEmailInput(e.target.value) }} placeholder='name@mail.com' type="email" />
        </div>
        <div className="formInputDiv">
          <p>Phone number<span ref={refNumber} className='required'>*error</span></p>
          <input onChange={(e) => { setNumberInput(e.target.value) }} placeholder='000-000-000' type="number" />
        </div>
        <div className="formInputDiv">
          <p>Password<span ref={refPassword} className='required'>*error</span></p>
          <input onChange={(e) => { setPasswordInput(e.target.value) }} placeholder='password' type="password" />
        </div>
        <div className="formInputDiv">
          <p>Location<span ref={refLocation} className='required'>*error</span></p>
          <Select onChange={(e) => { setLocation(e.value) }} className='selectLocation' options={optionsLocation} styles={customStyles} />
        </div>
        <div onClick={registerBtn} className="loginBtn">Create My Account</div>
        <p className='register'>Already have an account? <span onClick={() => {
          navigate('/log-in')
        }}>Login here</span></p>
      </div>
      <div className="welcome">
        <div className="welcomeContent">
          <img onClick={() => { navigate('/') }} className='logo' src="./assets/logo.png" alt="" />
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
    <ToastContainer />
  </div>;
}
