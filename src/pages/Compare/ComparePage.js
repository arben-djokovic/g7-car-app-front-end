import React, { useEffect, useState } from 'react';
import './CompareStyle.scss'
import Car from '../../components/Car/Car';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { compareCar1Action, compareCar2Action } from '../../redux/actions';
import api from '../../api/apiCalls'

export default function ComparePage() {

  useEffect(() => {
    window.scrollTo(0, 0)
    let zadnjiDio = window.location.href.split('/')[window.location.href.split('/').length - 1]
    dispatch(compareCar1Action(zadnjiDio.split('&')[0]))
    dispatch(compareCar2Action(zadnjiDio.split('&')[1]))

    fetchFirstCarById(zadnjiDio.split('&')[0])
    fetchSecondCarById(zadnjiDio.split('&')[1])

  }, [])

  const navigate = useNavigate()
  const dispatch = useDispatch()
  let compareCar1 = useSelector(store => store.compareCar1)
  let compareCar2 = useSelector(store => store.compareCar2)

  let [car1, setCar1] = useState({ features: [] })
  let [car2, setCar2] = useState({ features: [] })
  let [images1, setImages1] = useState([])
  let [images2, setImages2] = useState([])

  let [filterOptions1, setFilterOptions1] = useState(true)
  let [filterOptions2, setFilterOptions2] = useState(true)
  let [filterOptions3, setFilterOptions3] = useState(true)
  // version 2 let [filterOptions4, setFilterOptions4] = useState(true)
  let [filterOptions5, setFilterOptions5] = useState(true)

  useEffect(() => {
    if (car1.created_by) {
      fetchModelImages1()
    }
  }, [car1])
  useEffect(() => {
    if (car2.created_by) {
      fetchModelImages2()
    }
  }, [car2])
  const fetchModelImages1 = async () => {
    if (car1.brand_model) {
      try {
        const response = await api.get('/banners/' + car1.brand_model + '/')
        setImages1([response.data.image1, response.data.image2, response.data.image3, response.data.banner])
      }
      catch (err) {
        console.log(err.response.data)
      }
    }
  }
  const fetchModelImages2 = async () => {
    if (car2.brand_model) {
      try {
        const response = await api.get('/banners/' + car2.brand_model + '/')
        setImages2([response.data.image1, response.data.image2, response.data.image3, response.data.banner])
      }
      catch (err) {
        console.log(err.response.data)
      }
    }
  }
  const fetchFirstCarById = async (id) => {
    try {
      const response = await api.get('/vehicle/' + id)
      setCar1(response.data)
    }
    catch (err) {
      console.log(err)
    }
  }
  const fetchSecondCarById = async (id) => {
    try {
      const response = await api.get('/vehicle/' + id)
      setCar2(response.data)
    }
    catch (err) {
      console.log(err)
    }
  }
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
    // version 2 => else if (e.target.id == 4) {
    //   setFilterOptions4(filterOptions4 => !filterOptions4)
    // }
    else if (e.target.id == 5) {
      setFilterOptions5(filterOptions5 => !filterOptions5)
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
    <div className="comparePage">
      <div className="header">
        <h1>Compare Cars</h1>
        <p>Homepage - Compare Cars</p>
      </div>
      <div className="mainContent">
        <div className="compareCards">
          {compareCar1.length ? <div className="firstCard">
            <div className="removeCar">
              <div onClick={() => {
                dispatch(compareCar1Action(''))
                navigate('/compare/' + '' + '&' + compareCar2)
              }} className="removeCarBtn">
                <p>X REMOVE</p>
              </div>
            </div>
            <Car car={car1} />
          </div> : <div onClick={() => { navigate('/search?') }} className='unSelectedCar'>
            <p>Add Car</p>
          </div>}
          {compareCar2.length ? <div className="firstCard">
            <div className="removeCar">
              <div onClick={() => {
                dispatch(compareCar2Action(''))
                navigate('/compare/' + compareCar1 + '&' + '')
              }} className="removeCarBtn">
                <p>X REMOVE</p>
              </div>
            </div>
            <Car car={car2} />
          </div> : <div onClick={() => { navigate('/search?') }} className='unSelectedCar'>
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
                  <p>{car1.vehicle_type}</p>
                  <p>{car2.vehicle_type}</p>
                </div>
              </div>
              <div className="section">
                <div className="sectionHeader">
                  <p>Exterior Color</p>
                </div>
                <div className="infos">
                  <p>{car1.color}</p>
                  <p>{car2.color}</p>
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
                  <p>{car1.milage} km</p>
                  <p>{car2.milage} km</p>
                </div>
              </div>
              <div className="section">
                <div className="sectionHeader">
                  <p>Transmission</p>
                </div>
                <div className="infos">
                  <p>{car1.gear_type}</p>
                  <p>{car2.gear_type}</p>
                </div>
              </div>
              <div className="section">
                <div className="sectionHeader">
                  <p>Engine Capacity</p>
                </div>
                <div className="infos">
                  <p>{car1.horse_power}hp</p>
                  <p>{car2.horse_power}hp</p>
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
                  <p>{car1['length']} mm</p>
                  <p>{car2['length']} mm</p>
                </div>
              </div>
              <div className="section">
                <div className="sectionHeader">
                  <p>Width</p>
                </div>
                <div className="infos">
                  <p>{car1.width} mm</p>
                  <p>{car2.width} mm</p>
                </div>
              </div>
              <div className="section">
                <div className="sectionHeader">
                  <p>Height</p>
                </div>
                <div className="infos">
                  <p>{car1.height} mm</p>
                  <p>{car1.height} mm</p>
                </div>
              </div>
              <div className="section">
                <div className="sectionHeader">
                  <p>Cargo Volume</p>
                </div>
                <div className="infos">
                  <p>{car1.cargo_volume} L</p>
                  <p>{car2.cargo_volume} L</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* version 2 => <div className="feature">
          <div className="selectSection">
            <div onClick={closeOptions} id="4" className="selectHeader">
              <p></p>
              <h3>Feature</h3>
              {filterOptions4 ? <img className='arrow' src="./assets/upload.png" alt="" /> : <img className='arrow' src="./assets/down-arrow.png" alt="" />}
            </div>
            <div className={filterOptions4 ? 'optionsOpen' : 'optionsClosed'} >
              <div className="section">
                <div className="sectionHeader">
                  <p>USB Port</p>
                </div>
                <div className="infos">
                  <p>{car1.features.includes('USB Port') ? 'Yes' : 'No'}</p>
                  <p>{car2.features.includes('USB Port') ? 'Yes' : 'No'}</p>
                </div>
              </div>
              <div className="section">
                <div className="sectionHeader">
                  <p>Heated Seat</p>
                </div>
                <div className="infos">
                  <p>{car1.features.includes('Heated Seats') ? 'Yes' : 'No'}</p>
                  <p>{car2.features.includes('Heated Seats') ? 'Yes' : 'No'}</p>
                </div>
              </div>
              <div className="section">
                <div className="sectionHeader">
                  <p>Front Parking Sensor</p>
                </div>
                <div className="infos">
                  <p>{car1.features.includes('Front Parking Sensor') ? 'Yes' : 'No'}</p>
                  <p>{car2.features.includes('Front Parking Sensor') ? 'Yes' : 'No'}</p>
                </div>
              </div>
              <div className="section">
                <div className="sectionHeader">
                  <p>Bluetooth</p>
                </div>
                <div className="infos">
                  <p>{car1.features.includes('Bluetooth') ? 'Yes' : 'No'}</p>
                  <p>{car2.features.includes('Bluetooth') ? 'Yes' : 'No'}</p>
                </div>
              </div>
              <div className="section">
                <div className="sectionHeader">
                  <p>Sunroof</p>
                </div>
                <div className="infos">
                  <p>{car1.features.includes('Sunroof') ? 'Yes' : 'No'}</p>
                  <p>{car2.features.includes('Sunroof') ? 'Yes' : 'No'}</p>
                </div>
              </div>
              <div className="section">
                <div className="sectionHeader">
                  <p>Alarm</p>
                </div>
                <div className="infos">
                  <p>{car1.features.includes('Alarm') ? 'Yes' : 'No'}</p>
                  <p>{car2.features.includes('Alarm') ? 'Yes' : 'No'}</p>
                </div>
              </div>
              <div className="section">
                <div className="sectionHeader">
                  <p>Other</p>
                </div>
                <div className="infos">
                  <p>{car1.features.map(carFeature => {
                    if (carFeature === 'USB Port' || carFeature === 'Heated Seat' || carFeature === 'Front Parking Sensor' || carFeature === 'Bluetooth' || carFeature === 'Sunroof' || carFeature === 'Alarm') {
                    }
                    else {
                      return (<span key={carFeature}>{carFeature} </span>)
                    }
                  })}</p>
                  <p>{car2.features.map(carFeature => {
                    if (carFeature === 'USB Port' || carFeature === 'Heated Seat' || carFeature === 'Front Parking Sensor' || carFeature === 'Bluetooth' || carFeature === 'Sunroof' || carFeature === 'Alarm') {
                    }
                    else {
                      return (<span key={carFeature}>{carFeature}, </span>)
                    }
                  })}</p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
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
                  {images1.map((img, i) => {
                      return(<img key={i + img} src={img} alt="" />)
                    })}
                  </div>
                  {/*version2 =>  <p>See more</p> */}
                </div>
                <div className="imagesSection">
                  <div className="images">
                    {images2.map((img, i) => {
                      return(<img key={i + img} src={img} alt="" />)
                    })}
                  </div>
                  {/* version2 => <p>See more</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* version2 =>
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
        </div> */}

      </div>
    </div>
  </div>;
}
