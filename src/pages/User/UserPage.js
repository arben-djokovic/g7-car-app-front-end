import React, { useEffect, useState } from 'react'
import './UserPageStyle.scss'
import api from '../../api/apiCalls'
import Car from '../../components/Car/Car'
import { useNavigate } from 'react-router';
import Select from 'react-select'

export default function UserPage() {
  useEffect(() => {
    window.scroll(0, 0)
    fetchUser()
    fetchMyCars()
    fetchLocation()
  }, [])

  let [editProfile, setEditProfile] = useState(false)
  let [optionsLocation, setOptionsLocation] = useState([])
  let [city, setCity] = useState('')
  let [changePhoneNumber, setChangePhoneNumber] = useState(0)
  let [changeFullName, setChangeFullName] = useState('')

  const navigate = useNavigate()
  let [myCars, setMyCars] = useState([])
  let [userInfo, setUserInfo] = useState({
    "user": {
      "email": "",
      "password": "",
      "username": ""
    },
    "location": "",
    "phone": "",
    "full_name": "",
    "id": 1
  })
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
  const fetchUser = async () => {
    try {
      const response = await api('/user/' + localStorage.getItem("username"))
      setUserInfo(response.data[0])
    }
    catch (error) {
      console.log(error)
    }
  }

  const fetchMyCars = async () => {
    try {
      const response = await api.get('/vehicle/user/' + localStorage.getItem("username"))
      setMyCars(response.data)
    }
    catch (error) {
      console.log(error)
    }
  }
  const answer = (id) => {
    let question = window.confirm('ARE YOU SURE?')
    if (question) {
      deleteMyCar(id)
    }
  }

  const deleteMyCar = async (id) => {
    try {
      const response = await api.delete('/vehicle/delete/' + id)
      fetchMyCars()
    }
    catch (error) {
      console.log(error.response.data)
    }
  }
  const deleteUser = async (id) => {
    let question = window.confirm('ARE YOU SURE?')
    if (question) {
      try {
        const response = await api.delete('/user/delete/' + id)
        localStorage.clear()
        navigate("/log-in")
      }
      catch (error) {
        console.log(error)
      }
    }
  }
  const changeCity = (e) => {
    setCity(e.value)
  }

  const editUser = async () => {
    let userTest = {}
    if (changeFullName.length) {
      userTest.full_name = String(changeFullName)
    }
    if (city.length) {
      userTest.location = String(city)
    }
    if (changePhoneNumber.length) {
      userTest.phone = String(changePhoneNumber)
    }
    try {
      const response = await api.put('/user/update/' + userInfo.id + '/', userTest)
      setEditProfile(false)
      fetchUser()
    }
    catch (error) {
      console.log(error.response)
    }
  }

  return (
    <div className='userPage'>
      <div className="userInfos">
        {editProfile ? <i onClick={() => { setEditProfile(false) }} className="fa fa-times" aria-hidden="true"></i> : <i onClick={() => { setEditProfile(true) }} className="fa fa-edit"></i>}
        <img src="../assets/logo.png" alt="" />
        {!editProfile ? <div className="infos">
          <div className="info">
            <h2>{userInfo.full_name}</h2>
            <p>Full Name</p>
          </div>
          <div className="info">
            <h2>{userInfo.phone}</h2>
            <p>Phone Number</p>
          </div>
          <div className="info">
            <h2>{userInfo.user.email}</h2>
            <p>Email</p>
          </div>
          <div className="info">
            <h2>{userInfo.location}</h2>
            <p>Location</p>
          </div>
          <div className="info">
            <h2>{userInfo.user.username}</h2>
            <p>Username</p>
          </div>
          <div className="logOut">
            <h2 onClick={() => { localStorage.clear(); navigate('/') }}><i className="fa fa-sign-out" aria-hidden="true"></i>Log out</h2>
          </div>
          <div className="delete">
            <p onClick={() => { deleteUser(userInfo.id) }}>Delete this account</p>
          </div>
        </div> : <div className='editProfile'>
          <h3>Edit Profile</h3>
          <div className="editItem">
            <p>Full Name:</p>
            <input placeholder='Full Name' onChange={(e) => { setChangeFullName(e.target.value) }} defaultValue={changeFullName} type="text" />
          </div>
          <div className="editItem">
            <p>Location:</p>
            <Select onChange={(e) => { changeCity(e) }} className='selectLocation' options={optionsLocation} styles={customStyles} />
          </div>
          <div className="editItem">
            <p>Phone number:</p>
            <input onChange={(e) => { setChangePhoneNumber(e.target.value) }} placeholder='Phone Number' type="number" />
          </div>
          <p onClick={editUser} className="editProfileBtn">Apply changes</p>
        </div>}
      </div>
      <div className="cars">
        <h2>My Cars</h2>
        <div className="carsList">
          {myCars.length ? myCars.map(car => {
            return (<div key={car.id} className='carDiv'>
              <p onClick={() => { answer(car.id) }} className='deleteBtn'><span>X</span></p>
              <Car car={car} />
            </div>
            )
          }) : <p>You didnt post any car</p>}
        </div>
      </div>
    </div>
  )
}
