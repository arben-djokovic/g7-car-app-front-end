import { Route, Routes } from 'react-router';
import './styles/AppStyle/AppStyle.css'
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ComparePage from './components/ComparePage';
import SellPage from './components/SellPage';
import RegisterPage from './components/RegisterPage';
import LogInPage from './components/LogInPage';
import ProductPage from './components/ProductPage';
import ContactPage from './components/ContactPage';
import FaqPage from './components/FaqPage';
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import UserPage from './components/UserPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { PrivateRoute } from './services/PrivateRoute'
import { GuestRoute } from './services/GuestRoute';
import SearchCar from './components/SearchCar';

function App() {
  return (
    <div className="App">
      <Header />
       <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/new-cars" element={<SearchCar conditionURL={"New"} />} />
        <Route path="/used-cars" element={<SearchCar conditionURL={"Used"} />} />
        <Route path="/compare/:id" element={<ComparePage />} />
        <Route
          path="/sell"
          element={
            <PrivateRoute>
              <SellPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <RegisterPage />
            </GuestRoute>
          }
        />
        <Route
          path="/log-in"
          element={
            <GuestRoute>
              <LogInPage />
            </GuestRoute>
          }
        />
        <Route path="/search" element={<SearchCar conditionURL={"All"} />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route
          path="/user/:user"
          element={
            <PrivateRoute>
              <UserPage />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
