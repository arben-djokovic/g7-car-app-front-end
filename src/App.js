import { Route, Routes } from 'react-router';
import './styles/AppStyle/AppStyle.css'
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import NewCarsPage from './components/NewCarsPage';
import UsedCarsPage from './components/UsedCarsPage';
import ComparePage from './components/ComparePage';
import SellPage from './components/SellPage';
import RegisterPage from './components/RegisterPage';
import LogInPage from './components/LogInPage';
import SearchPage from './components/SearchPage';
import ProductPage from './components/ProductPage';
import ContactPage from './components/ContactPage';
import FaqPage from './components/FaqPage';

function App() {
  return (
    <div className="App">
       <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/new-cars" element={<NewCarsPage />} />
        <Route path="/used-cars" element={<UsedCarsPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/log-in" element={<LogInPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FaqPage />} />
      </Routes>
    </div>
  );
}

export default App;
