import React from 'react';
import '../styles/CarStyle/CarStyle.css'
import { useNavigate } from 'react-router';

export default function Car({ isNew }) {

    const navigate = useNavigate()

    return <div onClick={()=>{navigate('/product/1')}} className="car">
        <img className='carImages' src="../assets/tesla-car.png" alt="" />
        <div className="aboutCar">
            {isNew ? <p className="newBage">New</p> : <p className="newBage">Used</p>}
            <h2 className="carName">Tesla Model 3 Standard Range Plus</h2>
            <h2 className="carPrice">$18,990</h2>
            <p className="carLocation">Florida, USA</p>
            <div className="carInfos">
                <div>
                    <div>
                        <img src="./assets/calendar.png" alt="" />
                        <p>2020</p>
                    </div>
                </div>
                <div>
                    <div>
                        <img src="./assets/wheel.png" alt="" />
                        <p>Rear-wheel Drive</p>
                    </div>
                </div>
                <div>
                    <div>
                        <img src="./assets/gas.png" alt="" />
                        <p>Electric</p>
                    </div>
                </div>
                <div>
                    <div>
                        <img src="./assets/seats.png" alt="" />
                        <p>5</p>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}
