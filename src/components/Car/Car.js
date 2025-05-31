import './CarStyle.scss'
import { useNavigate } from 'react-router';
import api from '../../api/apiCalls'
import { toast } from 'react-toastify';
import { useRef } from 'react';



export default function Car({ car, canDelete }) {
    const carRef = useRef()
    const navigate = useNavigate()

  const deleteMyCar = async (id) => {
    if(!canDelete) return
    try {
      const response = await api.delete('/cars/' + id)
      if(response.status === 200){
        carRef.current.remove()
        toast.success('Car deleted')
      }
    }
    catch (error) {
      console.log(error.response.data)
    }
  }

    return <div ref={carRef} onClick={(e) => {if(e.target.className != "deleteBtn" && e.target.className != "x"){navigate('/product/' + car._id)}}} className="car">
        {canDelete && <p onClick={() => { deleteMyCar(car._id) }} className='deleteBtn'><span className='x'>X</span></p>}
        <img className='carImages' src={"../assets/tesla-car.png"} alt="" />
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