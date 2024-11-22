import React, { useEffect,useState } from 'react'
import './offers.css'
import exclusive_image from '../Assets/exclusive_image.png'
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const Offers = () => {
  const [banner,setBanner] = useState([])
  
  useEffect(()=>{
    fetchBanners()

  },[])
  const fetchBanners = async () => {
    try {
        const response = await fetch(`${backendUrl}/banners`);
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
    <div className='offers'>
      <div className="offers-left">
        <h1>Exclusive</h1>
        <h1>Offers For You</h1>
        <p>ONLY ON BEST SELLERS PRODUCT</p>
        <button>Check Now</button>
      </div>
      <div className="offers-right">
         <img src={banner[0].imageUrl} alt="" />
      </div>
    </div>
  )
}

export default Offers
