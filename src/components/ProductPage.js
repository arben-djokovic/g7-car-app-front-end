import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import '../styles/ProductStyle/ProductStyle.css'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useSelector } from 'react-redux';
import api from '../api/apiCalls'

export default function ProductPage() {

  const navigate = useNavigate()

  let compareCar1 = useSelector(store => store.compareCar1)
  let compareCar2 = useSelector(store => store.compareCar2)

  const refName = useRef()
  const refEmail = useRef()
  const refComment = useRef()

  let [location, setLocation] = useState()
  let [position, setPosition] = useState([42.768804, 19.263593])
  let [nameInput, setNameInput] = useState('')
  let [emailInput, setEmailInput] = useState('')
  let [commentInput, setCommentInput] = useState('')
  let [productId, setProductId] = useState(window.location.href.split('/').slice(-1)[0])
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  let [car, setCar] = useState({features: [1,2]})
  let [userInfo, setUserInfo] = useState({user:{email:''}})
  let [images, setImages] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchCarById()
  }, [])

  useEffect(()=>{
    fetchLocation()
  },[location])
  
  useEffect(()=>{
    if(car.created_by){
      fetchUserInfo()
      fetchModelImages()
    }
  },[car])

  const fetchCarById = async () => {
    try{
      const response = await api.get('/vehicle/' + productId + '/')
      setCar(response.data)
      setLocation(response.data.location)
    }
    catch(err){
      console.log('error')
      console.log(err)
    }
  }
  const fetchLocation = async () => {
    try{
      const response = await api.get('/locations')
      response.data.map(locationItem => {
        if(locationItem.value == location){
          setPosition([locationItem.latitude, locationItem.longitude])
        }
      })
    }
    catch(err){
      console.log('error')
      console.log(err)
    }
  }
  const compareThisCar = () => {
    if(compareCar1.length < 1){
      navigate('/compare/' + productId + '&' + compareCar2)
    }
    else if(compareCar2.length < 1){
      navigate('/compare/' + compareCar1 + '&' + productId)
    }
    else{
      navigate('/compare/' + productId + '&' + compareCar2)
    }
  }

  const fetchUserInfo = async() =>{
    try{
      const response = await api.get('/user/' + car.created_by)
      setUserInfo(response.data[0])
    }
    catch(error){
    }
  }

  const contactDealer = () => {
    if (nameInput.length <= 1 || (emailInput.length < 3 || !emailInput.includes('@') || !emailInput.includes('.')) || commentInput.length < 30) {
      if (nameInput.length <= 1) {
        refName.current.style.color = 'red'
        toast.error("Name must have minimum 2 characters!")
      }
      else {
        refName.current.style.color = 'transparent'
      }
      if (emailInput.length < 3 || !emailInput.includes('@') || !emailInput.includes('.')) {
        refEmail.current.style.color = 'red'
        toast.error("Please input real email!")
      }
      else {
        refEmail.current.style.color = 'transparent'
      }
      if (commentInput.length < 30) {
        refComment.current.style.color = 'red'
        toast.error("Comment length must be between 30 - 300!")
      }
      else {
        refComment.current.style.color = 'transparent'
      }
    }
    else {
      refComment.current.style.color = 'transparent'
      refName.current.style.color = 'transparent'
      refEmail.current.style.color = 'transparent'
      toast.success("Message Sent")
    }
  }
  
    const fetchModelImages = async() => {
        if(car.brand_model) {
            try{
                const response = await api.get('/banners/' + car.brand_model + '/')
                setImages([ response.data.image1, response.data.image2, response.data.image3,response.data.banner])
            }
            catch(err){
                console.log(err.response.data)
                console.log(err.request.message)
            }
        }
    }


  return <div className='productPage'>
    <div className="productHeader">
      <h1>{car.name}</h1>
    </div>
    <div className="sliderSection">
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images.map((imgUrl, i) => {
          return(
            <SwiperSlide key={imgUrl + i}>
              <img src={imgUrl} />
            </SwiperSlide>
          )
        })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
      {images.map((imgUrl, i) => {
        return(
          <SwiperSlide key={imgUrl + i}>
            <img src={imgUrl} />
          </SwiperSlide>
        )
      })}

      </Swiper>
    </div>
    <div className="mainSection">
      <div className="firstSection">
        <div className="description">
          <h2>Description</h2>
          <p>{car.description}</p>
        </div>
       {/* <div className="featuresSection">
          <h2>Dealer Info</h2>
           <div className="features">
            {car.features.length > 1 ? car.features.map(feature => {
              return(<div key={feature} className="feature">
              <img src="../assets/checkOn.png" alt="" />
              <p>{feature}</p>
            </div>)}): car.features
          } 
            
          </div>
        </div>*/}
        <div className="dealerInfoSection">
          <h2>Dealer Info</h2>
          <div className="dealerInfo">
            <div className="name">
              <h3>{userInfo.full_name}</h3>
              <p>Dealer</p>
            </div>
            <div className="phone">
              <i className="fa fa-phone"></i>
              <h3>{userInfo.phone}</h3>
            </div>
            <div className="mail">
              <i className="fa fa-envelope"></i>
              <h3>{userInfo.user.email}</h3>
            </div>
          </div>
        </div>
        <div className="contactSection">
          <h2>Contact</h2>
          <div className="form">
            <div>
              <p>Name<span ref={refName} className='required'>*error</span></p>
              <input onChange={(e) => { setNameInput(e.target.value) }} placeholder='Full Name' type="name" />
            </div>
            <div>
              <p>Email<span ref={refEmail} className='required'>*error</span></p>
              <input onChange={(e) => { setEmailInput(e.target.value) }} placeholder='email@mail.com' type="email" />
            </div>
            <div>
              <p>Phone</p>
              <input placeholder='069-405-596' type="number" />
            </div>
            <div>
              <p>Subject</p>
              <input placeholder='Subject' type="text" />
            </div>
            <div className='comment'>
              <p>Comment<span ref={refComment} className='required'>*error</span></p>
              <textarea onChange={(e) => { setCommentInput(e.target.value) }} placeholder='Leave a message here' name="" id="" cols="30" maxLength={300} rows="10"></textarea>
            </div>
          </div>
          <div onClick={contactDealer} className="contactBtn">
            <p>Contact Dealer</p>
          </div>
        </div>
      </div>
      <div className="secondSection">
        <div className="priceSection">
          <p>$15,193</p>
        </div>
        <div className="carDetailsSection">
          <div className="carDetails">
            <h2>Car Details</h2>
            <div>
              <div>
                <p className='first'>Brand</p>
                <p className='second'>{car.brand}</p>
              </div>
              <div>
                <p className='first'>Model</p>
                <p className='second'>{car.brand_model}</p>
              </div>
              <div>
                <p className='first'>Condition</p>
                <p className='second'>{car.condition}</p>
              </div>
              <div>
                <p className='first'>Year</p>
                <p className='second'>{car.year}</p>
              </div>
              <div>
                <p className='first'>Body Type</p>
                <p className='second'>{car.vehicle_type}</p>
              </div>
              <div>
                <p className='first'>Seats</p>
                <p className='second'>{car.seat_count}</p>
              </div>
              <div>
                <p className='first'>Exterior Color</p>
                <p className='second'>{car.color}</p>
              </div>
            </div>
          </div>
          <div className="engineSection">
            <h2>Engine</h2>
            <div className="engine">
              <div>
                <p className='first'>Fuel Type</p>
                <p className='second'>{car.fuel_type}</p>
              </div>
              <div>
                <p className='first'>Milage</p>
                <p className='second'>{car.milage} km</p>
              </div>
              <div>
                <p className='first'>Transmission</p>
                <p className='second'>{car.gear_type}</p>
              </div>
              <div>
                <p className='first'>Drivetrain</p>
                <p className='second'>{car.drivetrain}</p>
              </div>
              <div>
                <p className='first'>Power</p>
                <p className='second'>{car.horse_power}</p>
              </div>
            </div>
          </div>
          {/* <div className="batterySection">
            <h2>Batery & Charging</h2>
            <div>
              <div>
                <p className='first'>Battery Capacity</p>
                <p className='second'>55.0-kWh</p>
              </div>
              <div>
                <p className='first'>Charge Speed</p>
                <p className='second'>64 km/h</p>
              </div>
              <div>
                <p className='first'>Charge Port</p>
                <p className='second'>Type 2</p>
              </div>
              <div>
                <p className='first'>Charge Time (0 - Full)</p>
                <p className='second'>330 mnt</p>
              </div>
            </div>
          </div> */}
          <div className="dimensionsSection">
            <h2>Dimensions</h2>
            <div className="dimension">
              <div>
                <p className='first'>Length</p>
                <p className='second'>{car['length']} mm</p>
              </div>
              <div>
                <p className='first'>Width</p>
                <p className='second'>{car.width} mm</p>
              </div>
              <div>
                <p className='first'>Height</p>
                <p className='second'>{car.height} mm</p>
              </div>
              <div>
                <p className='first'>Cargo Volume</p>
                <p className='second'>{car.cargo_volume} L</p>
              </div>
            </div>
          </div>
          {/* <p className='history'>Vehicle History /</p> */}
          <div onClick={compareThisCar} className="compareCarBtn"><p>Compare Car</p></div>
        </div>
      </div>

    </div>
    <div className="thirdSection">
      <h2>Location</h2>
      <p>{location}, Montenegro</p>
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
    <ToastContainer />
  </div>;
}
