import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useStripe } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51PNxEB1XzIPCkFeyWTm0BUlbyv0eTSJT3KNKnI48dTUz7e07BkND4bmKO7oJpZL0eUyDQ2NzXzBVV3sxDfYg9tUx00LYHPJAG6');

const CheckOutButton = ({ totalAmount }) => {
    const handleCheckout = async () => {
    const stripe = await stripePromise;

    const response = await fetch('http://localhost:4000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: totalAmount }),
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return <button onClick={handleCheckout}>Proceed To Checkout</button>;
};

export default CheckOutButton;
