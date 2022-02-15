import React,{useEffect} from 'react';
import Header from './Header';

export default function SearchPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return <div>
  <Header />
    Search</div>;
}
