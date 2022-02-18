import React,{ useEffect, useState } from 'react';
import Header from './Header';
import '../styles/ContactStyle/ContactStyle.css'
import Footer from './Footer';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { toast, ToastContainer} from 'react-toastify';

export default function ContactPage() {
  let [nameInput, setNameInput] = useState('')
  let [emailInput, setEmailInput] = useState('')
  let [phoneInput, setPhoneInput] = useState('')
  let [commentInput, setCommentInput] = useState('')

  const sendMessage = () => {
    if(nameInput.length < 3 || (emailInput.length < 4 || !emailInput.includes('@') || !emailInput.includes('.')) || phoneInput.length < 4 || commentInput.length < 30){
      if(nameInput.length < 3){
        toast.error('Name must have minimum 3 characters')
      }
      else{

      }
      if(emailInput.length < 4 || !emailInput.includes('@') || !emailInput.includes('.')){
        toast.error('Input real email')
      }
      else{

      }
      if(phoneInput.length < 4){
        toast.error('Phone number must have minimum 4 characters')
      }
      else{

      }
      if(commentInput.length < 30){
        toast.error('Comment length must be between 30-300')
      }
      else{

      }
    }
    else{
      toast.success("Message sent")
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const position = [42.440247, 19.258012]
  return <div className='contactPage'>
    <Header />
    <div className="contactDiv">
      <div className="firstSection">
        <h2>Get In Touch</h2>
        <div className="form">
          <div>
            <p>Name<span className='required'>*required</span></p>
            <input onChange={(e)=>{setNameInput(e.target.value)}} placeholder='Full Name' type="name" />
          </div>
          <div>
            <p>Email<span className='required'>*required</span></p>
            <input onChange={(e)=>{setEmailInput(e.target.value)}} placeholder='email@mail.com' type="email" />
          </div>
          <div>
            <p>Phone<span className='required'>*required</span></p>
            <input onChange={(e)=>{setPhoneInput(e.target.value)}} placeholder='000-000-000' type="number" />
          </div>
          <div>
            <p>Comment<span className='required'>*required</span></p>
            <textarea onChange={(e)=>{setCommentInput(e.target.value)}} maxLength={300} placeholder='Leave a message here' name="" id="" cols="30" rows="10"></textarea>
          </div>
          <p onClick={sendMessage} className="sendBtn">Send</p>
        </div>
      </div>
      <div className="secondSection">
        <a href='tel:+38269405596'>
          <div className="header">
            <i className="fa fa-phone"></i>
            <p>Phone</p>
          </div>
          <p className='blueColor'>069-405-596</p>
        </a>
        <a href='mailto:info@car.com'>
          <div className="header">
            <i className="fa fa-envelope"></i>
            <p>Email</p>
          </div>
          <p className='blueColor'>info@car.com</p>
        </a>
        <a href="https://www.google.com/maps/place/42%C2%B026'24.9%22N+19%C2%B015'28.8%22E/@42.440247,19.258012,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x68bf62264ae804df!8m2!3d42.440247!4d19.258012?hl=en" target="_blank">
          <div className="header">
            <i className="fa fa-map-marker"></i>
            <p>Phone</p>
          </div>
          <p className='blueColor'>Podgorica, Montenegro</p>
        </a>
      </div>
    </div>
    <div className="map" id="map">
    <MapContainer center={position} zoom={14}>
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
    <Footer />
    <ToastContainer />
  </div>;
}
