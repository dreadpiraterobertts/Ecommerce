import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
        <div>
          <h1>Payment Successful</h1>
        </div>
      ) : (
        <p>Verifying Order</p>
      )}
    </div>
  );
};

export default Success;
