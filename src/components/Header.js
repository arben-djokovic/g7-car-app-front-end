import React, { useRef } from 'react';
import { useNavigate } from 'react-router';
import '../styles/Header/Header.css'
import { useSelector } from 'react-redux';
import { auth } from '../services/AuthService';

export default function Header() {
  const { getAuthStatus } = auth

  const mobileNav = useRef()
  const navigate = useNavigate()

  let compareCar1 = useSelector(store => store.compareCar1)
  let compareCar2 = useSelector(store => store.compareCar2)

  const mobileNavigateTo = (location) => {
    mobileNav.current.classList.remove("mobileNavShow")
    setTimeout(() => {
      navigate(location)
    }, 310);
  }

  return <div className="header">

    {/* TABLET AND PC HEADER START */}
    <div className="pcHeader">

      <div className="pcHeaderFirst">
        <div className="pcHeaderFirtstContent">
          <img onClick={() => {
            navigate('/')
          }} className='logo' src="../assets/logo.png" alt="" />
          <h2 onClick={() => {
            navigate('/new-cars')
          }} className='navLink'>New Cars</h2>
          <h2 onClick={() => { navigate('/used-cars?offset=0') }} className='navLink'>Used Cars</h2>
          <h2 onClick={() => { navigate('/compare/' + compareCar1 + '&' + compareCar2) }} className='navLink'>Compare</h2>
          <h2 onClick={() => { navigate('/sell') }} className='navLink'>Sell</h2>
          {getAuthStatus() ? <div onClick={() => { navigate('/user/' + localStorage.getItem('username')) }} className="singInDiv">
            <i className="fa fa-user" aria-hidden="true"></i>
            <h4>{localStorage.getItem('username')}</h4>
          </div> : <div onClick={() => { navigate('/log-in') }} className="singInDiv">
            <i className="fa fa-user" aria-hidden="true"></i>
            <h4>Sing in</h4>
          </div>}
        </div>
      </div>

    </div>
    {/* TABLET AND PC HEADER END */}


    {/* MOBILE HEADER START */}
    <div className="mobileHeader">
      <div className='mobileHeaderFirst'>
        <img onClick={() => {
          navigate('/')
        }} className='logo' src="../assets/logo.png" alt="" />
        <i onClick={() => {
          mobileNav.current.style.display = 'flex'
          setTimeout(() => {  // for transition after 10ms
            mobileNav.current.classList.add("mobileNavShow")
          }, 10);
        }} className="fa fa-bars bars" aria-hidden="true"></i>
      </div>
      <div ref={mobileNav} className="mobileNavigationDiv">
        <div className='navLogoDiv'>
          <img onClick={() => {
            mobileNav.current.classList.remove("mobileNavShow")
            setTimeout(() => {
              navigate('/')
            }, 310);
          }} className='navLogo' src="../assets/logo.png" alt="" />
          <i onClick={() => {
            mobileNav.current.classList.remove("mobileNavShow")
            setTimeout(() => {
              mobileNav.current.style.display = 'none'
            }, 310);
          }} className="fa fa-times" aria-hidden="true"></i>
        </div>
        <div className="navList">
          <h2 onClick={() => { mobileNavigateTo('/new-cars') }} >New Cars</h2>
          <h2 onClick={() => { mobileNavigateTo('/used-cars?offset=0') }} >Used Cars</h2>
          <h2 onClick={() => { mobileNavigateTo('/compare/' + compareCar1 + '&' + compareCar2) }} >Compare</h2>
          <h2 onClick={() => { mobileNavigateTo('/sell') }} >Sell</h2>
        </div>
        {getAuthStatus() ? <div onClick={() => { mobileNavigateTo('/user/' + localStorage.getItem('username')) }} className="singInDiv">
          <i className="fa fa-user" aria-hidden="true"></i>
          <h4>{localStorage.getItem('username')}</h4>
        </div> : <div onClick={() => { mobileNavigateTo('/log-in') }} className="singInDiv">
          <i className="fa fa-user" aria-hidden="true"></i>
          <h4>Sing in</h4>
        </div>}
      </div>
    </div>
    {/* MOBILE HEADER END */}


  </div>;
}
