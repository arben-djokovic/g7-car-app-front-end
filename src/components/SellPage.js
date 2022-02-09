import React, { useState } from 'react';
import Header from './Header';
import '../styles/SellStyle/SellStyle.css'
import Footer from './Footer';
import Select from 'react-select'

export default function SellPage() {
  const options = [
    { value: '1', label: 'Opcija 1' },
    { value: '2', label: 'Opcija 2' },
    { value: '3', label: 'Opcija 3' },
    { value: '4', label: 'Opcija 4' }
  ]
  
  let inputImage = (e) => {

    for(let i = 0;  i <= e.target.files.length; i++){
      if (e.target.files && e.target.files[i]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          setImages(images => [...images, e.target.result])
        };
        reader.readAsDataURL(e.target.files[i]);
      }
    }
    
    
  }

  let [images, setImages] = useState([]);
  let [vehicleHistoryFile, setVehicleHistoryFile] = useState('');
  
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

  let [passengerCapacity, setPassengerCapacity] = useState(2)
  
  const removeImage = (img1) => {
    let newArray = [...images]

    for( var i = 0; i < newArray.length; i++){               
      if ( newArray[i] === img1) { 
          newArray.splice(i, 1); 
          i--; 
      }
    } 
    setTimeout(() => {
      setImages([...newArray])
    }, 200);
  }

  return <div>
    <Header />
    <form className="sellPage">
      <div className="header">
        <h1>Sell Your Car</h1>
        <p>Homepage - Sell</p>
      </div>
      <div className="carDetails">
        <h2>Car Details</h2>
        <div className="carDetailsMain">
          <div className="section1">
            <p>Title<span className='required'>*required</span></p>
            <input type="text" />
          </div>
          <div className="section2">
            <p>Condition<span className='required'>*required</span></p>
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
              <i onClick={() => {
                if (passengerCapacity != 0) {
                  setPassengerCapacity(passengerCapacity => passengerCapacity - 1)
                }
              }} className="fa fa-minus" aria-hidden="true"></i>
              <div className="counterNumber">{passengerCapacity}</div>
              <i onClick={() => {
                setPassengerCapacity(passengerCapacity => passengerCapacity + 1)
              }} className="fa fa-plus" aria-hidden="true"></i>
            </div>
          </div>
          <div className="section8">
            <p>Exterior Color<span className='required'>*required</span></p>
            <Select className='sectionFirst' styles={customStyles} options={options} />
          </div>
          <div className="section9">
            <p>Description</p>
            <textarea maxLength={250} placeholder='Write description about your car' className='textArea' id="" cols="30" rows="8"></textarea>
          </div>
        </div>
      </div>

      <div className="engineDetails">
        <h2>Engine Details</h2>
        <div className="mainSecion">
          <div className='first'>
            <p>Fuel Type<span className='required'>*required</span></p>
            <Select className='select' styles={customStyles} options={options} />
          </div>
          <div className='mid'>
            <p>Mileage</p>
            <div className="inputDiv">
              <input type="number" name="" id="" />
              <p>km</p>
            </div>
          </div>
          <div className='last'>
            <p>Transmission</p>
            <Select className='select' styles={customStyles} options={options} />
          </div>
          <div className='first'>
            <p>Drivetrain</p>
            <Select className='select' styles={customStyles} options={options} />
          </div>
          <div className='mid'>
            <p>Engine Capacity</p>
            <div className="inputDiv">
              <input type="number" name="" id="" />
              <p>km</p>
            </div>
          </div>
          <div className='last'>
            <p>Power</p>
            <div className="inputDiv">
              <input type="number" name="" id="" />
              <p>km</p>
            </div>
          </div>
        </div>
      </div>

      <div className="dimensions">
        <h2>Dimensions</h2>
        <div className="dimensionSection">
          <div className="inputDiv">
            <p>Length</p>
            <div>
              <input type="number" />
              <p>mm</p>
            </div>
          </div>
          <div className="inputDiv">
            <p>Width</p>
            <div>
              <input type="number" />
              <p>mm</p>
            </div>
          </div>
          <div className="inputDiv">
            <p>Height</p>
            <div>
              <input type="number" />
              <p>mm</p>
            </div>
          </div>
          <div className="inputDiv">
            <p>Cargo Volume</p>
            <div>
              <input type="number" />
              <p>L</p>
            </div>
          </div>
        </div>
      </div>

      <div className="features">
        <h2>Features</h2>
        <div className="checkList">
          <div className="checkDiv"><input type="checkbox" name="featuresCheckbox" id="11" />
            <label htmlFor="11">
              <p>Power Steering</p>
            </label>
          </div>
          <div className="checkDiv"><input type="checkbox" name="featuresCheckbox" id="12" />
            <label htmlFor="12">
              <p>Heated Seats</p>
            </label>
          </div>
          <div className="checkDiv"><input type="checkbox" name="featuresCheckbox" id="13" />
            <label htmlFor="13">
              <p>Rear Parking Sensor</p>
            </label>
          </div>
          <div className="checkDiv"><input type="checkbox" name="featuresCheckbox" id="14" />
            <label htmlFor="14">
              <p>USB Port</p>
            </label>
          </div>
          <div className="checkDiv"><input type="checkbox" name="featuresCheckbox" id="15" />
            <label htmlFor="15">
              <p>AC</p>
            </label>
          </div>
          <div className="checkDiv"><input type="checkbox" name="featuresCheckbox" id="16" />
            <label htmlFor="16">
              <p>Wifi</p>
            </label>
          </div>
          <div className="checkDiv"><input type="checkbox" name="featuresCheckbox" id="17" />
            <label htmlFor="17">
              <p>Roof Rack</p>
            </label>
          </div>
          <div className="checkDiv"><input type="checkbox" name="featuresCheckbox" id="18" />
            <label htmlFor="18">
              <p>Sound System</p>
            </label>
          </div>
          <div className="checkDiv"><input type="checkbox" name="featuresCheckbox" id="19" />
            <label htmlFor="19">
              <p>Alarm</p>
            </label>
          </div>
          <div className="checkDiv"><input type="checkbox" name="featuresCheckbox" id="20" />
            <label htmlFor="20">
              <p>Cruise Control</p>
            </label>
          </div>
          <div className="checkDiv"><input type="checkbox" name="featuresCheckbox" id="21" />
            <label htmlFor="21">
              <p>Power Windows</p>
            </label>
          </div>
          <div className="checkDiv"><input type="checkbox" name="featuresCheckbox" id="22" />
            <label htmlFor="22">
              <p>Memory Seat</p>
            </label>
          </div>
          <div className="checkDiv"><input type="checkbox" name="featuresCheckbox" id="23" />
            <label htmlFor="23">
              <p>Bluetooth</p>
            </label>
          </div>
          <div className="checkDiv"><input type="checkbox" name="featuresCheckbox" id="24" />
            <label htmlFor="24">
              <p>Front Parking Sensor</p>
            </label>
          </div>
          <div className="checkDiv"><input type="checkbox" name="featuresCheckbox" id="25" />
            <label htmlFor="25">
              <p>Sunroof</p>
            </label>
          </div>
          <div className="checkDiv"><input type="checkbox" name="featuresCheckbox" id="26" />
            <label htmlFor="26">
              <p>Other</p>
            </label>
          </div>
        </div>
        <textarea placeholder='Write another feature here' className='textArea' name="" id="" cols="30" rows="10"></textarea>
      </div>

      <div className="location">
        <h2>Location</h2>
        <div className="content">
          <p>City:<span className='required'>*required</span></p>
          <Select className='selectLocation' options={options} styles={customStyles} />
        </div>
      </div>

      <div className="price">
        <h2>Price</h2>
        <div className="content">
          <p>Full Price:<span className='required'>*required</span></p>
          <div className="input">
            <p>$</p>
            <input type="text" />
          </div>
          
        </div>
      </div>

      <div className="images">
        <h2>Images<span className='required'>*required</span></h2>
        <div className="content">
          <div className="displayImages">
            {images.length ? images.map((img1, i) => {
              return(<div className='imagesDiv' key={i}>
                <img src={img1} alt="" />
                <i onClick={()=>{removeImage(img1)}} className='fa fa-close'></i>
              </div>)
            }) : <p>No image is selected</p>}
          </div>
          <input className='fileInput' id='fileInput' multiple type="file" onChange={inputImage} accept="image/gif, image/jpeg, image/png" />
          <label className='labelInput' htmlFor="fileInput">
            <p className='inputBtn'>Chose image</p>
          </label>
        </div>
      </div>

      <div className="vehicleHistory">
        <h2>Vehicle History</h2>
        <div className="selectInput">
          <input className='fileInput' onChange={(e)=>{setVehicleHistoryFile(e.target.files[0].name)}} id='fileInputHistory' type="file" />
          <label htmlFor="fileInputHistory">
            <p className="choseFile">Chose File</p>
          </label>
          <div className="chosenFile">
            <p>{vehicleHistoryFile ? vehicleHistoryFile : 'No file selected'}</p>
          </div>
        </div>
      </div>

      <div className="sellMyCar">
        <p >Sell My Car</p>
      </div>
    </form>
    <Footer />
  </div>;
}
