import React, { useState } from 'react';
import axios from 'axios';
import './CreateOrder.css';

const CreateOrder = () => {
  const [items, setItems] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!items || totalPrice <= 0) {
      setMessage('Please provide valid items and total price.');
      setIsSuccess(false);
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/orders',
        { items, totalPrice },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Order created successfully!');
      setIsSuccess(true);
      setItems('');
      setTotalPrice(0);
    } catch (error) {
      setMessage('Error creating order. Please try again.');
      setIsSuccess(false);
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className="create-order">
      <h2>Create Order</h2>
      {message && (
        <div className={`message ${isSuccess ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Items"
          value={items}
          onChange={(e) => setItems(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Total Price"
          value={totalPrice}
          onChange={(e) => setTotalPrice(e.target.value)}
          required
        />
        <button type="submit">Create Order</button>
      </form>
    </div>
  );
};

export default CreateOrder;
