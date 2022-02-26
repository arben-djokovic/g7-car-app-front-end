import React, { useEffect, useState, useRef } from 'react';
import Header from './Header';
import '../styles/UsedCarsStyle/UsedCarStyle.css'
import Select from 'react-select'
import Car from './Car';
import Footer from './Footer';
import api from '../api/apiCalls'

export default function UsedCarsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
    fetchBrands()
    fetchColors()
    fetchDrivetrains()
    fetchFuelTypes()
    fetchTransmissions()
    setTimeout(() => {
      setYearsOptions(yearsOptionFirst)
    }, 500);
  }, [])

  let yearsOptionFirst = []
  for(let i = 2022; i > 1980; i--){
    yearsOptionFirst = [...yearsOptionFirst, i]
  }

  let passengerCapacity = [1,2,3,4,5,6,7,8]
  let [yearsOptions, setYearsOptions] = useState([])
  let [filterOptions1, setFilterOptions1] = useState(false)
  let [filterOptions2, setFilterOptions2] = useState(false)
  let [filterOptions3, setFilterOptions3] = useState(false)
  let [filterOptions4, setFilterOptions4] = useState(false)
  let [filterOptions5, setFilterOptions5] = useState(false)
  let [filterOptions6, setFilterOptions6] = useState(false)
  let [filterOptions7, setFilterOptions7] = useState(false)
  let [filterOptions8, setFilterOptions8] = useState(false)
  let [filterOptions9, setFilterOptions9] = useState(false)

  // functions
  const fetchBrands = async () => {
    try{
      const response = await api.get('/brands')
      setOptionsBrands(response.data)
    }
    catch(err){
      console.log('error')
      console.log(err)
    }
  }
  const fetchColors = async () => {
    try{
      const response = await api.get('/colors')
      setExteriorColors(response.data)
    }
    catch(err){
      console.log('error')
      console.log(err)
    }
  }
  const fetchDrivetrains = async () => {
    try{
      const response = await api.get('/drivetrains')
      setOptionsDrivetrains(response.data)
    }
    catch(err){
      console.log('error')
      console.log(err)
    }
  }
  const fetchFuelTypes = async () => {
    try{
      const response = await api.get('/fuel-types')
      setFuelTypes(response.data)
    }
    catch(err){
      console.log('error')
      console.log(err)
    }
  }
  const fetchTransmissions = async () => {
    try{
      const response = await api.get('/gear-types')
      setOptionsTransmissions(response.data)
    }
    catch(err){
      console.log('error')
      console.log(err)
    }
  }

  const closeOptions = (e) => {
    if (e.target.id == 1) {
      setFilterOptions1(filterOptions => !filterOptions)
    }
    else if (e.target.id == 2) {
      setFilterOptions2(filterOptions => !filterOptions)
    }
    else if (e.target.id == 3) {
      setFilterOptions3(filterOptions => !filterOptions)
    }
    else if (e.target.id == 4) {
      setFilterOptions4(filterOptions => !filterOptions)
    }
    else if (e.target.id == 5) {
      setFilterOptions5(filterOptions => !filterOptions)
    }
    else if (e.target.id == 6) {
      setFilterOptions6(filterOptions => !filterOptions)
    }
    else if (e.target.id == 7) {
      setFilterOptions7(filterOptions => !filterOptions)
    }
    else if (e.target.id == 8) {
      setFilterOptions8(filterOptions => !filterOptions)
    }
    else if (e.target.id == 9) {
      setFilterOptions9(filterOptions => !filterOptions)
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


  //options 
  let [optionsTransmissions, setOptionsTransmissions] = useState([])
  let [exteriorColors, setExteriorColors] = useState([])
  let [optionsDrivetrains, setOptionsDrivetrains] = useState([])
  let [optionsBrands, setOptionsBrands] = useState([])
  let [optionsFuelTypes, setFuelTypes] = useState([])
  const options = [
    { value: '1', label: 'Opcija 1' },
    { value: '2', label: 'Opcija 2' },
    { value: '3', label: 'Opcija 3' },
    { value: '4', label: 'Opcija 4' }
  ]

  let [searchInput, setSearchInput] = useState('')
  let [selectedRange, setSelectedRange] = useState(300000)
  let filterSection = useRef()

  //styles
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: 'white',
      backgroundColor: '#152836',
      padding: 15,
      margin: 0,
      cursor: 'pointer'
    }),
    menu: (provided, state) => ({
      ...provided,
      color: 'white'
    }),
    control: () => ({
      display: 'flex',
      color: 'white',
    }),
    singleValue: (provided, state) => {
      const transition = 'opacity 300ms';
      const color = 'color: white'

      return { ...provided, transition, color };
    }
  };

  return <div>
    <Header />
    <div className="usedCars">

      <div className="header">
        <h1>Used Car</h1>
        <p>Homepage - Sell</p>
      </div>

      <div className="usedCarsContent">

        <div ref={filterSection} className="filterSection" >


          <div className="filterHeader">
            <h2>Filter</h2>
            <i onClick={() => { filterSection.current.style.cssText += 'margin-left: -100vw' }} className="fa fa-close"></i>
          </div>
          <div className="filterSectionAll">
            <div className="selectSection">
              <div onClick={closeOptions} id="1" className="selectHeader">
                <h3>Year</h3>
                {filterOptions1 ? <img className='arrow' src="./assets/upload.png" alt="" /> : <img className='arrow' src="./assets/down-arrow.png" alt="" />}
              </div>
              <div className={filterOptions1 ? 'optionsOpen' : 'optionsClosed'} >
                <div className='yearGrid'>{
                  yearsOptions.map((year, i) => {
                      return(<div>
                        <input type="checkbox" name="year" id={'b'+i} />
                        <label htmlFor={'b'+i}>
                          <p>{year}</p>
                        </label>
                      </div>)
                  })
                }
                </div>
              </div>
            </div>

            <div className="selectSection">
              <div onClick={closeOptions} id="2" className="selectHeader">
                <h3>Brand</h3>
                {filterOptions2 ? <img className='arrow' src="./assets/upload.png" alt="" /> : <img className='arrow' src="./assets/down-arrow.png" alt="" />}
              </div>
              <div className={filterOptions2 ? 'optionsOpen' : 'optionsClosed'} >
                {optionsBrands.map(brand => {
                  return(<div>
                  <input type="checkbox" name="year" id={brand.value} />
                  <label htmlFor={brand.value}>
                    <p>{brand.value}</p>
                  </label>
                </div>)
                })}
              </div>
            </div>
            <div className="selectSection">
              <div onClick={closeOptions} id="3" className="selectHeader">
                <h3>Model</h3>
                {filterOptions3 ? <img className='arrow' src="./assets/upload.png" alt="" /> : <img className='arrow' src="./assets/down-arrow.png" alt="" />}
              </div>
              <div className={filterOptions3 ? 'optionsOpen' : 'optionsClosed'} >
                <div>
                  <input type="checkbox" name="year" id="c1" />
                  <label htmlFor="c1">
                    <p>2021</p>
                  </label>
                </div>
                <div>
                  <input type="checkbox" name="year" id="c2" />
                  <label htmlFor="c2">
                    <p>2020</p>
                  </label>
                </div>
                <div>
                  <input type="checkbox" name="year" id="c3" />
                  <label htmlFor="c3">
                    <p>2019</p>
                  </label>
                </div>
                <div>
                  <input type="checkbox" name="year" id="c4" />
                  <label htmlFor="c4">
                    <p>2018</p>
                  </label>
                </div>
              </div>
            </div>
            <div className="selectSection">
              <div onClick={closeOptions} id="4" className="selectHeader">
                <h3>Body Type</h3>
                {filterOptions4 ? <img className='arrow' src="./assets/upload.png" alt="" /> : <img className='arrow' src="./assets/down-arrow.png" alt="" />}
              </div>
              <div className={filterOptions4 ? 'optionsOpen' : 'optionsClosed'} >
                <div>
                  <input type="checkbox" name="year" id="d1" />
                  <label htmlFor="d1">
                    <p>2021</p>
                  </label>
                </div>
                <div>
                  <input type="checkbox" name="year" id="d2" />
                  <label htmlFor="d2">
                    <p>2020</p>
                  </label>
                </div>
                <div>
                  <input type="checkbox" name="year" id="d3" />
                  <label htmlFor="d3">
                    <p>2019</p>
                  </label>
                </div>
                <div>
                  <input type="checkbox" name="year" id="d4" />
                  <label htmlFor="d4">
                    <p>2018</p>
                  </label>
                </div>
              </div>
            </div>
            <div className="selectSection">
              <div onClick={closeOptions} id="5" className="selectHeader">
                <h3>Transmission</h3>
                {filterOptions5 ? <img className='arrow' src="./assets/upload.png" alt="" /> : <img className='arrow' src="./assets/down-arrow.png" alt="" />}
              </div>
              <div className={filterOptions5 ? 'optionsOpen' : 'optionsClosed'} >
               {optionsTransmissions.map(transmission => {
                 return(<div>
                  <input type="checkbox" name="year" id={'transmission'+transmission.value} />
                  <label htmlFor="e4">
                    <p>{transmission.value}</p>
                  </label>
                </div>)
               })}
                
              </div>
            </div>
            <div className="selectSection">
              <div onClick={closeOptions} id="6" className="selectHeader">
                <h3>Fuel Type</h3>
                {filterOptions6 ? <img className='arrow' src="./assets/upload.png" alt="" /> : <img className='arrow' src="./assets/down-arrow.png" alt="" />}
              </div>
              <div className={filterOptions6 ? 'optionsOpen' : 'optionsClosed'} >
                {optionsFuelTypes.map(fuelType => {
                  return(<div>
                  <input type="checkbox" name="year" id={'fuelType'+fuelType.value} />
                  <label htmlFor={'fuelType'+fuelType.value}>
                    <p>{fuelType.value}</p>
                  </label>
                </div>)
                })}
              </div>
            </div>
            <div className="selectSection">
              <div onClick={closeOptions} id="7" className="selectHeader">
                <h3>Drive Train</h3>
                {filterOptions7 ? <img className='arrow' src="./assets/upload.png" alt="" /> : <img className='arrow' src="./assets/down-arrow.png" alt="" />}
              </div>
              <div className={filterOptions7 ? 'optionsOpen' : 'optionsClosed'} >
                {optionsDrivetrains.map(drivetrain => {
                  return(<div>
                  <input type="checkbox" name="year" id={drivetrain.value} />
                  <label htmlFor={drivetrain.value}>
                    <p>{drivetrain.value}</p>
                  </label>
                </div>)
                })}
              </div>
            </div>
            <div className="selectSection">
              <div onClick={closeOptions} id="8" className="selectHeader">
                <h3>Passenger Capacity</h3>
                {filterOptions8 ? <img className='arrow' src="./assets/upload.png" alt="" /> : <img className='arrow' src="./assets/down-arrow.png" alt="" />}
              </div>
              <div className={filterOptions8 ? 'optionsOpen' : 'optionsClosed'} >
                {passengerCapacity.map(capacity => {
                  return(<div>
                  <input type="checkbox" name="year" id={'capacity' + capacity} />
                  <label htmlFor={'capacity' + 'capacity'}>
                    <p>{capacity}</p>
                  </label>
                </div>)
                })}
                
                <div>
                  <input type="checkbox" name="year" id="42" />
                  <label htmlFor="42">
                    <p>2020</p>
                  </label>
                </div>
                <div>
                  <input type="checkbox" name="year" id="43" />
                  <label htmlFor="43">
                    <p>2019</p>
                  </label>
                </div>
                <div>
                  <input type="checkbox" name="year" id="44" />
                  <label htmlFor="44">
                    <p>2018</p>
                  </label>
                </div>
              </div>
            </div>
            <div className="selectSection">
              <div onClick={closeOptions} id="9" className="selectHeader">
                <h3>Exterior Color</h3>
                {filterOptions9 ? <img className='arrow' src="./assets/upload.png" alt="" /> : <img className='arrow' src="./assets/down-arrow.png" alt="" />}
              </div>
              <div className={filterOptions9 ? 'optionsOpen' : 'optionsClosed'} >
                {exteriorColors.map((color, i) => {
                  return(<div>
                  <input type="checkbox" name="year" id={'color' + i} />
                  <label htmlFor={'color' + i}>
                    <p>{color.value}</p>
                  </label>
                </div>)
                })}
              </div>
            </div>
            <div className="price">
              <div className="priceText">
                <div className="priceTextFirst">
                  Price Range
                </div>
                <div className="priceTextSecond">
                  $0 - $300,000
                </div>
              </div>
              <div className="range">
                <h2>{'$' + selectedRange}</h2>
                <input step={1000} onChange={(e) => { setSelectedRange(e.target.value) }} type="range" value={selectedRange} min={1000} max={300000} />
              </div>
            </div>
            <div className="resetFilters">
              <h3>Reset Filters</h3>
            </div>
          </div>
        </div>

        <div className="mainSeciton">
          <div className="searchSection">
            <i className="fa fa-search"></i>
            <input onChange={(e)=>{setSearchInput(e.target.value)}} placeholder='Search' type="text" />
          </div>
          <div className="sortSection">
            <div className="result"></div>
            <div className="second">
              <Select placeholder='Sort by' className='select' options={options} styles={customStyles} />
              <div className="filterIcon">
                <div onClick={() => { filterSection.current.style.cssText += 'margin-left: 0vw' }} className="icon">
                  <i className="fa fa-filter"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="carsSection">
            <Car />
            <Car />
            <Car />
            <Car />
            <Car />
            <Car />
            <Car />
            <Car />
            <Car />
            <Car />
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>;
}
