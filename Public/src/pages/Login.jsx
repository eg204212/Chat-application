import React, { useState } from 'react';
import './Login.css'; // Import CSS file for styling (create Login.css file in the same directory)
import logo from '../assets/logo.jpg';
import backg from '../assets/backg.png';

function Login() {
  // State variables for form fields and validation errors
  const [formData, setFormData] = useState({
    username: '',
    password: '',
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
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length === 0) {
      // No errors, proceed with form submission
      console.log('Form data:', formData);
      // Reset form fields
      setFormData({ username: '', password: '' });
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

  // Function to handle register link click
  const handleRegisterClick = () => {
    // Navigate to register page
    // Example: Replace with your navigation logic
    window.location.href = '/register'; // Redirect to the register page
  };

  return (
    <div className="background-container">
      <img className="backg" src={backg} alt="backg" />
      <div className="login-container">
        <form className='container1'>
          <div className="horizontal-container">
            <img className="logo" src={logo} alt="logo" />
            <h1 className='title1'>ChatterBox</h1>
          </div>
        </form>

        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
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
          <button type="submit">Login</button>
        </form>
        <div className="register-link" onClick={handleRegisterClick}>
          Don't have an account? <span className="register-link-text">Register</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
