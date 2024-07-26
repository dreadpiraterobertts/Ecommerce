// App.js
import { useState,useEffect } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import LoginSignup from './Pages/LoginSignup';
import Cart from './Pages/Cart';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kids_banner from './Components/Assets/banner_kids.png';
import AllProducts from './Pages/AllProducts';
import Success from './Pages/Success';




function App() {
  const [count, setCount] = useState(0);
  const [banner,setBanner] = useState([])
  
  useEffect(()=>{
    fetchBanners()

  },[])
  const fetchBanners = async () => {
    try {
        const response = await fetch('http://localhost:4000/banners');
        const data = await response.json();
        if (data.success) {
            setBanner(data.banners);
            console.log(banner)
        } else {
            alert('Failed to fetch banners');
        }
    } catch (error) {
        console.error('Error fetching banners:', error);
        alert('An error occurred while fetching banners');
    }
};
  return (
    <div>
      <BrowserRouter>
        
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/allproducts' element={<AllProducts />} />
            <Route path='/clothing' element={<ShopCategory banner={banner.length > 0 ? banner[0].imageUrl : men_banner}  category="clothing" />} />
            <Route path='/grocery' element={<ShopCategory banner={banner.length > 0 ? banner[0].imageUrl : men_banner} category="grocery" />} />
            <Route path='/sweets' element={<ShopCategory banner={banner.length > 0 ? banner[0].imageUrl : men_banner} category="sweets" />} />
            <Route path='/surprize' element={<ShopCategory banner={banner.length > 0 ? banner[0].imageUrl : men_banner} category="surprize" />} />
            <Route path='/product'>
              <Route path=':productId' element={<Product />} />
            </Route>
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<LoginSignup />} />
            <Route path="/success" element={<Success />} />
          </Routes>
          <Footer />
        
      </BrowserRouter>
    </div>
  );
}

export default App;
