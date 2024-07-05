import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {BrowserRouter,Routes,Route, Link} from 'react-router-dom'
import Confetti from 'react-confetti'
import './css/success.css'

const Success = () => {
  const [orderVerified, setOrderVerified] = useState(false);
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const sessionId = urlParams.get('session_id');

  useEffect(() => {
    const localData = localStorage.getItem('deliveryInfo');
    const parsedLocalData = JSON.parse(localData);
    console.log(parsedLocalData);

    if (sessionId && !orderVerified) {
      fetch(`http://localhost:4000/verify-session/${sessionId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log('Payment was successful..... saving order to database');
            setOrderVerified(true);

            sendLocalData(parsedLocalData);
          } else {
            console.log('Payment was not successful');
            console.error('payment failed');
          }
        })
        .catch((error) => {
          console.error('Error verifying session:', error);
        });
    } else {
      console.log('No session Id or Order was already verified');
    }
  }, []);

  const sendLocalData = (data) => {
    fetch(`http://localhost:4000/process-local-storage-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((resData) => {
        console.log('Local storage data sent successfully:', resData);
        localStorage.clear();
      })
      .catch((error) => {
        console.error('Error sending local storage data:', error);
      });
  };

  return (
    <div>
      {orderVerified ? (
        <div className='success'>
          <h1>Payment Successful</h1>
          
         <button><Link style={{textDecoration:'none'}} to='/'>Keep Shopping</Link></button>
          <Confetti
          width={2000}
          height={720}
         />
  
        </div>
      ) : (
       
        <div  className='success'>
          <p>Verifying Order.... </p>
          <button><Link style={{textDecoration:'none'}} to='/'>Keep Shopping</Link></button>
        </div>
      )}
    </div>
  );
};

export default Success;
