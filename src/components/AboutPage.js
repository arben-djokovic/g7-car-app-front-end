import React from 'react';
import Header from './Header';
import '../styles/AboutStyle/AboutStyle.css'
import { useNavigate } from 'react-router';
import Footer from './Footer';

export default function AboutPage() {
  const navigate = useNavigate()

  return <div className='about'>
    <Header />
    <div className="firstSection">
      <h1>About Us</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel aliquet tortor ut sit sit. Velit imperdiet integer elementum a scelerisque pulvinar venenatis sodales.</p>
      <p className="firstBtn">June, 02 2022</p>
    </div>

    <img className='secondImage' src="./assets/about-us-img.png" alt="" />

    <div className="ourService">
        <h2>Our Service</h2>
        <div className="second">
          <div onClick={()=>{navigate('new-cars')}}>
            <img src="./assets/buy-car-icon.png" alt="" />
            <p>Buy a new car</p>
          </div>
          <div onClick={()=>{navigate('used-cars')}}>
            <img src="./assets/buy-used-car-icon.png" alt="" />
            <p>Buy an used car</p>
          </div>
          <div onClick={()=>{navigate('sell')}}>
            <img src="./assets/sell-car-icon.png" alt="" />
            <p>Sell my car</p>
          </div>
        </div>
      </div>

      <div className="us">
        <div className="firstSection">
          <h2>Us</h2>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur delectus eaque soluta debitis, corporis officia possimus error similique excepturi magnam rerum incidunt quod voluptate. Inventore iure ipsam ipsum. Aut, facilis.</p>
        </div>
        <div className="infos">
          <div>
            <h3>150</h3>
            <p>Vehicle In Stock</p>
          </div>
          <div>
            <h3>40</h3>
            <p>Sold Car</p>
          </div>
          <div>
            <h3>38</h3>
            <p>Happy Customer</p>
          </div>
          <div>
            <h3>5</h3>
            <p>Awards</p>
          </div>
        </div>
        <img className='usImg' src="./assets/about-us-img2.png" alt="" />
      </div>

      <div className="sponsors">
        <img src="./assets/tesla-logo.png" alt="" />
        <img src="./assets/audi-logo.png" alt="" />
        <img src="./assets/fiat-logo.png" alt="" />
        <img src="./assets/huandai-logo.png" alt="" />
        <img src="./assets/peugeot-logo.png" alt="" />
        <img src="./assets/volvo-logo.png" alt="" />
      </div>
      <Footer />
  </div>;
}
