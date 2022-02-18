import React from 'react';
import '../styles/FooterStyle/FooterStyle.css'
import { useNavigate } from 'react-router';

export default function Footer() {
  
  const navigate = useNavigate()

  return <div className='footer'>
    <img onClick={()=>{navigate('/')}} className='logo' src="../assets/logo.png" alt="" />
    <div className="footerSecond">
      <div className='links'>
        <p onClick={()=>{
          navigate('/about')
        }}>ABOUT US</p>
        <p onClick={()=>{
          navigate('/faq')
        }}>FAQ</p>
        <p onClick={()=>{
          navigate('/contact')
        }}>CONTACT</p>
      </div>
      <div>
        <p>CUSTOMER SERVICE</p>
        <p><a href='mailto:info@car.com'>info@car.com</a></p>
        <p><a href='tel:+38269405596'>069-405-596</a></p>
      </div>
      <div>
        <p>3926 Podgorica,</p>
        <p>Montenegro</p>
        <div className="icons">
          <img src="../assets/facebook-icon.png" alt="" />
          <img src="../assets/instagram-icon.png" alt="" />
          <img src="../assets/youtube-icon.png" alt="" />
        </div>
      </div>
    </div>
    <div className="footerThird">
      <p>2021 Autohunt. All Rights reserved</p>
    </div>
  </div>;
}
