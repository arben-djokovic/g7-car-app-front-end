import React, { useEffect, useState, useRef } from 'react';
import './SearchCar.scss'
import Car from '../../components/Car/Car';
import api from '../../api/apiCalls'
import { useNavigate } from 'react-router';

export default function SearchCar({conditionURL}) {
  const [condition1Field, setCondition1Field] = useState(true)
  const [condition2Field, setCondition2Field] = useState(false)
  const [condition3Field, setCondition3Field] = useState(false)

  const [selectedYears, setSelectedYears] = useState([])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedBodyTypes, setSelectedBodyTypes] = useState([])
  const [selectedCapacitys, setSelectedCapacitys] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [selectedModels, setSelectedModels] = useState([])
  const [selectedTransmissions, setSelectedTransmissions] = useState([])
  const [selectedFuelTypes, setSelectedFuelTypes] = useState([])
  const [selectedDriverTrains, setSelectedDriverTrains] = useState([])

  const [optionsTransmissions, setOptionsTransmissions] = useState([])
  const [exteriorColors, setExteriorColors] = useState([])
  const [optionsDrivetrains, setOptionsDrivetrains] = useState([])
  const [optionsBrands, setOptionsBrands] = useState([])
  const [optionsFuelTypes, setOptionsFuelTypes] = useState([])
  const [yearsOptions, setYearsOptions] = useState([])
  const [bodyTypesOptions, setBodyTypesOptions] = useState([])
  const [modelOptions, setModelOptions] = useState([])

  let url = ''
  const [secondUrl, setSecondUrl] = useState('')

  const [carsToDisplay, setCarsToDisplay] = useState([])
  const [offset, setOffset] = useState(0)
  const navigate = useNavigate()

  const [searchInput, setSearchInput] = useState('')
  const [selectedRange, setSelectedRange] = useState(0)
  const filterSection = useRef()

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


  const conditionChange = (e) => {
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

  const getFiltersFromUrl = () => {
    let filterUrl
    if(conditionURL === 'New') {
      setCondition2Field(true)
      setCondition1Field(false)
      setCondition3Field(false)
      filterUrl = window.location.href.split('/new-cars')[1].replace('?', '')
    }else if(conditionURL === 'Used'){
      setCondition3Field(true)
      setCondition2Field(false)
      setCondition1Field(false)
      filterUrl = window.location.href.split('/used-cars')[1].replace('?', '')
    }else{
      setCondition1Field(true)
      setCondition2Field(false)
      setCondition3Field(false)
      filterUrl = window.location.href.split('/search')[1].replace('?', '')
    }
    if (filterUrl.includes('offset=')) {
      setOffset(filterUrl.split('offset=')[1].split('&')[0])
    }
    if (filterUrl.includes('year=')) {
      setSelectedYears(filterUrl.split('year=')[1].split('&')[0].split(","))
    }
    if (filterUrl.includes('seat_count=')) {
      console.log(filterUrl.split('seat_count=')[1].split('&')[0].split(","))
      setSelectedCapacitys(filterUrl.split('seat_count=')[1].split('&')[0].split(","))
    }
    if (filterUrl.includes('brand=')) {
      const selectedBrands2 = filterUrl.split('brand=')[1].split('&')[0].split(",")
      setSelectedBrands(selectedBrands2)
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
    if (filterUrl.includes('fueltype=')) {
      setSelectedFuelTypes(filterUrl.split('fueltype=')[1].split('&')[0].split(","))
    }
    if (filterUrl.includes('drivetrain=')) {
      setSelectedDriverTrains(filterUrl.split('drivetrain=')[1].split('&')[0].split(","))
    }
    if (filterUrl.includes('maxprice=')) {
      setSelectedRange(filterUrl.split('maxprice=')[1].split('&')[0].split(","))
    }
    if (filterUrl.includes('color=')) {
      setSelectedColors(filterUrl.split('color=')[1].split('&')[0].split(","))
    }
    if(filterUrl.includes('namesearch=')){
      setSearchInput(filterUrl.split('namesearch=')[1].split('&')[0])
    }
  }

  let yearsOptionFirst = []
  for (let i = 2025; i > 1980; i--) {
    yearsOptionFirst = [...yearsOptionFirst, i]
  }

  const passengerCapacity = [1, 2, 3, 4, 5, 6, 7, 8]
  const [filterOptions1, setFilterOptions1] = useState(false)
  const [filterOptions2, setFilterOptions2] = useState(false)
  const [filterOptions3, setFilterOptions3] = useState(false)
  const [filterOptions4, setFilterOptions4] = useState(false)
  const [filterOptions5, setFilterOptions5] = useState(false)
  const [filterOptions6, setFilterOptions6] = useState(false)
  const [filterOptions7, setFilterOptions7] = useState(false)
  const [filterOptions8, setFilterOptions8] = useState(false)
  const [filterOptions9, setFilterOptions9] = useState(false)


  const fetchCars = async () => {
    try {
      let url = ""
      let params = "" 
      if(conditionURL === 'New'){
        url = '&condition=New'
        params = window.location.href.split('/new-cars?')[1]
      }else if(conditionURL === 'Used'){
        url = '&condition=Used'
        params = window.location.href.split('/used-cars?')[1]
      }else{
        params = window.location.href.split('/search?')[1]
      }
      const response = await api.get(`/cars?${url}&limit=10&` + params)
      setCarsToDisplay(response.data)
    }
    catch (err) {
      console.log(err.response.data)
    }
  }
  const fetchBodyTypes = async () => {
    try {
      const response = await api.get('/body-types')
      let bodyTypes = []
      response.data.forEach(element => {
        bodyTypes.push({ value: element.name, label: element.name })
      })
      setTimeout(() => {
        setBodyTypesOptions(bodyTypes)
      }, 100);
    }
    catch (err) {
      console.log(err)
    }
  }
  const fetchBrands = async () => {
    try {
      const response = await api.get('/brands')
      let brands = []
      response.data.forEach(element => {
        brands.push({ value: element.name, label: element.name, id: element.id, models: element.models })
      });
      setTimeout(() => {
        setOptionsBrands(brands)
      }, 100);
    }
    catch (err) {
      console.log(err)
    }
  }
  const fetchColors = async () => {
    try {
      const response = await api.get('/colors')
      let colors = []
      response.data.forEach(element => {
        colors.push({ value: element.name, label: element.name })
      })
      setTimeout(() => {
        setExteriorColors(colors)
      }, 100);
    }
    catch (err) {
      console.log(err)
    }
  }
  const fetchDrivetrains = async () => {
    try {
      const response = await api.get('/drive-trains')
      let drivetrains = []
      response.data.forEach(element => {
        drivetrains.push({ value: element.name, label: element.name })
      })
      setTimeout(() => {
        setOptionsDrivetrains(drivetrains)
      }, 100);
    }
    catch (err) {
      console.log(err)
    }
  }
  const fetchFuelTypes = async () => {
    try {
      const response = await api.get('/fuel-types')
      let fuelTypes = []
      response.data.forEach(element => {
        fuelTypes.push({ value: element.name, label: element.name })
      })
      setTimeout(() => {
        setOptionsFuelTypes(fuelTypes)
      }, 100);
    }
    catch (err) {
      console.log(err)
    }
  }
  const fetchTransmissions = async () => {
    try {
      const response = await api.get('/transmissions')
      let transmissions = []
      response.data.forEach(element => {
        transmissions.push({ value: element.name, label: element.name })
      })
      setTimeout(() => {
        setOptionsTransmissions(transmissions)
      }, 100);
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
    if (selectedModels.length > 0 && selectedBrands.length > 0) {
      url = url + 'model=' + selectedModels + '&'
    }
    if (selectedCapacitys.length > 0 && selectedCapacitys.length !== passengerCapacity.length) {
      url = url + 'seat_count=' + selectedCapacitys + '&'
    }
    if (selectedBodyTypes.length > 0 && selectedBodyTypes.length !== bodyTypesOptions.length) {
      url = url + 'vehicle-type=' + selectedBodyTypes + '&'
    }
    if (selectedFuelTypes.length > 0 && selectedFuelTypes.length !== optionsFuelTypes.length) {
      url = url + 'fueltype=' + selectedFuelTypes + '&'
    }
    if (selectedDriverTrains.length > 0 && selectedDriverTrains.length !== optionsDrivetrains.length) {
      url = url + 'drivetrain=' + selectedDriverTrains + '&'
    }
    if (selectedTransmissions.length > 0 && selectedTransmissions.length !== optionsTransmissions.length) {
      url = url + 'gear-type=' + selectedTransmissions + '&'
    }
    if (selectedColors.length > 0 && selectedColors.length !== exteriorColors.length) {
      url = url + 'color=' + selectedColors + '&'
    }
    if (selectedRange > 0) {
      url = url + 'maxprice=' + selectedRange + '&'
    }
    if (searchInput.length > 0) {
      url = url + 'namesearch=' + searchInput + '&'
    }
    if(!condition1Field){
      if(condition2Field){
        url = url + 'condition=New&'
      }else if(condition3Field){
        url = url + 'condition=Used&'
      }
    }
    setTimeout(() => {
      setSecondUrl(url)
      window.scroll(0, 0)
      if(conditionURL === 'New') {
        navigate('/new-cars?' + url + 'offset=0')
      }else if(conditionURL === 'Used') {
        navigate('/used-cars?' + url + 'offset=0')
      }else{
        navigate('/search?' + url + 'offset=0')
      }
      closePhoneFilter()
    }, 500);
  }
  const previousPage = () => {
    navigate('/new-cars?' + secondUrl + 'offset=' + (Number(offset) - 10))
    fetchCars(Number(offset) - 10)
    window.scroll(0, 0)
    setOffset(Number(offset) - 10)
  }
  const nextPage = () => {
    navigate('/new-cars?' + secondUrl + 'offset=' + (Number(offset) + 10))
    fetchCars()
    window.scroll(0, 0)
    setOffset(Number(offset) + 10)
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
        console.log(e.target.value)
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
      else if (e.target.name === 'fueltype') {
        setSelectedFuelTypes([...selectedFuelTypes, year.value])
      }
      else if (e.target.name === 'drivertrain') {
        setSelectedDriverTrains([...selectedDriverTrains, year.value])
      }
    }else{
      if (e.target.name === 'year') {
        setSelectedYears(selectedYears.filter(el => el != year))
      } else if (e.target.name === 'brand') {
        setSelectedBrands(selectedBrands.filter(el => el != year))
      } else if (e.target.name === 'body-type') {
        setSelectedBodyTypes(selectedBodyTypes.filter(el => el != year))
      } else if (e.target.name === 'transmission') {
        setSelectedTransmissions(selectedTransmissions.filter(el => el != year.value))
      } else if (e.target.name === 'fueltype') {
        setSelectedFuelTypes(selectedFuelTypes.filter(el => el != year.value))
      } else if (e.target.name === 'drivertrain') {
        setSelectedDriverTrains(selectedDriverTrains.filter(el => el != year.value))
      } else if (e.target.name === 'capacity') {
        setSelectedCapacitys(selectedCapacitys.filter(el => el != year))
      } else if (e.target.name === 'model') {
        setSelectedModels(selectedModels.filter(el => el != year))
      } else if (e.target.name === 'color') {
        setSelectedColors(selectedColors.filter(el => el != year.value))
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

  useEffect(() => {
    if(optionsBrands == []){
      fetchBrands()
    }else{
      let models = []
      let optionsBrands2 = optionsBrands.filter(el => selectedBrands.includes(el.value))
      optionsBrands2.forEach(el => {
        el.models.forEach(el2 => {
          models = [...models, { value: el2, label: el2 }]
        })
      })
      let models2 = models.flat()
      console.log(optionsBrands)
      console.log(models)
      setModelOptions(models2)
    }
  }, [selectedBrands, optionsBrands])

  return <div>
    <div className="usedCars">

      <div className="header">
        <h1>{conditionURL} Cars</h1>
        <p>Homepage - {conditionURL} Cars</p>
      </div>

      <div className="usedCarsContent">

        <div ref={filterSection} className="filterSection" >
          <div className="filterHeader">
            <h2>Filter</h2>
            <i onClick={closePhoneFilter} className="fa fa-close"></i>
          </div>
          <div className="filterSectionAll">
          {conditionURL === "All" && <div className="selectCondition">
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
            </div>}
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
                    <input defaultChecked={selectedFuelTypes.includes(fuelType.value.replaceAll(" ", '%20'))} onChange={(e) => { changeOptions(e, fuelType) }} type="checkbox" name="fueltype" id={'fuelType' + fuelType.value} />
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
                      <input checked={selectedCapacitys.includes(String(capacity))} type="checkbox" name="capacity" onChange={(e) => { changeOptions(e, capacity) }} id={'capacity' + i} />
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
              return (<Car key={car._id} car={car} />)
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
