import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import '../styles/SellStyle/SellStyle.css'
import Footer from './Footer';
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export default function SellPage() {
  const refTitle = useRef()
  const refCondition = useRef()
  const refImages = useRef()
  const refPrice = useRef()
  const refCity = useRef()
  const refFuelType = useRef()
  const refColor = useRef()
  let [position, setPosition] = useState([40.00000, 31.332322])


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
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

  let [passengerCapacity, setPassengerCapacity] = useState(2)
  let [images, setImages] = useState([]);
  let [vehicleHistoryFile, setVehicleHistoryFile] = useState('');
  let [titleField, setTitleField] = useState('')
  let [condition1Field, setCondition1Field]= useState('off')
  let [condition2Field, setCondition2Field]= useState('off')
  let [city, setCity] = useState('')
  let [price, setPrice] = useState('')
  let [cargoVolume, setCargoVolume] = useState('')
  let [height, setHeight] = useState('')
  let [width, setWidth] = useState('')
  let [length, setLength] = useState('')
  let [power, setPower] = useState('')
  let [engineCapacity, setEngineCapacity] = useState('')
  let [mileage, setMileage] = useState('')
  let [bodyType, setBodyType] = useState('')
  let [brand, setBrand] = useState('')
  let [model, setModel] = useState('')
  let [fuelType, setFuelType] = useState('')

  const checkFields = () => {
    if(titleField.length < 2 || (condition1Field == 'off' && condition2Field == 'off') || price.length === 0 || images.length < 3 && city.length === 0){
      if(titleField.length < 2){
        refTitle.current.style.color = 'red'
        toast.error('Add car title ')
      }
      else{
        refTitle.current.style.color = 'transparent'
      }
      if(condition1Field == 'off' && condition2Field == 'off'){
        refCondition.current.style.color = 'red'
        toast.error('Set car condition')
      }
      else{
        refCondition.current.style.color = 'transparent'
      }
      console.log(price)
      if(price.length === 0){
        refPrice.current.style.color = 'red'
        toast.error('Add price for your car')
      }
      else{
        refPrice.current.style.color = 'transparent'
      }
      if(images.length < 3){
        refImages.current.style.color = 'red'
        toast.error('Add minimum 3 images of your car')
      }
      else{
        refImages.current.style.color = 'transparent'
      }
      if(city.length === 0){
        refCity.current.style.color = 'red'
        toast.error('Chose city')
      }
      else{
        refCity.current.style.color = 'transparent'
      }
    }
    else{
      refImages.current.style.color = 'transparent'
      refCity.current.style.color = 'transparent'
      refCondition.current.style.color = 'transparent'
      refPrice.current.style.color = 'transparent'
      refTitle.current.style.color = 'transparent'
      toast.success('Car added!')
    }
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
            <p>Title<span ref={refTitle} className='required'>*error</span></p>
            <input onChange={(e)=>{setTitleField(e.target.value)}} type="text" />
          </div>
          <div className="section2">
            <p>Condition<span ref={refCondition} className='required'>*error</span></p>
            <div className='radioBtns'>
              <div className="radioBtn">
                <input onChange={(e)=>{setCondition1Field(e.target.value)}} type="radio" id='1' name="radioBtn" />
                <label htmlFor="1">
                  <p>New</p>
                </label>
              </div>
              <div className="radioBtn">
                <input onChange={(e)=>{setCondition2Field(e.target.value)}} type="radio" id='2' name="radioBtn" />
                <label htmlFor="2">
                  <p>Used</p>
                </label>
              </div>
            </div>
          </div>
          <div className="section3">
            <p>Body Type</p>
            <Select onChange={(e)=>{setBodyType(e.value)}} className='sectionFirst' styles={customStyles} options={options} />
          </div>
          <div className="section4">
            <p>Brand</p>
            <Select onChange={(e)=>{setBrand(e.value)}} className='sectionFirst' styles={customStyles} options={options} />
          </div>
          <div className="section5">
            <p>Model</p>
            <Select onChange={(e)=>{setModel(e.value)}} className='sectionFirst' styles={customStyles} options={options} />
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
            <p>Exterior Color<span ref={refColor} className='required'>*error</span></p>
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
            <p>Fuel Type<span ref={refFuelType} className='required'>*error</span></p>
            <Select onChange={(e)=>{setFuelType(e.value)}} className='select' styles={customStyles} options={options} />
          </div>
          <div className='mid'>
            <p>Mileage</p>
            <div className="inputDiv">
              <input onChange={(e)=>{setMileage(e.target.value)}} type="number" name="" id="" />
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
              <input onChange={(e)=>{setEngineCapacity(e.target.value)}} type="number" name="" id="" />
              <p>km</p>
            </div>
          </div>
          <div className='last'>
            <p>Power</p>
            <div className="inputDiv">
              <input onChange={(e)=>{setPower(e.target.value)}} type="number" name="" id="" />
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
              <input onChange={(e)=>{setLength(e.target.value)}} type="number" />
              <p>mm</p>
            </div>
          </div>
          <div className="inputDiv">
            <p>Width</p>
            <div>
              <input onChange={(e)=>{setWidth(e.target.value)}} type="number" />
              <p>mm</p>
            </div>
          </div>
          <div className="inputDiv">
            <p>Height</p>
            <div>
              <input onChange={(e)=>{setHeight(e.target.value)}} type="number" />
              <p>mm</p>
            </div>
          </div>
          <div className="inputDiv">
            <p>Cargo Volume</p>
            <div>
              <input onChange={(e)=>{setCargoVolume(e.target.value)}} type="number" />
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
        {/* <textarea placeholder='Write another feature here' className='textArea' name="" id="" cols="30" rows="10"></textarea> */}
      </div>

      <div className="location">
        <h2>Location</h2>
        <div className="content">
          <p>City:<span ref={refCity} className='required'>*error</span></p>
          <Select onChange={(e)=>{setCity(e.value)}} className='selectLocation' options={options} styles={customStyles} />
          <div className="map" id="map">
        <MapContainer  eventHandlers={{
    click: (e) => {
      console.log('marker clicked', e)
    },
  }} center={position} zoom={12}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
        </div>
      </div>

      <div className="price">
        <h2>Price</h2>
        <div className="content">
          <p>Full Price:<span ref={refPrice} className='required'>*error</span></p>
          <div className="input">
            <p>$</p>
            <input onChange={(e)=>{setPrice(e.target.value)}} type="number" />
          </div>
          
        </div>
      </div>

      <div className="images">
        <h2>Images<span ref={refImages} className='required'>*error</span></h2>
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
        <p onClick={checkFields}>Sell My Car</p>
      </div>
    </form>
    <Footer />
    <ToastContainer />
  </div>;
}
