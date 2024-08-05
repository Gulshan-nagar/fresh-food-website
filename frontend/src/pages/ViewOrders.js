import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setMessage('User not authenticated');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.data.length === 0) {
          setMessage('No orders found.');
        } else {
          setOrders(response.data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setMessage('Error fetching orders.');
      }
    };
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('User not authenticated');
        return;
      }

      await axios.put(`http://localhost:5000/api/orders/${orderId}`, { status: newStatus }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrders(orders.map(order => order._id === orderId ? { ...order, status: newStatus } : order));
      setMessage('Order status updated successfully');
    } catch (error) {
      console.error('Error updating order status:', error);
      setMessage('Error updating order status.');
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('User not authenticated');
        return;
      }

      await axios.delete(`http://localhost:5000/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrders(orders.filter(order => order._id !== orderId));
      setMessage('Order deleted successfully');
    } catch (error) {
      console.error('Error deleting order:', error);
      setMessage('Error deleting order.');
    }
  };

  return (
    <div>
      <h2>View Orders</h2>
      {message && <p>{message}</p>} {/* Display message */}
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            <p>Order ID: {order._id}</p>
            <p>Total Price: {order.totalPrice}</p>
            <p>Status: {order.status}</p>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>{item.itemName} - {item.quantity} x {item.price}</li>
              ))}
            </ul>
            <button onClick={() => updateOrderStatus(order._id, 'In Progress')}>Mark as In Progress</button>
            <button onClick={() => updateOrderStatus(order._id, 'Completed')}>Mark as Completed</button>
            <button onClick={() => deleteOrder(order._id)}>Delete Order</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewOrders;
