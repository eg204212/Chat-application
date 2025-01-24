import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from '../assets/logo1.jpg';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from '../utils/APIRoutes';

function Register() {
  const navigate = useNavigate();
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
  };

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate("/register");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username, email } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem('chat-app-user', JSON.stringify(data.user));
        navigate("/SetAvatar");
      }
    }
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;

    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password should be the same.", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be equal to or greater than 8 characters", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <Background>
      <Container>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="header">
            <img src={logo} alt="logo1" className="logo1" />
            <h1>ChatterBox</h1>
          </div>
          <h2>Register</h2>
          <div className="form-fields">
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button type="submit">Register</button>
          <span>
            Already have an account? <Link to="/Login">Login</Link>
          </span>
        </form>
        <ToastContainer />
      </Container>
    </Background>
  );
}

export default Register;

const Background = styled.div`
  height: 100vh;
  width: 100vw;
 background-color: #131324;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 400px;
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  color: white;
  text-align: center;

  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;

    .logo1 {
      height: 90px;
      margin-right: 0.5rem;
      border-radius: 50rem;
    }
  }

  h2 {
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
    color: #4e0eff;
  }

  .form-fields {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.5rem;

    input {
      padding: 0.8rem;
      border-radius: 5px;
      border: 1px solid #4e0eff;
      background-color: transparent;
      color: white;
      font-size: 1rem;

      &:focus {
        outline: none;
        border: 1px solid #997af0;
      }
    }
  }

  button {
    width: 100%;
    padding: 0.8rem;
    border-radius: 5px;
    border: none;
    background-color: #4e0eff;
    color: white;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background-color: #997af0;
    }
  }

  span {
    font-size: 0.9rem;
    color: #ffffff;
    margin-top: 1rem;

    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
