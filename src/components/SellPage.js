import React, { useState, useEffect, useRef } from 'react';
import '../styles/SellStyle/SellStyle.css'
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import api from '../api/apiCalls'

export default function SellPage() {

  // refs
  const refTitle = useRef()
  const refCondition = useRef()
  // version 2 => const refImages = useRef()
  const refPrice = useRef()
  const refCity = useRef()
  const refFuelType = useRef()
  const refColor = useRef()
  const refBrand = useRef()
  const refModel = useRef()
  const refBodyType = useRef()
  const refYear = useRef()
  const refMileage = useRef()
  const refTransmission = useRef()
  const refDescription = useRef()
  const refDrivetrain = useRef()
  const refPower = useRef()
  const refEngineCapacity = useRef()

  let [passengerCapacity, setPassengerCapacity] = useState(2)
  let [images, setImages] = useState([]);
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
  let [selectedTransmission, setSelectedTransmission] = useState('')
  let [selectedDrivetrain, setSelectedDrivetrain] = useState('')
  let [selectedBrand, setSelectedBrand] = useState('')
  let [selectedModel, setSelectedModel] = useState('')
  let [selectedColor, setSelectedColor] = useState('')
  let [selectedFeatures, setSelectedFeatures] = useState('')
  let [description, setDescription] = useState('')
  let [year, setYear] = useState('')
  let [fuelType, setFuelType] = useState('')
  // let [vehicleHistoryFile, setVehicleHistoryFile] = useState('');
  let [position, setPosition] = useState([42.768804, 19.263593])


  useEffect(() => {
    window.scrollTo(0, 0)
    fetchBrands()
    fetchBodyTypes()
    fetchColors()
    fetchDrivetrains()
    fetchFuelTypes()
    fetchTransmissions()
    fetchLocation()
    fetchUserInfo()
    setTimeout(() => {
      setYearsOptions(yearsOptionFirst)
    }, 500);
  }, [])

  useEffect(()=>{
    selectedBrand && fetchModels()
  },[selectedBrand])
  
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
  
    let yearsOptionFirst = []
    for(let i = 2022; i > 1980; i--){
      yearsOptionFirst = [...yearsOptionFirst, {label: i, value: i}]
    }
    //options 
    let [optionsTransmissions, setOptionsTransmissions] = useState([])
    let [exteriorColors, setExteriorColors] = useState([])
    let [optionsDrivetrains, setOptionsDrivetrains] = useState([])
    let [optionsBrands, setOptionsBrands] = useState([])
    let [optionsLocation, setOptionsLocation] = useState([])
    let [optionsModels, setOptionsModels] = useState([])
    let [optionsFuelTypes, setOptionsFuelTypes] = useState([])
    let [userInfo, setUserInfo] = useState({})
    let [yearsOptions, setYearsOptions] = useState([])
    let [bodyTypesOptions, setBodyTypesOptions] = useState([])
    let featuresOptions = ['Power Steering','Heated Seats','Rear Parking Sensor','USB Port','AC','Wifi','Roof Rack','Sound System','Alarm','Cruise Control','Power Windows','Memory Seat','Bluetooth','Front Parking Sensor','Sunroof', 'Other']

  //fetch functions
  const fetchBodyTypes = async () => {
    try{
      let brands = []
      const response = await api.get('/vehicle-types')
      response.data.forEach(element => {
        brands.push({value: element.value, label: element.value})
      });
      setTimeout(() => {
        setBodyTypesOptions(brands)
      }, 100);
    }
    catch(err){
      console.log('error')
      console.log(err)
    }
  }
  const fetchBrands = async () => {
    try{
      const response = await api.get('/brands')
      let brands = []
      response.data.forEach(element => {
        brands.push({value: element.value, label: element.value})
      });
      setTimeout(() => {
        setOptionsBrands(brands)
      }, 100);
    }
    catch(err){
      console.log('error')
      console.log(err)
    }
  }
  const fetchModels = async () => {
    try {
      const response = await api.get('/models/' + selectedBrand)
      let models = []
      response.data.forEach(element => {
        models.push({ value: element.value, label: element.value })
      });
      setTimeout(() => {
        setOptionsModels(models)
      }, 100);
    }
    catch (err) {
      console.log('error')
      console.log(err)
    }
  }
  const fetchColors = async () => {
    try{
      const response = await api.get('/colors')
      let brands = []
      response.data.forEach(element => {
        brands.push({value: element.value, label: element.value})
      });
      setTimeout(() => {
        setExteriorColors(brands)
      }, 100);
    }
    catch(err){
      console.log('error')
      console.log(err)
    }
  }
  const fetchDrivetrains = async () => {
    try{
      const response = await api.get('/drivetrains')
      let brands = []
      response.data.forEach(element => {
        brands.push({value: element.value, label: element.value})
      });
      setTimeout(() => {
        setOptionsDrivetrains(brands)
      }, 100);
    }
    catch(err){
      console.log('error')
      console.log(err)
    }
  }
  const fetchFuelTypes = async () => {
    try{
      const response = await api.get('/fuel-types')
      let brands = []
      response.data.forEach(element => {
        brands.push({value: element.value, label: element.value})
      });
      setTimeout(() => {
        setOptionsFuelTypes(brands)
      }, 100);
    }
    catch(err){
      console.log('error')
      console.log(err)
    }
  }
  const fetchTransmissions = async () => {
    try{
      const response = await api.get('/gear-types')
      let brands = []
      response.data.forEach(element => {
        brands.push({value: element.value, label: element.value})
      });
      setTimeout(() => {
        setOptionsTransmissions(brands)
      }, 100);
    }
    catch(err){
      console.log('error')
      console.log(err)
    }
  }
  const fetchLocation = async () => {
    try {
      const response = await api.get('/locations')
      let brands = []
      response.data.forEach(element => {
        brands.push({ value: element.value, label: element.value, latitude: element.latitude, longitude: element.longitude })
      });
      setTimeout(() => {
        setOptionsLocation(brands)
      }, 100);
    }
    catch (err) {
      console.log('error')
      console.log(err)
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

  const changeCity = (e) => {
    setCity(e.value)
    setPosition([Number(e.latitude), Number(e.longitude)])
  }
  
  // version 2 =>  const removeImage = (img1) => {
  //   let newArray = [...images]

  //   for( var i = 0; i < newArray.length; i++){               
  //     if ( newArray[i] === img1) { 
  //         newArray.splice(i, 1); 
  //         i--; 
  //     }
  //   } 
  //   setTimeout(() => {
  //     setImages([...newArray])
  //   }, 200);
  // }
  const fetchUserInfo = async() => {
    console.log(localStorage.getItem('username'))
    try{
      const response = await api.get('/user/' + localStorage.getItem('username'))
      setUserInfo(response.data[0])
    }
    catch(err){
      console.log(err)
    }
  }


  const checkFields = () => {
    if(titleField.length < 2 || (condition1Field == 'off' && condition2Field == 'off') || price.length === 0 /* || images.length < 3 */ || city.length === 0 || selectedBrand.length === 0 || selectedModel.length === 0 || bodyType.length === 0 || year.length === 0 || selectedColor.length === 0 || power.length === 0 || engineCapacity.length === 0 || selectedDrivetrain.length === 0 || description.length === 0 || selectedColor.length === 0 || selectedTransmission.length === 0 || fuelType.length === 0){
      if(titleField.length < 2){
        refTitle.current.style.color = 'red'
      }
      else{
        refTitle.current.style.color = 'transparent'
      }
      if(condition1Field == 'off' && condition2Field == 'off'){
        refCondition.current.style.color = 'red'
      }
      else{
        refCondition.current.style.color = 'transparent'
      }
      if(price.length === 0){
        refPrice.current.style.color = 'red'
      }
      else{
        refPrice.current.style.color = 'transparent'
      }
      // version2 =>  if(images.length < 3){
      //   refImages.current.style.color = 'red'
      //   toast.error('Add minimum 3 images of your car')
      // }
      // else{
      //   refImages.current.style.color = 'transparent'
      // }
      if(city.length === 0){
        refCity.current.style.color = 'red'
      }
      else{
        refCity.current.style.color = 'transparent'
      }
      if(selectedBrand === ''){
        refBrand.current.style.color = 'red'
      }
      else{
        refBrand.current.style.color = 'transparent'
      }
      if(selectedModel === ''){
        refModel.current.style.color = 'red'
      }
      else{
        refModel.current.style.color = 'transparent'
      }
      if(bodyType === ''){
        refBodyType.current.style.color = 'red'
      }
      else{
        refBodyType.current.style.color = 'transparent'
      }
      if(year === ''){
        refYear.current.style.color = 'red'
      }
      else{
        refYear.current.style.color = 'transparent'
      }
      if(fuelType.length === 0){
        refFuelType.current.style.color = 'red'
      }
      else{
        refFuelType.current.style.color = 'transparent'
      }
      if(mileage.length === 0){
        refMileage.current.style.color = 'red'
      }
      else{
        refMileage.current.style.color = 'transparent'
      }
      if(selectedTransmission.length === 0){
        refTransmission.current.style.color = 'red'
      }
      else{
        refTransmission.current.style.color = 'transparent'
      }
      if(selectedColor.length === 0){
        refColor.current.style.color = 'red'
      }
      else{
        refColor.current.style.color = 'transparent'
      }
      if(description.length === 0){
        refDescription.current.style.color = 'red'
      }
      else{
        refDescription.current.style.color = 'transparent'
      }
      if(selectedDrivetrain.length === 0){
        refDrivetrain.current.style.color = 'red'
      }
      else{
        refDrivetrain.current.style.color = 'transparent'
      }
      if(engineCapacity.length === 0){
        refEngineCapacity.current.style.color = 'red'
      }
      else{
        refEngineCapacity.current.style.color = 'transparent'
      }
      if(power.length === 0){
        refPower.current.style.color = 'red'
      }
      else{
        refPower.current.style.color = 'transparent'
      }
      toast.error('Check fields!')
    }
    else{
      // refImages.current.style.color = 'transparent'
      refCity.current.style.color = 'transparent'
      refCondition.current.style.color = 'transparent'
      refPrice.current.style.color = 'transparent'
      refTitle.current.style.color = 'transparent'
      refBrand.current.style.color = 'transparent'
      refModel.current.style.color = 'transparent'
      refBodyType.current.style.color = 'transparent'
      refYear.current.style.color = 'transparent'
      let newCar = {
          description: description, 
          name: titleField,
          condition: condition1Field ? 'New' : 'Used',
          brand: selectedBrand,
          brand_model: selectedModel.value,
          vehicle_type: bodyType,
          horse_power: Number(power),
          seat_count: Number(passengerCapacity),
          location: city,
          engine_capacity: Number(engineCapacity),//
          price: Number(price),
          color: selectedColor,
          gear_type: selectedTransmission,
          year: Number(year),
          fuel_type: fuelType,
          drivetrain: selectedDrivetrain,
          //version2 =>  features: [...selectedFeatures],
          length: Number(length),//
          mileage: Number(mileage),//
          width: Number(width),    //
          height: Number(height),  //
          cargo_volume: Number(cargoVolume),//
          user: userInfo.user.id
      }
      addVehicleToBackend(newCar)
    }
  }
  const addVehicleToBackend = async (newCar) =>{
    console.log(newCar)
    try{
      const response = await api.post('/vehicle/', newCar)
      toast.success('Yeyyyyy')
      console.log(response)
    }
    catch(error){
      toast.error('Try again after refreshing page')
      console.log(error.response)
      console.log(error.request)
      console.log(error.message)
    }
  }
  const addOrRemoveFeature = (featureClicked) => {
    if(selectedFeatures.includes(featureClicked)){
      let testArray = [...selectedFeatures]
      testArray.map((el, index) => {
        if(el === featureClicked){
          testArray.splice(index, 1)
        }
      })
      setSelectedFeatures([...testArray])
    }
    else{
      setSelectedFeatures([...selectedFeatures, featureClicked])
    }
  }  

  return <div>
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
            <p>Condition<span ref={refCondition} className='required'>*required</span></p>
            <div className='radioBtns'>
              <div className="radioBtn">
                <input onChange={(e)=>{setCondition1Field(true)}} type="radio" id='1' name="radioBtn" />
                <label htmlFor="1">
                  <p>New</p>
                </label>
              </div>
              <div className="radioBtn">
                <input onChange={(e)=>{setCondition1Field(false)}} type="radio" id='2' name="radioBtn" />
                <label htmlFor="2">
                  <p>Used</p>
                </label>
              </div>
            </div>
          </div>
          <div className="section3">
            <p>Body Type<span ref={refBodyType} className='required'>*required</span></p>
            <Select onChange={(e)=>{setBodyType(e.value)}} className='sectionFirst' styles={customStyles} options={bodyTypesOptions} />
          </div>
          <div className="section4">
            <p>Brand<span ref={refBrand} className='required'>*required</span></p>
            <Select onChange={(e)=>{setSelectedBrand(e.value); setSelectedModel('')}} className='sectionFirst' styles={customStyles} options={optionsBrands} />
          </div>
          <div className="section5">
            <p>Model<span ref={refModel} className='required'>*required</span></p>
            <Select className='select' onChange={(e)=>{setSelectedModel(e)}} value={selectedModel} styles={customStyles} placeholder={'Models...'} options={optionsModels} />
          </div>
          <div className="section6">
            <p>Year<span ref={refYear} className='required'>*required</span></p>
            <Select onChange={(e)=>{setYear(e.value)}} className='sectionFirst' styles={customStyles} options={yearsOptions} />
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
            <p>Exterior Color<span ref={refColor} className='required'>*required</span></p>
            <Select className='sectionFirst' onChange={(e)=>{setSelectedColor(e.value)}} styles={customStyles} options={exteriorColors} />
          </div>
          <div className="section9">
            <p>Description<span ref={refDescription} className='required'>*required</span></p>
            <textarea maxLength={250} onChange={(e)=>{setDescription(e.target.value)}} placeholder='Write description about your car' className='textArea' id="" cols="30" rows="8"></textarea>
          </div>
        </div>
      </div>

      <div className="engineDetails">
        <h2>Engine Details</h2>
        <div className="mainSecion">
          <div className='first'>
            <p>Fuel Type<span ref={refFuelType} className='required'>*required</span></p>
            <Select onChange={(e)=>{setFuelType(e.value)}} className='select' styles={customStyles} options={optionsFuelTypes} />
          </div>
          <div className='mid'>
            <p>Mileage<span ref={refMileage} className='required'>*required</span></p>
            <div className="inputDiv">
              <input onChange={(e)=>{setMileage(e.target.value)}} type="number" name="" id="" />
              <p>km</p>
            </div>
          </div>
          <div className='last'>
            <p>Transmission<span ref={refTransmission} className='required'>*required</span></p>
            <Select className='select' onChange={(e)=>{setSelectedTransmission(e.value)}} styles={customStyles} options={optionsTransmissions} />
          </div>
          <div className='first'>
            <p>Drivetrain<span ref={refDrivetrain} className='required'>*required</span></p>
            <Select className='select' onChange={(e)=>{setSelectedDrivetrain(e.value)}} styles={customStyles} options={optionsDrivetrains} />
          </div>
          <div className='mid'>
            <p>Engine Capacity<span ref={refEngineCapacity} className='required'>*required</span></p>
            <div className="inputDiv">
              <input onChange={(e)=>{setEngineCapacity(e.target.value)}} type="number" name="" id="" />
              <p>km</p>
            </div>
          </div>
          <div className='last'>
            <p>Power<span ref={refPower} className='required'>*required</span></p>
            <div className="inputDiv">
              <input onChange={(e)=>{setPower(e.target.value)}} type="number" name="" id="" />
              <p>hp</p>
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
          {featuresOptions.map(featureOption => {
            return(
            <div key={featureOption} className="checkDiv">
              <input type="checkbox" onClick={()=>{addOrRemoveFeature(featureOption)}} name="featuresCheckbox" id={'featuresOptions' + featureOption} />
              <label htmlFor={'featuresOptions' + featureOption}>
                <p>{featureOption}</p>
              </label>
            </div>
            )
          })}
        
        </div>
        {/* <textarea placeholder='Write another feature here' className='textArea' name="" id="" cols="30" rows="10"></textarea> */}
      </div>

      <div className="location">
        <h2>Location</h2>
        <div className="content">
          <p>City:<span ref={refCity} className='required'>*required</span></p>
          <Select onChange={(e)=>{changeCity(e)}} className='selectLocation' options={optionsLocation} styles={customStyles} />
          <div className="map" id="map">
        <MapContainer center={position} zoom={8}>
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
          <p>Full Price:<span ref={refPrice} className='required'>*required</span></p>
          <div className="input">
            <p>$</p>
            <input onChange={(e)=>{setPrice(e.target.value)}} type="number" />
          </div>
          
        </div>
      </div>

      {/*version2 =>  <div className="images">
        <h2>Images<span ref={refImages} className='required'>*required (min 3)</span></h2>
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
      </div> */}

      {/* <div className="vehicleHistory">
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
      </div> */}

      <div className="sellMyCar">
        <p onClick={checkFields}>Sell My Car</p>
      </div>
    </form>
    <ToastContainer />
  </div>;
}
