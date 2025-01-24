import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from '../assets/logo.jpg';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from '../utils/APIRoutes';

function Login() {
  const navigate = useNavigate();
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
  };

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, { username, password });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      } else if (data.status === true) {
        localStorage.setItem('chat-app-user', JSON.stringify(data.user));
        navigate("/chat");
      }
    }
  };

  const handleValidation = () => {
    const { username, password } = values;
    if (username === "" || password === "") {
      toast.error("Username and Password are required", toastOptions);
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
        <form onSubmit={handleSubmit} className="login-form">
          <div className="header">
            <img src={logo} alt="logo" className="logo" />
            <h1>ChatterBox</h1>
          </div>
          <h2>Login</h2>
          <div className="form-fields">
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <button type="submit">Login</button>
          <span>
            Don't have an account? <Link to="/Register">Register</Link>
          </span>
        </form>
        <ToastContainer />
      </Container>
    </Background>
  );
}

export default Login;

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

    .logo {
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
