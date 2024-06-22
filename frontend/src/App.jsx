// App.js
import { useState } from 'react';
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

  return (
    <div>
      <BrowserRouter>
        
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/allproducts' element={<AllProducts />} />
            <Route path='/mens' element={<ShopCategory banner={men_banner} category="men" />} />
            <Route path='/womens' element={<ShopCategory banner={women_banner} category="women" />} />
            <Route path='/kids' element={<ShopCategory banner={kids_banner} category="kid" />} />
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
