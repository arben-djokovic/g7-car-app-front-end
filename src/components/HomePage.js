import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import '../styles/HomeStyle/HomeStyle.css'
import Car from './Car';
import { useNavigate } from 'react-router';
import Select from 'react-select'
import Footer from './Footer';
import { toast, ToastContainer } from 'react-toastify';
import api from '../api/apiCalls'

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
    fetchBrands()
    fetchModels()
  }, [])

  //functions
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
    try{
      const response = await api.get('/brands')
      let models = []
      response.data.forEach(element => {
        models.push({value: element.value, label: element.value})
      });
      setTimeout(() => {
        setOptionsModels(models)
      }, 100);
    }
    catch(err){
      console.log('error')
      console.log(err)
    }
  }

  const sendMessage = () => {
    if (nameInput.length < 3 || (emailInput.length < 4 || !emailInput.includes('@') || !emailInput.includes('.')) || phoneInput.length < 4 || commentInput.length < 30) {
      if (nameInput.length < 3) {
        refNameError.current.style.color = 'red'
        toast.error('Name must have minimum 3 characters')
      }
      else {
        refNameError.current.style.color = 'transparent'
      }
      if (emailInput.length < 4 || !emailInput.includes('@') || !emailInput.includes('.')) {
        refEmailError.current.style.color = 'red'
        toast.error('Input real email')
      }
      else {
        refEmailError.current.style.color = 'transparent'
      }
      if (phoneInput.length < 4) {
        refPhoneError.current.style.color = 'red'
        toast.error('Phone number must have minimum 4 characters')
      }
      else {
        refPhoneError.current.style.color = 'transparent'
      }
      if (commentInput.length < 30) {
        refCommentError.current.style.color = 'red'
        toast.error('Comment length must be between 30-300')
      }
      else {
        refCommentError.current.style.color = 'transparent'
      }
    }
    else {
      refNameError.current.style.color = 'transparent'
      refEmailError.current.style.color = 'transparent'
      refPhoneError.current.style.color = 'transparent'
      refCommentError.current.style.color = 'transparent'
      toast.success("Message sent")
    }
  }
  //inputs
  let [nameInput, setNameInput] = useState('')
  let [emailInput, setEmailInput] = useState('')
  let [phoneInput, setPhoneInput] = useState('')
  let [commentInput, setCommentInput] = useState('')

  // refs
  const refNameError = useRef()
  const refEmailError = useRef()
  const refPhoneError = useRef()
  const refCommentError = useRef()


  let [selectedAll, setSelectedAll] = useState(true)
  let [selectedNew, setSelectedNew] = useState(false)
  let [selectedUsed, setSelectedUsed] = useState(false)
  let [selectedRange, setSelectedRange] = useState(300000)
  let [selectedRecomendedNew, setSelectedRecomendedNew] = useState(true)
  let [selectedRecomendedUsed, setSelectedRecomendedUsed] = useState(false)
  const navigate = useNavigate()

  //options
  let [optionsBrands, setOptionsBrands] = useState([])
  let [optionsModels, setOptionsModels] = useState([])

  const optionsLocation = [
    { value: 'any', label: 'any' },
    { value: 'Podgorica', label: 'Podgorica' },
    { value: 'Tuzi', label: 'Tuzi' },
    { value: 'Berane', label: 'Berane' },
    { value: 'Plav', label: 'Plav' },
    { value: 'Petnjica', label: 'Petnjica' },
    { value: 'Bijelo Polje', label: 'Bijelo Polje' },
    { value: 'Kolasin', label: 'Kolasin' },
    { value: 'Ulcinj', label: 'Ulcinj' },
    { value: 'Niksic', label: 'Niksic' },
    { value: 'Pljevlja', label: 'Pljevlja' },
    { value: 'Rozaje', label: 'Rozaje' },
    { value: 'Tivat', label: 'Tivat' },
  ]
  //styles
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



  return <div className='homePage'>
    <Header />

    <div className="firstSection">
      <div className="swiperPc">
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
              <img src="./assets/background-image3.jpg" alt="" />
              <div className="textSlider">
                <h1>Find your dream car</h1>
                <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </h2>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="sliderSection">
              <img src="./assets/background-image5.jpg" alt="" />
              <div className="textSlider">
                <h1>Find your dream car</h1>
                <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </h2>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="sliderSection">
              <img src="./assets/background-image4.jpg" alt="" />
              <div className="textSlider">
                <h1>Find your dream car</h1>
                <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </h2>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="swiperPhone">
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
              <img src="./assets/background-image-tel1.jpg" alt="" />
              <div className="textSlider">
                <h1>Find your dream car</h1>
                <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </h2>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="sliderSection">
              <img src="./assets/background-image-tel2.jpg" alt="" />
              <div className="textSlider">
                <h1>Find your dream car</h1>
                <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </h2>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="sliderSection">
              <img src="./assets/background-image-tel3.jpg" alt="" />
              <div className="textSlider">
                <h1>Find your dream car</h1>
                <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </h2>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="sliderSection">
              <img src="./assets/background-image-tel4.jpg" alt="" />
              <div className="textSlider">
                <h1>Find your dream car</h1>
                <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </h2>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="searchDiv">
        <div className="searchHeader">
          {selectedAll ? <h2 className='searchSelected'>All</h2> : <h2 onClick={() => {
            setSelectedAll(true)
            setSelectedNew(false)
            setSelectedUsed(false)
          }} className='searchNotSelected'>All</h2>}
          {selectedNew ? <h2 className='searchSelected'>New</h2> : <h2 onClick={() => {
            setSelectedAll(false)
            setSelectedNew(true)
            setSelectedUsed(false)
          }} className='searchNotSelected'>New</h2>}
          {selectedUsed ? <h2 className='searchSelected'>Used</h2> : <h2 onClick={() => {
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
            <Select className='select' styles={customStyles} placeholder={'Models...'} options={optionsModels} />
            <Select className='select' styles={customStyles} placeholder={'Brands...'} options={optionsBrands} />
          </div>
          <div className="searchThirdDiv">
            <div className="searchSecondDivInput">
              <i className="fa fa-map-marker" aria-hidden="true"></i>
              <Select className='select' styles={customStyles} placeholder={'Location...'} options={optionsLocation} />
            </div>
            <div className="price">
              <div className="priceText">
                <div className="priceTextFirst">
                  Price Range
                </div>
                <div className="priceTextSecond">
                  $1000 - $300,000
                </div>
              </div>
              <div className="range">
                <h2>{'$' + selectedRange}</h2>
                <input step={1000} onChange={(e) => { setSelectedRange(e.target.value) }} value={selectedRange} type="range" min={1000} max={300000} />
              </div>
            </div>
            <div className='submit'>Search</div>
          </div>
        </div>

      </div>
    </div>

    <div className="recommendedCars">
      <h2>Recommended Cars</h2>
      <div className="recommendedHeader">
        <div className="selecting">
          {selectedRecomendedNew ? <h2 className='selected'>New</h2> : <h2 onClick={() => {
            setSelectedRecomendedNew(true)
            setSelectedRecomendedUsed(false)
          }} className='unSelected'>New</h2>}
          {selectedRecomendedUsed ? <h2 className='selected'>Used</h2> : <h2 onClick={() => {
            setSelectedRecomendedNew(false)
            setSelectedRecomendedUsed(true)
          }} className='unSelected'>Used</h2>}
        </div>
        {selectedRecomendedUsed ? <p onClick={() => {
          navigate('/used-cars')
        }}>{'See more >'}</p> : <p onClick={() => {
          navigate('/new-cars')
        }}>{'See more >'}</p>}
      </div>
      <div className="recommendedNewCarsPc">
        {selectedRecomendedUsed ? <><Car isNew={false} />
          <Car isNew={false} />
          <Car isNew={false} /></> : <><Car isNew={true} />
          <Car isNew={true} />
          <Car isNew={true} /></>}

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
          {selectedRecomendedUsed ? <><SwiperSlide><Car isNew={false} /></SwiperSlide>
            <SwiperSlide><Car isNew={false} /></SwiperSlide>
            <SwiperSlide><Car isNew={false} /></SwiperSlide></> : <><SwiperSlide><Car isNew={true} /></SwiperSlide>
            <SwiperSlide><Car isNew={true} /></SwiperSlide>
            <SwiperSlide><Car isNew={true} /></SwiperSlide></>}

        </Swiper>
      </div>
    </div>

    <div className="compareCars">
      <h2>Compare Cars</h2>
      <div className="compareCarsSecond">
        <Car isNew={true} />
        <div className="versus">VS</div>
        <Car isNew={true} />
      </div>
      <div onClick={() => { navigate('compare') }} className="compareBtn">
        <h2>Compare Car</h2>
      </div>
    </div>

    <div className="aboutUs">
      <img src="./assets/about-us-car.png" alt="" />
      <div className="text">
        <div className="textFirst">
          <h2>About Us</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel aliquet tortor ut sit sit. Velit imperdiet integer elementum a scelerisque pulvinar venenatis sodales. Quis nulla euismod feugiat at interdum in. Venenatis arcu semper lectus quis sit in rhoncus auctor.</p>
        </div>
        <div className="textSecond">
          <div>
            <h2>150</h2>
            <p>Vehicle In Stock</p>
          </div>
          <div>
            <h2>40</h2>
            <p>Sold Car</p>
          </div>
          <div>
            <h2>38</h2>
            <p>Happy Customer</p>
          </div>
          <div>
            <h2>5</h2>
            <p>Awards</p>
          </div>
        </div>
      </div>
    </div>

    <div className="ourService">
      <h2>Our Service</h2>
      <div className="second">
        <div onClick={() => { navigate('new-cars') }}>
          <img src="./assets/buy-car-icon.png" alt="" />
          <p>Buy a new car</p>
        </div>
        <div onClick={() => { navigate('used-cars') }}>
          <img src="./assets/buy-used-car-icon.png" alt="" />
          <p>Buy an used car</p>
        </div>
        <div onClick={() => { navigate('sell') }}>
          <img src="./assets/sell-car-icon.png" alt="" />
          <p>Sell my car</p>
        </div>
      </div>
    </div>

    <div className="contactForm">
      <h2>Contact</h2>
      <div className="form">
        <div>
          <p>Name<span ref={refNameError} className='required'>*error</span></p>
          <input onChange={(e) => { setNameInput(e.target.value) }} placeholder='Full name' type="name" />
        </div>
        <div>
          <p>Email<span ref={refEmailError} className='required'>*error</span></p>
          <input onChange={(e) => { setEmailInput(e.target.value) }} placeholder='email@gmail.com' type="email" />
        </div>
        <div>
          <p>Phone<span ref={refPhoneError} className='required'>*error</span></p>
          <input onChange={(e) => { setPhoneInput(e.target.value) }} placeholder='000-000-000' type="tel" />
        </div>
        <div>
          <p>Comment<span ref={refCommentError} className='required'>*error</span></p>
          <textarea onChange={(e) => { setCommentInput(e.target.value) }} maxLength={300} placeholder='Leave a message here' name="" id="" cols="30" rows="10"></textarea>
        </div>
        <p onClick={sendMessage} className="sendBtn">Send</p>
      </div>
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
    <ToastContainer />
  </div>;
}
