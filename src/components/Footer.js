import React from 'react';
import '../styles/FooterStyle/FooterStyle.css'
export default function Footer() {
  return <div className='footer'>
    <img className='logo' src="./assets/logo.png" alt="" />
    <div className="footerSecond">
      <div className='links'>
        <p>ABOUT US</p>
        <p>FAQ</p>
        <p>CONTACT</p>
      </div>
      <div>
        <p>CUSTOMER SERVICE</p>
        <p>info@car.com</p>
        <p>069-405-596</p>
      </div>
      <div>
        <p>3926 Tuzi,</p>
        <p>3926 Podgorica,</p>
        <p>Montenegro</p>
        <div className="icons">
          <img src="./assets/facebook-icon.png" alt="" />
          <img src="./assets/instagram-icon.png" alt="" />
          <img src="./assets/youtube-icon.png" alt="" />
        </div>
      </div>
    </div>
    <div className="footerThird">
      <p>2021 Autohunt. All Rights reserved</p>
    </div>
  </div>;
}
