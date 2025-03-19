import './CarStyle.scss'
import { useNavigate } from 'react-router';


export default function Car({ car }) {

    const navigate = useNavigate()


    return <div onClick={() => { navigate('/product/' + car.id) }} className="car">
        <img className='carImages' src={"./assets/tesla-car.png"} alt="" />
        <div className="aboutCar">
            <p className="newBage">{car?.condition}</p>
            <h2 className="carName">{car?.title}</h2>
            <h2 className="carPrice">${car?.price}</h2>
            <p className="carLocation">{car?.city?.name}, Montenegro</p>
            <div className="carInfos">
                <div>
                    <div>
                        <img src="../assets/calendar.png" alt="" />
                        <p>{car?.year}</p>
                    </div>
                </div>
                <div>
                    <div>
                        <img src="../assets/wheel.png" alt="" />
                        <p>{car?.drivetrain?.name}</p>
                    </div>
                </div>
                <div>
                    <div>
                        <img src="../assets/gas.png" alt="" />
                        <p>{car?.fuel_type?.name}</p>
                    </div>
                </div>
                <div>
                    <div>
                        <img src="../assets/seats.png" alt="" />
                        <p>{car?.passenger_capacity}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}
