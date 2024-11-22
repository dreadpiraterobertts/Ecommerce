import React, { useState, useEffect } from 'react';
import './orders.css'; // Import the CSS file
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [view, setView] = useState('notDelivered'); // Toggle state for view

  const fetchOrders = async (view) => {
    const endpoint = view === 'delivered' ? 'get-delivered-orders' : 'get-orders';
    try {
      const response = await fetch(`${backendUrl}/${endpoint}`);
      const data = await response.json();
      setAllOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders(view);
  }, [view]);

  const checkDelivered = async (id) => {
    try {
      await fetch(`${backendUrl}/check-delivered`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      fetchOrders(view);
    } catch (error) {
      console.error('Error marking order as delivered:', error);
    }
  };

  return (
    <div className="orders-container">
      <div className="view-toggle">
        <button 
          className={view === 'notDelivered' ? 'active' : ''} 
          onClick={() => setView('notDelivered')}
        >
          Pending Orders
        </button>
        <button 
          className={view === 'delivered' ? 'active' : ''} 
          onClick={() => setView('delivered')}
        >
          Delivered Orders
        </button>
      </div>
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
              {view === 'notDelivered' && <th>Delivered</th>}
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
                {view === 'notDelivered' && (
                  <td>
                    <button onClick={() => checkDelivered(order.orderId)}>Mark as Delivered</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
