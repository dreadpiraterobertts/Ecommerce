import React, { useState, useEffect } from 'react';
import './orders.css'; // Import the CSS file

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);

  const fetchInfo = async () => {
    try {
      const response = await fetch('http://localhost:4000/get-orders');
      const data = await response.json();
      setAllOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="orders-container">
      {allOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Sender Name</th>
              <th>Address</th>
              <th>City</th>
              <th>Receiver Phone</th>
              <th>Receiver Name</th>
              <th>Total Amount</th>
              <th>Cart Items</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order, index) => (
              <tr key={index}>
                <td>{order.orderId}</td>
                <td>{order.senderName}</td>
                <td>{order.address}</td>
                <td>{order.city}</td>
                <td>{order.recieverPhone}</td>
                <td>{order.recieverName}</td>
                <td>{order.totalAmount}</td>
                <td>
                  <table className="cart-items-table">
                    <thead>
                      <tr>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.cartItems.map((item, idx) => (
                        <tr key={idx}>
                          <td>{item.name}</td>
                          <td>{item.quantity}</td>
                          <td>{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
