import React, { useRef } from 'react';
import { useNavigate } from 'react-router';
import '../styles/Header/Header.css'

export default function Header() {
  const mobileNav = useRef()
  const navigate = useNavigate()
  
  return <div className="header">

  {/* TABLET AND PC HEADER START */}
  <div className="pcHeader">
    
    <div className="pcHeaderFirst">
      <div className="pcHeaderFirtstContent">
        <img onClick={()=>{
          navigate('/')
        }} className='logo' src="./assets/logo.png" alt="" />
        <h2 onClick={()=>{
          navigate('/new-cars')
        }} className='navLink'>New Cars</h2>
        <h2 onClick={()=>{
          navigate('/used-cars')
        }}  className='navLink'>Used Cars</h2>
        <h2 onClick={()=>{
          navigate('/compare')
        }}  className='navLink'>Compare</h2>
        <h2 onClick={()=>{
          navigate('/sell')
        }}  className='navLink'>Sell</h2>
        <div onClick={()=>{
          navigate('/log-in')
        }}  className="singInDiv">
          <i className="fa fa-user" aria-hidden="true"></i>
          <h4>Sing in</h4>
        </div>
      </div>
    </div>

  </div>
  {/* TABLET AND PC HEADER END */}


   {/* MOBILE HEADER START */}
   <div className="mobileHeader">
    <div className='mobileHeaderFirst'>
      <img onClick={()=>{
          navigate('/')
        }}  className='logo' src="./assets/logo.png" alt="" />
      <i onClick={()=>{
        mobileNav.current.style.display = 'flex'
        setTimeout(() => {  // for transition after 10ms
          mobileNav.current.classList.add("mobileNavShow")
        }, 10);
      }} className="fa fa-bars bars" aria-hidden="true"></i>
    </div>
    <div ref={mobileNav} className="mobileNavigationDiv">
      <div className='navLogoDiv'>
        <img onClick={()=>{
          mobileNav.current.classList.remove("mobileNavShow")
          setTimeout(() => {
            navigate('/')
          }, 310);
        }}  className='navLogo' src="./assets/logo.png" alt="" />
        <i onClick={()=>{
        mobileNav.current.classList.remove("mobileNavShow")
      }} className="fa fa-times" aria-hidden="true"></i>
      </div>
      <div className="navList">
        <h2 onClick={()=>{
          mobileNav.current.classList.remove("mobileNavShow")
          setTimeout(() => {
            navigate('/new-cars')
          }, 310);
        }} >New Cars</h2>
        <h2 onClick={()=>{
          mobileNav.current.classList.remove("mobileNavShow")
          setTimeout(() => {
            navigate('/used-cars')
          }, 310);
        }} >Used Cars</h2>
        <h2 onClick={()=>{
          mobileNav.current.classList.remove("mobileNavShow")
          setTimeout(() => {
            navigate('/compare')
          }, 310);
        }} >Compare</h2>
        <h2 onClick={()=>{
          mobileNav.current.classList.remove("mobileNavShow")
          setTimeout(() => {
            navigate('/sell')
          }, 310);
        }} >Sell</h2>
      </div>
      <div onClick={()=>{
        mobileNav.current.classList.remove("mobileNavShow")
        setTimeout(() => {
          navigate('/log-in')
        }, 310);
      }} className="singInDiv">
        <i className="fa fa-user" aria-hidden="true"></i>
        <h4>Sing in</h4>
      </div>
    </div> 
  </div>
{/* MOBILE HEADER END */}


</div>;
}
