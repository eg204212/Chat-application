import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Login.css'; 
import logo from '../assets/logo.jpg';
import backg from '../assets/backg.png';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from '../utils/APIRoutes';

function Login() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  }

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate("/Chat");
    }
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
      if( handleValidation()){
        const { password, username } = values; 
        const {data} = await axios.post(loginRoute, {
            username,
            password,
          });
          if(data.status===false) {
            toast.error(data.msg, toastOptions);
          }
          if(data.status=== true){
            localStorage.setItem('chat-app-user' , JSON.stringify(data.user)); // pass the user info to local storage
            navigate ("/Chat");
          }
          
      }
  };

  const handleValidation = () => {
      const { password, username } = values;
    
        if (password === "") {
          toast.error("Username and Password is required", toastOptions);
          return false;
        }
        else if (username === ""){
          toast.error("Username and Password is required", toastOptions);
          return false;
        }
        return true;
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

        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="register-form">
          
          {/* Form fields */}
          <div className="form-group">
            <input
              type="text"
              placeholder='Username'
              name="username"
              onChange={(e) => handlechange(e)}
              min= "3"
            />
            <input
              type="password"
              placeholder='Password'
              name="password"
              onChange={(e) => handlechange(e)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        Don't have an account? <Link to="/Register">Register</Link>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
