import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import './checkout.css'

const stripePromise = loadStripe('pk_test_51PNxEB1XzIPCkFeyWTm0BUlbyv0eTSJT3KNKnI48dTUz7e07BkND4bmKO7oJpZL0eUyDQ2NzXzBVV3sxDfYg9tUx00LYHPJAG6');

const CheckOutButton = ({ totalAmount, cartInfo }) => {
  const [showForm, setShowForm] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({
    orderId: Date.now(),
    senderName: '',
    address: '',
    city: '',
    recieverPhone: '',
    recieverName: '',
    cartInfo: cartInfo,
    totalAmount: totalAmount,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem('deliveryInfo', JSON.stringify(deliveryInfo));
    console.log(deliveryInfo);
    const stripe = await stripePromise;

    const response = await fetch('http://localhost:4000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: totalAmount,
        deliveryInfo: deliveryInfo,
      }),
    })

    if (!response.ok) {
      const error = await response.json();
      console.error('Error creating checkout session:', error.error);
      return;
    }

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <>
      {!showForm ? (
        <button onClick={() => {
          if (totalAmount > 0) {
            setShowForm(true);
            console.log(cartInfo);
          } else {
            alert('Add something to your cart');
          }
        }}>
          Proceed To Checkout
        </button>
      ) : (
        <form onSubmit={handleFormSubmit}>
  <div>
    <label>
      Sender's Name:
      <input 
        type="text" 
        name="senderName" 
        value={deliveryInfo.senderName} 
        onChange={handleInputChange} 
        required 
        pattern="[A-Za-z\s]{1,50}" 
        title="Name should only contain letters and spaces, up to 50 characters." 
      />
    </label>
  </div>
  <div>
    <label>
      Address:
      <input 
        type="text" 
        name="address" 
        value={deliveryInfo.address} 
        onChange={handleInputChange} 
        required 
        minlength="5" 
        maxlength="100" 
        title="Address should be between 5 and 100 characters long." 
      />
    </label>
  </div>
  <div>
    <label>
      City:
      <input 
        type="text" 
        name="city" 
        value={deliveryInfo.city} 
        onChange={handleInputChange} 
        required 
        pattern="[A-Za-z\s]{1,50}" 
        title="City should only contain letters and spaces, up to 50 characters." 
      />
    </label>
  </div>
  <div>
    <label>
      Reciever Name:
      <input 
        type="text" 
        name="recieverName" 
        value={deliveryInfo.recieverName} 
        onChange={handleInputChange} 
        required 
        pattern="[A-Za-z\s]{1,50}" 
        title="Name should only contain letters and spaces, up to 50 characters." 
      />
    </label>
  </div>
  <div>
    <label>
      Reciever Phone:
      <input 
        type="tel" 
        name="recieverPhone" 
        value={deliveryInfo.recieverPhone} 
        onChange={handleInputChange} 
        required 
        pattern="\d{10}" 
        title="Phone number should be a 10-digit number." 
      />
    </label>
  </div>
  <button type="submit">Submit and Proceed to Checkout</button>
</form>

      )}
    </>
  );
};

export default CheckOutButton;
