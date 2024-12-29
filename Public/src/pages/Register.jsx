import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Register.css'; 
import logo from '../assets/logo.jpg';
import backg from '../assets/backg.png';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    handleValidation();
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    
   /* if (!username || !email || !password || !confirmPassword) {
      toast.error("All fields are required.", );
      return;
    }*/

    if (password !== confirmPassword) {
      toast.error(
        "Password and Confirm Password should be same.", {
          toastOptions
      });
      return false;
    }
    else if (username.length <3){
      toast.error("Username should be greater than 3 characters", toastOptions);
      return false;
    }
    else if (password.length <8){
      toast.error("Password should be equal or greater than 8 characters", toastOptions);
      return false;
    }
    else if (email === ""){
      toast.error("Email is required", toastOptions);
      return false;
    }

  };

  const handlechange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
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
            <input
              type="text"
              placeholder='Username'
              name="username"
              onChange={(e) => handlechange(e)}
            />
            <input
              type="email"
              placeholder='Email'
              name="email"
              onChange={(e) => handlechange(e)}
            />
            <input
              type="password"
              placeholder='Password'
              name="password"
              onChange={(e) => handlechange(e)}
            />
            <input
              type="password"
              placeholder='Confirm Password'
              name="confirmPassword"
              onChange={(e) => handlechange(e)}
            /> 
          </div>
          <button type="submit">Register</button>
        </form>
        Already have an account? <Link to="/Login">Login</Link>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
