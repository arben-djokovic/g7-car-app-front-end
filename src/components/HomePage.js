import React, { useState } from 'react';
import Header from './Header';
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import '../styles/HomeStyle/HomeStyle.css'

export default function HomePage() {
  let [selectedAll, setSelectedAll] = useState(true)
  let [selectedNew, setSelectedNew] = useState(false)
  let [selectedUsed, setSelectedUsed] = useState(false)
  let [selectedRange, setSelectedRange] = useState(0)

  return <div className='homePage'>
    <Header />
    <div className="firstSection">
      <Swiper 
        pagination={true} 
        modules={[Pagination]} 
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
          <SwiperSlide><div className="sliderSection">
              <img src="./assets/background-image1.png" alt="" />
              <div className="textSlider">
                <h1>Find your dream car</h1>
                <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </h2>
              </div>
            </div></SwiperSlide>
          <SwiperSlide><div className="sliderSection">
              <img src="./assets/background-image1.png" alt="" />
              <div className="textSlider">
                <h1>Find your dream car</h1>
                <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </h2>
              </div>
            </div></SwiperSlide>
          <SwiperSlide><div className="sliderSection">
              <img src="./assets/background-image1.png" alt="" />
              <div className="textSlider">
                <h1>Find your dream car</h1>
                <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </h2>
              </div>
            </div></SwiperSlide>
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
                  $0 - $3,000
                </div>
              </div>
              <div className="range">
                <h2>{'$'  + selectedRange}</h2>
                <input step={100} onChange={(e)=>{setSelectedRange(e.target.value)}} type="range" min={0} max={300000} />
              </div>
            </div>
            <div className='submit'>Submit</div>
          </div>
        </div>
      </div>
  </div>;
}
