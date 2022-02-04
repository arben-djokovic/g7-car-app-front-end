import React, { useState } from 'react';
import Header from './Header';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import {  Navigation, Pagination, Mousewheel, Keyboard  } from "swiper";
import '../styles/HomeStyle/HomeStyle.css'
import Car from './Car';
import { useNavigate } from 'react-router';

export default function HomePage() {
  let [selectedAll, setSelectedAll] = useState(true)
  let [selectedNew, setSelectedNew] = useState(false)
  let [selectedUsed, setSelectedUsed] = useState(false)
  let [selectedRange, setSelectedRange] = useState(0)
  let [selectedRecomendedNew, setSelectedRecomendedNew] = useState(true)
  let [selectedRecomendedUsed, setSelectedRecomendedUsed] = useState(false)
  const navigate = useNavigate()


  return <div className='homePage'>
    <Header />

    <div className="firstSection">
      <Swiper 
        pagination={true} 
        modules={[Pagination]} 
        loop={true}
        pagination={{
          clickable: true,
        }} 
        className="mySwiper">
          <SwiperSlide>
            <div className="sliderSection">
              <img src="./assets/background-image1.png" alt="" />
              <div className="textSlider">
                <h1>Find your dream car</h1>
                <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </h2>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="sliderSection">
              <img src="./assets/background-image1.png" alt="" />
              <div className="textSlider">
                <h1>Find your dream car</h1>
                <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </h2>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="sliderSection">
              <img src="./assets/background-image1.png" alt="" />
              <div className="textSlider">
                <h1>Find your dream car</h1>
                <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </h2>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="sliderSection">
              <img src="./assets/background-image1.png" alt="" />
              <div className="textSlider">
                <h1>Find your dream car</h1>
                <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </h2>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        <div className="searchDiv">
          <div className="searchHeader">
            {selectedAll ? <h2 className='searchSelected'>All</h2> : <h2 onClick={()=>{
              setSelectedAll(true)
              setSelectedNew(false)
              setSelectedUsed(false)
            }} className='searchNotSelected'>All</h2>}
            {selectedNew ? <h2 className='searchSelected'>New</h2> : <h2 onClick={()=>{
              setSelectedAll(false)
              setSelectedNew(true)
              setSelectedUsed(false)
            }} className='searchNotSelected'>New</h2>}
            {selectedUsed ? <h2 className='searchSelected'>Used</h2> : <h2 onClick={()=>{
              setSelectedAll(false)
              setSelectedNew(false)
              setSelectedUsed(true)
            }} className='searchNotSelected'>Used</h2>}
          </div>
          <div className='seconAndFirst'>
              <div className="searchSecondDiv">
              <div className="searchSecondDivInput">
                <i className="fa fa-search" aria-hidden="true"></i>
                <input placeholder='Search' type="text" />
              </div>
              <select className='select' name="Model" id="1">
                <option value="1">Model</option>
                <option value="2">Golf</option>
                <option value="3">Audi</option>
              </select>
              <select className='select' name="Brand" id="2">
                <option value="1">Brand</option>
                <option value="2">Brand 1</option>
                <option value="3">Brand 2</option>
              </select>
            </div>
            <div className="searchThirdDiv">
              <div className="searchSecondDivInput">
              <i className="fa fa-map-marker" aria-hidden="true"></i>
                <input placeholder='Search' type="text" />
              </div>
              <div className="price">
                <div className="priceText">
                  <div className="priceTextFirst">
                    Price Range
                  </div>
                  <div className="priceTextSecond">
                    $0 - $30,000
                  </div>
                </div>
                <div className="range">
                  <h2>{'$'  + selectedRange}</h2>
                  <input step={100} onChange={(e)=>{setSelectedRange(e.target.value)}} type="range" min={0} max={30000} />
                </div>
              </div>
              <div className='submit'>Submit</div>
            </div>
          </div>
          
        </div>
      </div>

      <div className="recommendedCars">
        <h2>Recommended Cars</h2>
        <div className="recommendedHeader">
          <div className="selecting">
            {selectedRecomendedNew ? <h2 className='selected'>New</h2> : <h2 onClick={()=>{
              setSelectedRecomendedNew(true)
              setSelectedRecomendedUsed(false)
            }} className='unSelected'>New</h2>}
            {selectedRecomendedUsed ? <h2 className='selected'>Used</h2> : <h2 onClick={()=>{
              setSelectedRecomendedNew(false)
              setSelectedRecomendedUsed(true)
            }} className='unSelected'>Used</h2>}
          </div>
          <p onClick={()=>{
            navigate('/new-cars')
          }}>See more {'>'}</p>
        </div>
        <div className="recommendedNewCarsPc">
          <Car isNew={true} />
          <Car isNew={true} />
          <Car isNew={true} />
        </div>
        <div className="recommendedNewCarMobile">
          <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
          >
            <SwiperSlide><Car isNew={true} /></SwiperSlide>
            <SwiperSlide><Car isNew={true} /></SwiperSlide>
            <SwiperSlide><Car isNew={true} /></SwiperSlide>
          </Swiper>
        </div>
      </div>

  </div>;
}
