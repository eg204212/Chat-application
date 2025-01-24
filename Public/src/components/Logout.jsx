import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {BiPowerOff} from "react-icons/bi";

export default function Logout() {
    const navigate = useNavigate();
    const handleClick =async () => {
        localStorage.clear();
        navigate("/register");
    }
  return (
        <Button onClick={handleClick}>
      <BiPowerOff/>
    </Button>
  );
}



const ParentContainer = styled.div`
display: flex;
justify-content: flex-start; /* Aligns children (like the button) to the left */
align-items: center;
width: 100%;
padding: 1rem;
background-color: #f1f1f1; /* Optional background for visualization */
`;

const Button = styled.div`
display: flex;
justify-content: center;
align-items: center;
padding: 0.5rem;
border-radius: 0.5rem;
background-color: #4f04ff;
border: none;
width: 1.5rem;
cursor: pointer;
svg {
  font-size: 1.3rem;
  color: #ebc7ff;
}
margin-left: 45rem; 
`;