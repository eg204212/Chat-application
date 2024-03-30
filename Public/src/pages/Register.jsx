import React, { useState } from 'react';
import './Register.css'; 
import logo from '../assets/logo.jpg';
import backg from '../assets/backg.png';

function Register() {
  // State variables for form fields and validation errors
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form validation
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length === 0) {
      // No errors, proceed with form submission
      console.log('Form data:', formData);
      // Reset form fields
      setFormData({ username: '', email: '', password: '', confirmPassword: '' });
      setErrors({});
    } else {
      // Update errors state with validation errors
      setErrors(newErrors);
    }
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear associated error when user starts typing in a field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  // Function to handle login link click
  const handleLoginClick = () => {
    // Navigate to login page
    // Example: Replace with your navigation logic
    window.location.href = '/login'; // Redirect to the login page
  };

  return (
    <div className="background-container">
      <img className="backg" src={backg} alt="backg" />
      <div className="register-container">
        <form className='container1'>
          <div className="horizontal-container">
            <img className="logo" src={logo} alt="logo" />
            <h1 className='title1'>ChatterBox</h1>
          </div>
        </form>

        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="register-form">
          {/* Form fields */}
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>
          <button type="submit">Register</button>
        </form>
        <div className="login-link" onClick={handleLoginClick}>
          Already have an account? <span className="login-link-text">Login</span>
        </div>
      </div>
    </div>
  );
}

export default Register;
