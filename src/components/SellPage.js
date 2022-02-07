import React, { useState } from 'react';
import Header from './Header';
import '../styles/SellStyle/SellStyle.css'
import Footer from './Footer';
import Select from 'react-select'

export default function SellPage() {
  const options = [
    { value: 'Tuzi', label: 'Tuzi' },
    { value: 'Berane', label: 'Berane' },
    { value: 'Plav', label: 'Plav' },
    { value: 'Petnjica', label: 'Petnjica' }
  ]
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
  }
  let [passengerCapacity, setPassengerCapacity ] = useState(2)
  return <div>
    <Header />
    <div className="sellPage">
      <div className="header">
        <h1>Sell Your Car</h1>
        <p>Homepage - Sell</p>
      </div>
      <div className="carDetails">
        <h2>Car Details</h2>
        <div className="carDetailsMain">
          <div className="section1">
            <p>Title</p>
            <input type="text" />
          </div>
          <div className="section2">
            <p>Condition</p>
            <div className='radioBtns'>
              <div className="radioBtn">
                <input type="radio" id='1' name="radioBtn" />
                <label htmlFor="1">
                  <p>New</p>
                </label>
              </div>
              <div className="radioBtn">
                <input type="radio" id='2' name="radioBtn" />
                <label htmlFor="2">
                  <p>Used</p>
                </label>
              </div>
            </div>
          </div>
          <div className="section3">
            <p>Body Type</p>
            <Select className='sectionFirst' styles={customStyles} options={options} />
          </div>
          <div className="section4">
            <p>Brand</p>
            <Select className='sectionFirst' styles={customStyles} options={options} />
          </div>
          <div className="section5">
            <p>Model</p>
            <Select className='sectionFirst' styles={customStyles} options={options} />
          </div>
          <div className="section6">
            <p>Year</p>
            <Select className='sectionFirst' styles={customStyles} options={options} />
          </div>
          <div className="section7">
            <p>Passenger Capacity</p>
            <div className="counter">
              <i onClick={()=>{
                if(passengerCapacity != 0){
                  setPassengerCapacity(passengerCapacity => passengerCapacity - 1)
                }
              }} class="fa fa-minus" aria-hidden="true"></i>
              <div className="counterNumber">{passengerCapacity}</div>
              <i onClick={()=>{
                setPassengerCapacity(passengerCapacity => passengerCapacity + 1)
              }} class="fa fa-plus" aria-hidden="true"></i>
            </div>
          </div>
          <div className="section8">
            <p>Exterior Color</p>
            <Select className='sectionFirst' styles={customStyles} options={options} />
          </div>
          <div className="section9">
            <p>Description</p>
            <textarea maxLength={250} placeholder='Write description about your car' className='textArea' id="" cols="30" rows="8"></textarea>
          </div>
        </div>

      </div>
    </div>
    <Footer />
  </div>;
}
