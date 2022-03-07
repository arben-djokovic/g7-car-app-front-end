import React, { useState, useEffect } from 'react';
import '../styles/CarStyle/CarStyle.css'
import { useNavigate } from 'react-router';
import api from '../api/apiCalls';

export default function Car({ car }) {

    const navigate = useNavigate()
    let [banner, setBanner] = useState('')
    useEffect(() => {
        fetchModelImages()
    }, [car])

    const fetchModelImages = async () => {
        if (car.brand_model) {
            try {
                const response = await api.get('/banners/' + car.brand_model + '/')
                setBanner(response.data.banner)
            }
            catch (err) {
                console.log(err.response.data)
            }
        }
    }

    return <div onClick={() => { navigate('/product/' + car.id) }} className="car">
        <img className='carImages' src={banner} alt="" />
        <div className="aboutCar">
            <p className="newBage">{car.condition}</p>
            <h2 className="carName">{car.name}</h2>
            <h2 className="carPrice">${car.price}</h2>
            <p className="carLocation">{car.location}, Montenegro</p>
            <div className="carInfos">
                <div>
                    <div>
                        <img src="../assets/calendar.png" alt="" />
                        <p>{car.year}</p>
                    </div>
                </div>
                <div>
                    <div>
                        <img src="../assets/wheel.png" alt="" />
                        <p>{car.drivetrain}</p>
                    </div>
                </div>
                <div>
                    <div>
                        <img src="../assets/gas.png" alt="" />
                        <p>{car.fuel_type}</p>
                    </div>
                </div>
                <div>
                    <div>
                        <img src="../assets/seats.png" alt="" />
                        <p>{car.seat_count}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}
