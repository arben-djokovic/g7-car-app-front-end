import React,{useEffect} from 'react';
import Header from './Header';

export default function ComparePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return <div>
  <Header />
    Compare</div>;
}
