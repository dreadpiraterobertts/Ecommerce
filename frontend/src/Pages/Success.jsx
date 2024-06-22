import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const Success = () => {
  const [orderVerified, setOrderVerified] = useState(false);
  const [orderSaved, setOrderSaved] = useState(false);
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const sessionId = urlParams.get('session_id');

  // useRef for storing and accessing local storage data
  useEffect(() => {
   
    

    // Ensure all conditions are met to initiate verification and data sending
    if (sessionId && !orderVerified && localStorage) {
      fetch(`http://localhost:4000/verify-session/${sessionId}`)
        .then(response => response.json())
        .then(data => {
          if (data.success && !orderSaved) {
            console.log('Payment successful');
            setOrderVerified(true);
            const localData = localStorage.getItem('deliveryInfo')
            sendLocalStorageData(localData);
          } else {
            console.error('Payment failed or session ID is invalid');
          }
        })
        .catch(error => {
          console.error('Error verifying session ID:', error);
        });
    } else {
      console.error('No session ID found in the URL or order already verified');
    }
  }, []); // Dependency array with necessary variables

  // Function to send local storage data to backend
  const sendLocalStorageData = (data) => {
    fetch('http://localhost:4000/process-local-storage-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    })
    .then(response => response.json())
    .then(responseData => {
      console.log('Local storage data sent successfully:', responseData);
      setOrderSaved(true); // Mark order as saved to prevent duplicate saves
      localStorage.clear(); // Clear local storage after sending data
    })
    .catch(error => {
      console.error('Error sending local storage data:', error);
    });
  };

  return (
    <div>
      {orderVerified ? (
        <div>
          <h1>Payment Successful!</h1>
        </div>
      ) : (
        <p>Verifying your order...</p>
      )}
    </div>
  );
};

export default Success;
