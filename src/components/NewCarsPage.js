import React,{useEffect} from 'react';
import Header from './Header';

export default function NewCarsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return <div>
    <Header />
    NewCars</div>;
}
