import React,{ useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import '../styles/CompareStyle/CompareStyle.css'
import Car from './Car';
import { useNavigate } from 'react-router';

export default function ComparePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const navigate = useNavigate()

  let [filterOptions1, setFilterOptions1] = useState(true)
  let [filterOptions2, setFilterOptions2] = useState(true)
  let [filterOptions3, setFilterOptions3] = useState(true)
  let [filterOptions4, setFilterOptions4] = useState(true)
  let [filterOptions5, setFilterOptions5] = useState(true)
  let [filterOptions6, setFilterOptions6] = useState(true)

  let [firstCar, setFirstCar] = useState(1)
  let [secondCar, setSecondCar] = useState(2)


  const closeOptions = (e) => {
    if (e.target.id == 1) {
      setFilterOptions1(filterOptions1 => !filterOptions1)
    }
    else if (e.target.id == 2) {
      setFilterOptions2(filterOptions2 => !filterOptions2)
    }
    else if (e.target.id == 3) {
      setFilterOptions3(filterOptions3 => !filterOptions3)
    }
    else if (e.target.id == 4) {
      setFilterOptions4(filterOptions4 => !filterOptions4)
    }
    else if (e.target.id == 5) {
      setFilterOptions5(filterOptions5 => !filterOptions5)
    }
    else if (e.target.id == 6) {
      setFilterOptions6(filterOptions6 => !filterOptions6)
    }
    if (e.target.parentElement.children[1].className === 'optionsOpen') {
      e.target.parentElement.children[1].style.cssText += 'margin-top: -30px'
      setTimeout(() => {
        e.target.parentElement.children[1].style.cssText += 'display: none'
      }, 500);
    }
    else {
      e.target.parentElement.children[1].style.cssText += 'display: block'
      setTimeout(() => {
        e.target.parentElement.children[1].style.cssText += 'margin-top: 0px'
      }, 10);
    }
  }
  return <div>
    <Header />
    <div className="comparePage">
      <div className="header">
        <h1>Compare Cars</h1>
        <p>Homepage - Compare Cars</p>
      </div>
      <div className="mainContent">
        <div className="compareCards">
          {firstCar ? <div className="firstCard">
            <div className="removeCar">
              <div onClick={()=>{setFirstCar(false)}} className="removeCarBtn">
                <p>X REMOVE</p>
              </div>
            </div>
            <Car />
          </div> : <div className='unSelectedCar'>
              <p>Add Car</p>
            </div>}
          {secondCar ? <div className="firstCard">
            <div className="removeCar">
              <div onClick={()=>{setSecondCar(false)}} className="removeCarBtn">
                <p>X REMOVE</p>
              </div>
            </div>
            <Car />
          </div> : <div className='unSelectedCar'>
              <p>Add Car</p>
            </div>}
        </div>
        <div className="generalInfo">
          <div className="selectSection">
              <div onClick={closeOptions} id="1" className="selectHeader">
                <p></p>
                <h3>General Infos</h3>
                {filterOptions1 ? <img className='arrow' src="./assets/upload.png" alt="" /> : <img className='arrow' src="./assets/down-arrow.png" alt="" />}
              </div>
              <div className={filterOptions1 ? 'optionsOpen' : 'optionsClosed'} >
                <div className="section">
                  <div className="sectionHeader">
                    <p>Body Type</p>
                  </div>
                  <div className="infos">
                    <p>Pickup Truck</p>
                    <p>SUV</p>
                  </div>
                </div>
                <div className="section">
                  <div className="sectionHeader">
                    <p>Exterior Color</p>
                  </div>
                  <div className="infos">
                    <p>Black</p>
                    <p>Blue</p>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div className="engineDetails">
          <div className="selectSection">
              <div onClick={closeOptions} id="2" className="selectHeader">
                <p></p>
                <h3>Engine Details</h3>
                {filterOptions2 ? <img className='arrow' src="./assets/upload.png" alt="" /> : <img className='arrow' src="./assets/down-arrow.png" alt="" />}
              </div>
              <div className={filterOptions2 ? 'optionsOpen' : 'optionsClosed'} >
                <div className="section">
                  <div className="sectionHeader">
                    <p>Milage</p>
                  </div>
                  <div className="infos">
                    <p>788 km</p>
                    <p>722 km</p>
                  </div>
                </div>
                <div className="section">
                  <div className="sectionHeader">
                    <p>Transmission</p>
                  </div>
                  <div className="infos">
                    <p>Automatic</p>
                    <p>Automatic</p>
                  </div>
                </div>
                <div className="section">
                  <div className="sectionHeader">
                    <p>Engine Capacity</p>
                  </div>
                  <div className="infos">
                    <p>6700 cc</p>
                    <p>3471 cc</p>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div className="dimensionsDetails">
          <div className="selectSection">
              <div onClick={closeOptions} id="3" className="selectHeader">
                <p></p>
                <h3>Dimensions Details</h3>
                {filterOptions3 ? <img className='arrow' src="./assets/upload.png" alt="" /> : <img className='arrow' src="./assets/down-arrow.png" alt="" />}
              </div>
              <div className={filterOptions3 ? 'optionsOpen' : 'optionsClosed'} >
                <div className="section">
                  <div className="sectionHeader">
                    <p>Length</p>
                  </div>
                  <div className="infos">
                    <p>6350 mm</p>
                    <p>6350 mm</p>
                  </div>
                </div>
                <div className="section">
                  <div className="sectionHeader">
                    <p>Width</p>
                  </div>
                  <div className="infos">
                    <p>2689 mm</p>
                    <p>2689 mm</p>
                  </div>
                </div>
                <div className="section">
                  <div className="sectionHeader">
                    <p>Height</p>
                  </div>
                  <div className="infos">
                    <p>2014 mm</p>
                    <p>2014 mm</p>
                  </div>
                </div>
                <div className="section">
                  <div className="sectionHeader">
                    <p>Cargo Volume</p>
                  </div>
                  <div className="infos">
                    <p>1475 L</p>
                    <p>1475 L</p>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div className="feature">
          <div className="selectSection">
              <div onClick={closeOptions} id="4" className="selectHeader">
                <p></p>
                <h3>Feature</h3>
                {filterOptions4 ? <img className='arrow' src="./assets/upload.png" alt="" /> : <img className='arrow' src="./assets/down-arrow.png" alt="" />}
              </div>
              <div className={filterOptions4 ? 'optionsOpen' : 'optionsClosed'} >
                <div className="section">
                  <div className="sectionHeader">
                    <p>Cruise Control</p>
                  </div>
                  <div className="infos">
                    <p>Optional</p>
                    <p>Standard</p>
                  </div>
                </div>
                <div className="section">
                  <div className="sectionHeader">
                    <p>Heated Seat</p>
                  </div>
                  <div className="infos">
                    <p>No</p>
                    <p>Yes</p>
                  </div>
                </div>
                <div className="section">
                  <div className="sectionHeader">
                    <p>Front Parking Sensor</p>
                  </div>
                  <div className="infos">
                    <p>No</p>
                    <p>Yes</p>
                  </div>
                </div>
                <div className="section">
                  <div className="sectionHeader">
                    <p>Bluetooth</p>
                  </div>
                  <div className="infos">
                    <p>Yes</p>
                    <p>Yes</p>
                  </div>
                </div>
                <div className="section">
                  <div className="sectionHeader">
                    <p>Sunroof</p>
                  </div>
                  <div className="infos">
                    <p>Yes</p>
                    <p>Yes</p>
                  </div>
                </div>
                <div className="section">
                  <div className="sectionHeader">
                    <p>Upholstery</p>
                  </div>
                  <div className="infos">
                    <p>Vinyl</p>
                    <p>Leather</p>
                  </div>
                </div>
                <div className="section">
                  <div className="sectionHeader">
                    <p>Other</p>
                  </div>
                  <div className="infos">
                    <p>Power Steering, Alarm, Wifi, USB Port</p>
                    <p>Keyless Start, Sound System, Wifi, USB Port</p>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div className="images">
          <div className="selectSection">
              <div onClick={closeOptions} id="5" className="selectHeader">
                <p></p>
                <h3>Images</h3>
                {filterOptions5 ? <img className='arrow' src="./assets/upload.png" alt="" /> : <img className='arrow' src="./assets/down-arrow.png" alt="" />}
              </div>
              <div className={filterOptions5 ? 'optionsOpen' : 'optionsClosed'} >
                 <div className="sectionImage">
                  <div className="imagesSection">
                    <div className="images">
                      <img src="../assets/tesla-car.png" alt="" />
                      <img src="../assets/tesla-car.png" alt="" />
                      <img src="../assets/tesla-car.png" alt="" />
                      <img src="../assets/tesla-car.png" alt="" />
                    </div>
                    <p>See more</p>
                  </div>
                  <div className="imagesSection">
                    <div className="images">
                      <img src="../assets/tesla-car.png" alt="" />
                      <img src="../assets/tesla-car.png" alt="" />
                      <img src="../assets/tesla-car.png" alt="" />
                      <img src="../assets/tesla-car.png" alt="" />
                    </div>
                    <p>See more</p>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div className="vehicleHistory">
          <div className="selectSection">
              <div onClick={closeOptions} id="6" className="selectHeader">
                <p></p>
                <h3>Vehicle History</h3>
                {filterOptions6 ? <img className='arrow' src="./assets/upload.png" alt="" /> : <img className='arrow' src="./assets/down-arrow.png" alt="" />}
              </div>
              <div className={filterOptions6 ? 'optionsOpen' : 'optionsClosed'} >
                 <div className="section">
                    <div className="historyFiles">
                      <a href="../assets/tesla-car.png" download={true}>Vehicle History /</a>
                      <a href="../assets/tesla-car.png" download={true}>Vehicle History /</a>
                    </div>
                </div>
              </div>
          </div>
        </div>
       
      </div>
    </div>
    <Footer />
  </div>;
}
