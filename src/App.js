import { Route, Routes } from 'react-router';
import './AppStyle.scss'
import HomePage from './pages/Home/HomePage';
import AboutPage from './pages/About/AboutPage';
import ComparePage from './pages/Compare/ComparePage';
import SellPage from './pages/Sell/SellPage';
import RegisterPage from './pages/Registration/RegisterPage';
import LogInPage from './pages/Registration/LogInPage';
import ProductPage from './pages/Product/ProductPage';
import ContactPage from './pages/Contact/ContactPage';
import FaqPage from './pages/Faq/FaqPage';
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import UserPage from './pages/User/UserPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { PrivateRoute } from './services/PrivateRoute'
import { GuestRoute } from './services/GuestRoute';
import SearchCar from './pages/Search/SearchCar';

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
