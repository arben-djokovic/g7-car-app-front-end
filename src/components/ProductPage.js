import React,{useEffect, useRef, useState} from 'react';
import Header from './Header';
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import '../styles/ProductStyle/ProductStyle.css'
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router';

export default function ProductPage() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const navigate = useNavigate()
  const refName = useRef()
  const refEmail = useRef()
  const refComment = useRef()

  let [nameInput, setNameInput] = useState('')
  let [emailInput, setEmailInput] = useState('')
  let [commentInput, setCommentInput] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const contactDealer = () => {
    if(nameInput.length <= 1 || (emailInput.length < 3 || !emailInput.includes('@') || !emailInput.includes('.')) || commentInput.length < 30){
      if(nameInput.length <= 1){
        refName.current.style.color = 'red'
        toast.error("Name must have minimum 2 characters!")
      }
      else{
        refName.current.style.color = 'transparent'
      }
      if(emailInput.length < 3 || !emailInput.includes('@') || !emailInput.includes('.')){
        refEmail.current.style.color = 'red'
        toast.error("Please input real email!")
      }
      else{
        refEmail.current.style.color = 'transparent'
      }
      if(commentInput.length < 30){
        refComment.current.style.color = 'red'
        toast.error("Comment length must be between 30 - 300!")
      }
      else{
        refComment.current.style.color = 'transparent'
      }
    }
    else{
      refComment.current.style.color = 'transparent'
      refName.current.style.color = 'transparent'
      refEmail.current.style.color = 'transparent'
      toast.success("Message Sent")
    }
  }

  return <div className='productPage'>
    <Header />
    <div className="productHeader">
      <h2>Tesla Model 3 Stanfsd fds fsdfsd</h2>
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
          <SwiperSlide>
              <img src="../assets/tesla-car.png" />
          </SwiperSlide>
          <SwiperSlide>
              <img src="../assets/tesla-car.png" />
          </SwiperSlide>
          <SwiperSlide>
              <img src="../assets/tesla-car.png" />
          </SwiperSlide>
          <SwiperSlide>
              <img src="../assets/tesla-car.png" />
          </SwiperSlide>
          <SwiperSlide>
              <img src="../assets/tesla-car.png" />
          </SwiperSlide>
          <SwiperSlide>
              <img src="../assets/tesla-car.png" />
          </SwiperSlide>
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
            <SwiperSlide>
              <img src="../assets/tesla-car.png" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="../assets/tesla-car.png" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="../assets/tesla-car.png" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="../assets/tesla-car.png" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="../assets/tesla-car.png" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="../assets/tesla-car.png" />
            </SwiperSlide>
          
      </Swiper>
    </div>
    <div className="mainSection">
      <div className="firstSection">
        <div className="description">
          <h2>Description</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias expedita nostrum distinctio fugit hic illo exercitationem! Incidunt pariatur exercitationem commodi alias reprehenderit, earum recusandae eligendi, obcaecati nobis at, dolorum odit? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat rerum animi tempora, quos commodi ea cumque ad incidunt quaerat iste quasi dignissimos ipsa, adipisci iusto voluptatem nihil esse vero mollitia?</p>
        </div>
        <div className="featuresSection">
          <h2>Dealer Info</h2>
          <div className="features">
            <div className="feature">
              <img src="../assets/checkOn.png" alt="" />
              <p>AutoPilot</p>
            </div>
            <div className="feature">
              <img src="../assets/checkOn.png" alt="" />
              <p>AutoPilot</p>
            </div>
            <div className="feature">
              <img src="../assets/checkOn.png" alt="" />
              <p>AutoPilot</p>
            </div>
            <div className="feature">
              <img src="../assets/checkOn.png" alt="" />
              <p>AutoPilot</p>
            </div>
          </div>
        </div>
        <div className="dealerInfoSection">
          <h2>Dealer Info</h2>
          <div className="dealerInfo">
            <div className="name">
              <h3>Alfred Goure</h3>
              <p>Dealer</p>
            </div>
            <div className="phone">
              <i class="fa fa-phone"></i> 
              <h3>069-405-596</h3>
            </div>
            <div className="mail">
              <i class="fa fa-envelope"></i> 
              <h3>email@gmail.com</h3>
            </div>
          </div>
        </div>
        <div className="contactSection">
          <h2>Contact</h2>
          <div className="form">
            <div>
              <p>Name<span ref={refName} className='required'>*error</span></p>
              <input onChange={(e)=>{setNameInput(e.target.value)}} placeholder='Full Name' type="name" />
            </div>
            <div>
              <p>Email<span ref={refEmail} className='required'>*error</span></p>
              <input onChange={(e)=>{setEmailInput(e.target.value)}} placeholder='email@mail.com' type="email" />
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
              <textarea onChange={(e)=>{setCommentInput(e.target.value)}} placeholder='Leave a message here' name="" id="" cols="30" maxLength={300} rows="10"></textarea>
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
                <p>Tesla</p>
              </div>
              <div>
                <p className='first'>Model</p>
                <p>Model 3</p>
              </div>
              <div>
                <p className='first'>Condition</p>
                <p>New</p>
              </div>
              <div>
                <p className='first'>Year</p>
                <p>2019</p>
              </div>
              <div>
                <p className='first'>Body Type</p>
                <p>Sedan</p>
              </div>
              <div>
                <p className='first'>Seats</p>
                <p>5</p>
              </div>
              <div>
                <p className='first'>Exterior Color</p>
                <p>Red</p>
              </div>
            </div>
          </div>
          <div className="engineSection">
            <h2>Engine</h2>
            <div className="engine">
              <div>
                <p className='first'>Fuel Type</p>
                <p>Electric</p>
              </div>
              <div>
                <p className='first'>Mielage</p>
                <p>340 km</p>
              </div>
              <div>
                <p className='first'>Transmission</p>
                <p>Automatic</p>
              </div>
              <div>
                <p className='first'>Drivetrain</p>
                <p>Rear-wheel Drive</p>
              </div>
              <div>
                <p className='first'>Power</p>
                <p>211 KW</p>
              </div>
            </div>
          </div>
          <div className="batterySection">
            <h2>Batery & Charging</h2>
            <div>
              <div>
                <p className='first'>Battery Capacity</p>
                <p>55.0-kWh</p>
              </div>
              <div>
                <p className='first'>Charge Speed</p>
                <p>64 km/h</p>
              </div>
              <div>
                <p className='first'>Charge Port</p>
                <p>Type 2</p>
              </div>
              <div>
                <p className='first'>Charge Time (0 - Full)</p>
                <p>330 mnt</p>
              </div>
            </div>
          </div>
          <div className="dimensionsSection">
            <h2>Dimensions</h2>
            <div className="dimension">
              <div>
                <p className='first'>Length</p>
                <p>4649 mm</p>
              </div>
              <div>
                <p className='first'>Width</p>
                <p>1849 mm</p>
              </div>
              <div>
                <p className='first'>Height</p>
                <p>1443 mm</p>
              </div>
              <div>
                <p className='first'>Cargo Volume</p>
                <p>542 L</p>
              </div>
            </div>
          </div>
          <p className='history'>Vehicle History /</p>
          <div onClick={()=>{navigate('/compare')}} className="compareCarBtn"><p>Compare Car</p></div>
        </div>
      </div>
    </div>
    <Footer />
    <ToastContainer />
  </div>;
}
