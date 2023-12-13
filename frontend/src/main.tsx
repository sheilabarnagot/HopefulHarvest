import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.tsx'
import './index.css'
import UserRegistration from './UserRegistration.tsx'
import Login from './login.tsx'
import Navbar from './Navbar.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
