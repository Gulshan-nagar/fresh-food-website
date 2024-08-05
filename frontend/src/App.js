import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import CreateOrder from './pages/CreateOrder';
import ViewOrders from './pages/ViewOrders';
import Orders from './pages/Orders';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Orders />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-order" element={<CreateOrder />} />
        <Route path="/view-orders" element={<ViewOrders />} />
      </Routes>
    </Router>
  );
}

export default App;
