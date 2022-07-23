import React, { useEffect, useState, useRef } from 'react';
import '../styles/UsedCarsStyle/UsedCarStyle.css'
import Car from './Car';
import api from '../api/apiCalls'
import { useNavigate } from 'react-router';

export default function SearchPage() {

  let [selectedYears, setSelectedYears] = useState([])
  let [selectedBrands, setSelectedBrands] = useState([])
  let [selectedBodyTypes, setSelectedBodyTypes] = useState([])
  let [selectedCapacitys, setSelectedCapacitys] = useState([])
  let [selectedColors, setSelectedColors] = useState([])
  let [selectedModels, setSelectedModels] = useState([])
  let [selectedTransmissions, setSelectedTransmissions] = useState([])
  let [selectedFuelTypes, setSelectedFuelTypes] = useState([])
  let [selectedDriverTrains, setSelectedDriverTrains] = useState([])
  let [condition1Field, setCondition1Field] = useState(true)
  let [condition2Field, setCondition2Field] = useState(false)
  let [condition3Field, setCondition3Field] = useState(false)
  let url = ''
  let [secondUrl, setSecondUrl] = useState('')

  let [carsToDisplay, setCarsToDisplay] = useState([])
  let [offset, setOffset] = useState(0)
  const navigate = useNavigate()

  let [searchInput, setSearchInput] = useState('')
  let [selectedRange, setSelectedRange] = useState(0)
  let filterSection = useRef()

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchBrands()
    fetchBodyTypes()
    fetchColors()
    fetchDrivetrains()
    fetchFuelTypes()
    fetchTransmissions()
    fetchCars()
    setTimeout(() => {
      setYearsOptions(yearsOptionFirst)
    }, 500);
    getFiltersFromUrl()
  }, [])

  useEffect(() => {
    fetchCars()
    getFiltersFromUrl()
  }, [window.location.href])

  useEffect(() => {
    fetchModels()
  }, [selectedBrands])

  let getFiltersFromUrl = () => {
    let filterUrl = window.location.href.split('/search')[1].replace('?', '')
    if (filterUrl.includes('offset=')) {
      setOffset(filterUrl.split('offset=')[1].split('&')[0])
    }
    if (filterUrl.includes('year=')) {
      setSelectedYears(filterUrl.split('year=')[1].split('&')[0].split(","))
    }
    if (filterUrl.includes('seat-count=')) {
      setSelectedCapacitys(filterUrl.split('seat-count=')[1].split('&')[0].split(","))
    }
    if (filterUrl.includes('brand=')) {
      setSelectedBrands(filterUrl.split('brand=')[1].split('&')[0].split(","))
    }
    if (filterUrl.includes('model=')) {
      setSelectedModels(filterUrl.split('model=')[1].split('&')[0].split(","))
    }
    if (filterUrl.includes('vehicle-type=')) {
      setSelectedBodyTypes(filterUrl.split('vehicle-type=')[1].split('&')[0].split(","))
    }
    if (filterUrl.includes('gear-type=')) {
      setSelectedTransmissions(filterUrl.split('gear-type=')[1].split('&')[0].split(","))
    }
    if (filterUrl.includes('fuel-type=')) {
      setSelectedFuelTypes(filterUrl.split('fuel-type=')[1].split('&')[0].split(","))
    }
    if (filterUrl.includes('drivetrain=')) {
      setSelectedDriverTrains(filterUrl.split('drivetrain=')[1].split('&')[0].split(","))
    }
    if (filterUrl.includes('min-price=')) {
      setSelectedRange(filterUrl.split('min-price=')[1].split('&')[0].split(","))
    }
    if (filterUrl.includes('color=')) {
      setSelectedColors(filterUrl.split('color=')[1].split('&')[0].split(","))
    }
    if (filterUrl.includes('condition=')) {
      if (filterUrl.split('condition=')[1].split('&')[0] == 'New') {
        setCondition1Field(false)
        setCondition2Field(true)
        setCondition3Field(false)
      }
      else if (filterUrl.split('condition=')[1].split('&')[0] == 'Used') {
        setCondition1Field(false)
        setCondition2Field(false)
        setCondition3Field(true)
      }
      else {
        setCondition1Field(true)
        setCondition2Field(false)
        setCondition3Field(false)
      }
    }
  }

  let yearsOptionFirst = []
  for (let i = 2022; i > 1980; i--) {
    yearsOptionFirst = [...yearsOptionFirst, i]
  }

  let [passengerCapacity, setPassengerCapacity] = useState([1, 2, 3, 4, 5, 6, 7, 8])
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
  const fetchCars = async () => {
    try {
      const response = await api.get('/vehicles/?limit=10&' + window.location.href.split('/search?')[1])
      setCarsToDisplay(response.data)
    }
    catch (err) {
      console.log(err.response.data)
    }
  }
  const fetchBodyTypes = async () => {
    try {
      const response = await api.get('/vehicle-types')
      setBodyTypesOptions(response.data)
    }
    catch (err) {
      console.log(err)
    }
  }
  const fetchBrands = async () => {
    try {
      const response = await api.get('/brands')
      setOptionsBrands(response.data)
    }
    catch (err) {
      console.log(err)
    }
  }
  const fetchModels = async () => {
    try {
      let models = []
      for (let i = 0; i < selectedBrands.length; i++) {
        const response = await api.get('/models/' + selectedBrands[i])
        response.data.forEach(element => {
          models.push({ value: element.value, label: element.value })
        });
      }
      setTimeout(() => {
        setModelOptions(models)
      }, 100);
    }
    catch (err) {
      console.log(err)
    }
  }
  const fetchColors = async () => {
    try {
      const response = await api.get('/colors')
      setExteriorColors(response.data)
    }
    catch (err) {
      console.log(err)
    }
  }
  const fetchDrivetrains = async () => {
    try {
      const response = await api.get('/drivetrains')
      setOptionsDrivetrains(response.data)
    }
    catch (err) {
      console.log(err)
    }
  }
  const fetchFuelTypes = async () => {
    try {
      const response = await api.get('/fuel-types')
      setFuelTypes(response.data)
    }
    catch (err) {
      console.log(err)
    }
  }
  const fetchTransmissions = async () => {
    try {
      const response = await api.get('/gear-types')
      setOptionsTransmissions(response.data)
    }
    catch (err) {
      console.log(err)
    }
  }

  const applyFilters = () => {
    url = ''
    if (selectedYears.length > 0 && selectedYears.length !== yearsOptions.length) {
      url = url + 'year=' + selectedYears + '&'
    }
    if (selectedBrands.length > 0 && selectedBrands.length !== optionsBrands.length) {
      url = url + 'brand=' + selectedBrands + '&'
    }
    else if(selectedBrands.length === 0){
      setSelectedModels([])
    }
    if ((selectedModels.length > 0 && selectedModels.length !== modelOptions.length) && selectedBrands.length > 0) {
      url = url + 'model=' + selectedModels + '&'
    }
    if (selectedCapacitys.length > 0 && selectedCapacitys.length !== passengerCapacity.length) {
      url = url + 'seat-count=' + selectedCapacitys + '&'
    }
    if (selectedBodyTypes.length > 0 && selectedBodyTypes.length !== 2) {
      url = url + 'vehicle-type=' + selectedBodyTypes + '&'
    }
    if (selectedFuelTypes.length > 0 && selectedFuelTypes.length !== 8) {
      url = url + 'fuel-type=' + selectedFuelTypes + '&'
    }
    if (selectedDriverTrains.length > 0 && selectedDriverTrains.length !== 4) {
      url = url + 'drivetrain=' + selectedDriverTrains + '&'
    }
    if (selectedTransmissions.length > 0 && selectedTransmissions.length !== 4) {
      url = url + 'gear-type=' + selectedTransmissions + '&'
    }
    if (selectedColors.length > 0) {
      url = url + 'color=' + selectedColors + '&'
    }
    if (selectedRange > 0) {
      url = url + 'min-price=' + selectedRange + '&'
    }
    if (searchInput.length > 0) {
      url = url + 'name-search=' + searchInput + '&'
    }
    if (condition1Field !== true) {
      if (condition2Field === true) {
        url = url + 'condition=New' + '&'
      }
      else if (condition3Field === true) {
        url = url + 'condition=Used' + '&'
      }
    }
    setTimeout(() => {
      setSecondUrl(url)
      window.scroll(0, 0)
      navigate('/search?' + url + 'offset=0')
      closePhoneFilter()
    }, 500);
  }
  const previousPage = () => {
    navigate('/search?' + secondUrl + 'offset=' + (Number(offset) - 10))
    fetchCars(Number(offset) - 10)
    window.scroll(0, 0)
    setOffset(Number(offset) - 10)
  }
  const nextPage = () => {
    navigate('/search?' + secondUrl + 'offset=' + (Number(offset) + 10))
    fetchCars()
    window.scroll(0, 0)
    setOffset(Number(offset) + 10)
  }
  let conditionChange = (e) => {
    if (e.target.id === 'condition1') {
      setCondition1Field(true)
      setCondition2Field(false)
      setCondition3Field(false)
    }
    else if (e.target.id === 'condition2') {
      setCondition2Field(true)
      setCondition1Field(false)
      setCondition3Field(false)
    }
    else if (e.target.id === 'condition3') {
      setCondition3Field(true)
      setCondition2Field(false)
      setCondition1Field(false)
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
  const changeOptions = (e, year) => {
    if (e.target.checked === true) {
      if (e.target.name === 'year') {
        setSelectedYears(selectedYears => [...selectedYears, year])
      }
      else if (e.target.name === 'brand') {
        setSelectedBrands([...selectedBrands, year.replaceAll('=', '')])
      }
      else if (e.target.name === 'body-type') {
        setSelectedBodyTypes([...selectedBodyTypes, year])
      }
      else if (e.target.name === 'capacity') {
        setSelectedCapacitys([...selectedCapacitys, year])
      }
      else if (e.target.name === 'color') {
        setSelectedColors([...selectedColors, year.value])
      }
      else if (e.target.name === 'model') {
        setSelectedModels([...selectedModels, year])
      }
      else if (e.target.name === 'transmission') {
        setSelectedTransmissions([...selectedTransmissions, year.value])
      }
      else if (e.target.name === 'fuel-type') {
        setSelectedFuelTypes([...selectedFuelTypes, year.value])
      }
      else if (e.target.name === 'drivertrain') {
        setSelectedDriverTrains([...selectedDriverTrains, year.value])
      }
    }
    else {
      if (e.target.name === 'year') {
        let test = selectedYears
        test.forEach((selectedBrand, index) => {
          if (selectedBrand == year.replaceAll(' ', '%20')) {
            test.splice(index, 1)
          }
        })
        setTimeout(() => {
          setSelectedYears(test)
        }, 200);
      }
      else if (e.target.name === 'brand') {
        let test = selectedBrands
        test.forEach((selectedBrand, index) => {
          if (selectedBrand === year.replaceAll(' ', '%20')) {
            test.splice(index, 1)
          }
        })
        setTimeout(() => {
          setSelectedBrands([...test])
        }, 100);
      }
      else if (e.target.name === 'body-type') {
        let test = selectedBodyTypes
        test.forEach((selectedBodyType, index) => {
          if (selectedBodyType.replaceAll('=', '') == year.replaceAll('=', '')) {
            test.splice(index, 1)
          }
        })
        setTimeout(() => {
          setSelectedBodyTypes(test)
        }, 100);
      }
      else if (e.target.name === 'capacity') {
        let test = selectedCapacitys
        test.forEach((selectedCapacity, index) => {
          if (selectedCapacity === year.replaceAll(' ', '%20')) {
            test.splice(index, 1)
          }
        })
        setTimeout(() => {
          setSelectedColors(test)
        }, 200);
      }
      else if (e.target.name === 'color') {
        let test = selectedColors
        test.forEach((selectedColor, index) => {
          if (selectedColor === year.value.replaceAll(' ', '%20')) {
            test.splice(index, 1)
          }
        })
        setTimeout(() => {
          setSelectedColors(test)
        }, 100);
      }
      else if (e.target.name === 'model') {
        let test = selectedModels
        test.forEach((selectedColor, index) => {
          if (selectedColor === year.replaceAll(' ', '%20')) {
            test.splice(index, 1)
          }
        })
        setTimeout(() => {
          setSelectedModels(test)
        }, 100);
      }
      else if (e.target.name === 'transmission') {
        let test = selectedTransmissions
        test.forEach((selectedColor, index) => {
          if (selectedColor.replaceAll('=', '') == year.value.replaceAll('=', '')) {
            test.splice(index, 1)
          }
        })
        setTimeout(() => {
          setSelectedTransmissions(test)
        }, 100);
      }
      else if (e.target.name === 'fuel-type') {
        let test = selectedFuelTypes
        test.forEach((selectedColor, index) => {
          if (selectedColor == year.value.replaceAll(' ', '%20')) {
            test.splice(index, 1)
          }
        })
        setTimeout(() => {
          setSelectedFuelTypes(test)
        }, 100);
      }
      else if (e.target.name === 'drivertrain') {
        let test = selectedDriverTrains
        test.forEach((selectedColor, index) => {
          if (selectedColor == year.value.replaceAll(' ', '%20')) {
            test.splice(index, 1)
          }
        })
        setTimeout(() => {
          setSelectedDriverTrains(test)
        }, 100);
      }
    }
  }
  const closePhoneFilter = () => {
    filterSection.current.style.cssText += 'margin-left: -100vw'
  }
  const openPhoneFilter = () => {
    filterSection.current.style.cssText += 'margin-left: 0vw'
  }
  const checkEnter = (e) => {
    if (e.key == 'Enter') {
      applyFilters()
    }
  }
  //options 
  let [optionsTransmissions, setOptionsTransmissions] = useState([])
  let [exteriorColors, setExteriorColors] = useState([])
  let [optionsDrivetrains, setOptionsDrivetrains] = useState([])
  let [optionsBrands, setOptionsBrands] = useState([])
  let [optionsFuelTypes, setFuelTypes] = useState([])
  let [yearsOptions, setYearsOptions] = useState([])
  let [bodyTypesOptions, setBodyTypesOptions] = useState([])
  let [modelOptions, setModelOptions] = useState([])

  //styles
  // version 2 =>
  // const customStyles = {
  //   option: (provided, state) => ({
  //     ...provided,
  //     borderBottom: '1px dotted pink',
  //     color: 'white',
  //     backgroundColor: '#152836',
  //     padding: 15,
  //     margin: 0,
  //     cursor: 'pointer'
  //   }),
  //   menu: (provided, state) => ({
  //     ...provided,
  //     color: 'white'
  //   }),
  //   control: () => ({
  //     display: 'flex',
  //     color: 'white',
  //   }),
  //   singleValue: (provided, state) => {
  //     const transition = 'opacity 300ms';
  //     const color = 'color: white'

  //     return { ...provided, transition, color };
  //   }
  // };

  return <div>
    <div className="usedCars">

      <div className="header">
        <h1>Search Cars</h1>
        <p>Homepage - Search Cars</p>
      </div>

      <div className="usedCarsContent">

        <div ref={filterSection} className="filterSection" >
          <div className="filterHeader">
            <h2>Filter</h2>
            <i onClick={closePhoneFilter} className="fa fa-close"></i>
          </div>
          <div className="filterSectionAll">
            <div className="selectCondition">
              <p>Condition</p>
              <div className='radioBtns'>
                <div className="radioBtn">
                  <input defaultChecked={condition1Field ? true : false} onChange={(e) => { conditionChange(e) }} type="radio" id="condition1" name="radioBtn" />
                  <label htmlFor="condition1">
                    <p>All</p>
                  </label>
                </div>
                <div className="radioBtn">
                  <input defaultChecked={condition2Field ? true : false} onChange={(e) => { conditionChange(e) }} type="radio" id="condition2" name="radioBtn" />
                  <label htmlFor="condition2">
                    <p>New</p>
                  </label>
                </div>
                <div className="radioBtn">
                  <input defaultChecked={condition3Field ? true : false} onChange={(e) => { conditionChange(e) }} type="radio" id="condition3" name="radioBtn" />
                  <label htmlFor="condition3">
                    <p>Used</p>
                  </label>
                </div>
              </div>
            </div>
            <div className="selectSection">
              <div onClick={closeOptions} id="1" className="selectHeader">
                <h3>Year</h3>
                {filterOptions1 ? <img className='arrow' src="./assets/upload.png" alt="" /> : <img className='arrow' src="./assets/down-arrow.png" alt="" />}
              </div>
              <div className={filterOptions1 ? 'optionsOpen' : 'optionsClosed'} >
                <div className='yearGrid'>{
                  yearsOptions.map((year, i) => {
                    return (<div key={'year' + i}>
                      <input defaultChecked={selectedYears.includes(String(year))} type="checkbox" name="year" onChange={(e) => { changeOptions(e, year) }} id={'year' + i} />
                      <label htmlFor={'year' + i}>
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
                  return (<div key={'brand' + brand.value}>
                    <input defaultChecked={selectedBrands.includes(brand.value.replaceAll(" ", '%20'))} type="checkbox" name="brand" onChange={(e) => { changeOptions(e, brand.value) }} id={'brand' + brand.value} />
                    <label htmlFor={'brand' + brand.value}>
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
                {modelOptions.map((modelOption, i) => {
                  return (<div key={'modelOption' + i}>
                    <input defaultChecked={selectedModels.includes(modelOption.value.replaceAll(" ", '%20'))} type="checkbox" name="model" onChange={(e) => { changeOptions(e, modelOption.value) }} id={'modelOption' + modelOption.value} />
                    <label htmlFor={'modelOption' + modelOption.value}>
                      <p>{modelOption.value}</p>
                    </label>
                  </div>)
                })}
              </div>
            </div>
            <div className="selectSection">
              <div onClick={closeOptions} id="4" className="selectHeader">
                <h3>Body Type</h3>
                {filterOptions4 ? <img className='arrow' src="./assets/upload.png" alt="" /> : <img className='arrow' src="./assets/down-arrow.png" alt="" />}
              </div>
              <div className={filterOptions4 ? 'optionsOpen' : 'optionsClosed'} >
                {bodyTypesOptions.map((bodyTypeOption, i) => {
                  return (<div key={'bodyTypesOptions' + i}>
                    <input defaultChecked={selectedBodyTypes.includes(bodyTypeOption.value.replaceAll(" ", '%20'))} type="checkbox" name="body-type" onChange={(e) => { changeOptions(e, bodyTypeOption.value) }} id={'bodyTypeOption' + bodyTypeOption.value} />
                    <label htmlFor={'bodyTypeOption' + bodyTypeOption.value}>
                      <p>{bodyTypeOption.value}</p>
                    </label>
                  </div>)
                })}
              </div>
            </div>
            <div className="selectSection">
              <div onClick={closeOptions} id="5" className="selectHeader">
                <h3>Transmission</h3>
                {filterOptions5 ? <img className='arrow' src="./assets/upload.png" alt="" /> : <img className='arrow' src="./assets/down-arrow.png" alt="" />}
              </div>
              <div className={filterOptions5 ? 'optionsOpen' : 'optionsClosed'} >
                {optionsTransmissions.map(transmission => {
                  return (<div key={'transmission' + transmission.value}>
                    <input defaultChecked={selectedTransmissions.includes(transmission.value.replaceAll(" ", '%20'))} onChange={(e) => { changeOptions(e, transmission) }} type="checkbox" name="transmission" id={'transmission' + transmission.value} />
                    <label htmlFor={'transmission' + transmission.value}>
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
                  return (<div key={'fuelType' + fuelType.value}>
                    <input defaultChecked={selectedFuelTypes.includes(fuelType.value.replaceAll(" ", '%20'))} onChange={(e) => { changeOptions(e, fuelType) }} type="checkbox" name="fuel-type" id={'fuelType' + fuelType.value} />
                    <label htmlFor={'fuelType' + fuelType.value}>
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
                  return (<div key={'drivetrain' + drivetrain.value}>
                    <input defaultChecked={selectedDriverTrains.includes(drivetrain.value.replaceAll(" ", '%20'))} onChange={(e) => { changeOptions(e, drivetrain) }} type="checkbox" name="drivertrain" id={'drivetrain' + drivetrain.value} />
                    <label htmlFor={'drivetrain' + drivetrain.value}>
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
                {
                  passengerCapacity.map((capacity, i) => {
                    return (<div key={'capacity' + i}>
                      <input defaultChecked={selectedCapacitys.includes(String(capacity))} type="checkbox" name="capacity" onChange={(e) => { changeOptions(e, capacity) }} id={'capacity' + i} />
                      <label htmlFor={'capacity' + i}>
                        <p>{capacity}</p>
                      </label>
                    </div>)
                  })
                }
              </div>
            </div>
            <div className="selectSection">
              <div onClick={closeOptions} id="9" className="selectHeader">
                <h3>Exterior Color</h3>
                {filterOptions9 ? <img className='arrow' src="./assets/upload.png" alt="" /> : <img className='arrow' src="./assets/down-arrow.png" alt="" />}
              </div>
              <div className={filterOptions9 ? 'optionsOpen' : 'optionsClosed'} >
                {exteriorColors.map((color, i) => {
                  return (<div key={'color' + i}>
                    <input defaultChecked={selectedColors.includes(color.value)} type="checkbox" name="color" onChange={(e) => { changeOptions(e, color) }} id={'color' + i} />
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
                <input defaultValue={selectedRange} name='range' step={1000} onChange={(e) => { setSelectedRange(e.target.value) }} type="range" min={0} max={300000} />
              </div>
            </div>
            {/* class is resetFilters because it was supposed to be Reset Filters btn but we changed it */}
            <div onClick={applyFilters} className="resetFilters">
              <h3>Apply Filters</h3>
            </div>
          </div>
        </div>

        <div className="mainSeciton">
          <div className="searchSection">
            <i onClick={applyFilters} className="fa fa-search"></i>
            <input name="search" onChange={(e) => { setSearchInput(e.target.value) }} onKeyPress={checkEnter} placeholder='Search' type="text" />
          </div>
          {/* version 2 => */}
          <div className="sortSection">
            <div className="result"></div>
            <div className="second">
              {/* <Select placeholder='Sort by' className='select' options={modelOptions} /> */}
              <div className="filterIcon">
                <div onClick={openPhoneFilter} className="icon">
                  <i className="fa fa-filter"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="carsSection">
            {carsToDisplay.map(car => {
              return (<Car key={car.id} car={car} />)
            })}

          </div>
          <div className="nextOrPreviousPage">
            {offset == 0 ? <p className='noMore'>{'<'}</p> : <p onClick={previousPage} className='more'>{'<'}</p>}
            {carsToDisplay.length < 9 ? <p className='noMore'>{'>'}</p> : <p onClick={nextPage}>{'>'}</p>}
          </div>
        </div>
      </div>
    </div>
  </div>;
}
