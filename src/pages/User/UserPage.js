import React, { useEffect, useState } from 'react'
import './UserPageStyle.scss'
import api from '../../api/apiCalls'
import Car from '../../components/Car/Car'
import { useNavigate } from 'react-router';
import Select from 'react-select'
import { toast } from 'react-toastify';

export default function UserPage() {
  useEffect(() => {
    window.scroll(0, 0)
    fetchUser()
    fetchMyCars()
    fetchLocation()
  }, [])

  const [editProfile, setEditProfile] = useState(false)
  const [optionsLocation, setOptionsLocation] = useState([])
  const [city, setCity] = useState('')
  const [changePhoneNumber, setChangePhoneNumber] = useState(0)
  const [changeFullName, setChangeFullName] = useState('')

  const navigate = useNavigate()
  const [myCars, setMyCars] = useState([])
  const [userInfo, setUserInfo] = useState({
  })
  const fetchLocation = async () => {
    try {
      const response = await api.get('/locations')
      let brands = []
      response.data.forEach(element => {
        brands.push({ id: element._id, value: element.name, label: element.name, latitude: element.latitude, longitude: element.longitude })
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
      const response = await api('/user/me')
      setUserInfo(response.data)
    }
    catch (error) {
      console.log(error)
    }
  }

  const fetchMyCars = async () => {
    try {
      const response = await api.get('/cars/mine')
      console.log(response.data)
      setMyCars(response.data)
    }
    catch (error) {
      console.log(error)
    }
  }

  const deleteUser = async () => {
    let question = window.confirm('ARE YOU SURE?')
    if (question) {
      try {
        const response = await api.delete('/user/me')
        console.log(response)
        if(response.data.success){
          toast.success('User deleted')
          localStorage.clear()
          navigate("/log-in")
        }else{
          toast.error('Something went wrong')
        }
      }
      catch (error) {
        console.log(error)
      }
    }
  }
  const changeCity = (e) => {
    setCity(e.id)
  }

  const editUser = async () => {
    let userTest = {}
    if (changeFullName.length) {
      userTest.name = String(changeFullName)
    }
    if (city.length) {
      userTest.location = String(city)
    }
    if (changePhoneNumber.length) {
      userTest.phone = String(changePhoneNumber)
    }
    console.log(userTest)
    try {
      const response = await api.put('/user/me', userTest)
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
            <h2>{userInfo?.name}</h2>
            <p>Full Name</p>
          </div>
          <div className="info">
            <h2>{userInfo?.phone}</h2>
            <p>Phone Number</p>
          </div>
          <div className="info">
            <h2>{userInfo?.email}</h2>
            <p>Email</p>
          </div>
          <div className="info">
            <h2>{userInfo?.location?.name}</h2>
            <p>Location</p>
          </div>
          <div className="info">
            <h2>{userInfo?.username}</h2>
            <p>Username</p>
          </div>
          <div className="logOut">
            <h2 onClick={() => { localStorage.clear(); navigate('/') }}><i className="fa fa-sign-out" aria-hidden="true"></i>Log out</h2>
          </div>
          <div className="delete">
            <p onClick={() => { deleteUser(userInfo?._id) }}>Delete this account</p>
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
          {myCars.length ? myCars.map((car, i) => {
            return (<Car car={car} canDelete={true} />)
          }) : <p>You didnt post any car</p>}
        </div>
      </div>
    </div>
  )
}