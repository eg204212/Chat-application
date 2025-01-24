import React from 'react';
import styled from "styled-components";
import Robot from "../assets/robot.gif";

export default function Welcome({ currentUser }) {
 
    return (
      <Container>
      <img src={Robot} alt="Robot" />
      <h1>
        Welcome, <span>{currentUser.username}!</span>
      </h1>
      <h3>Please select a Chat to start messaging</h3>
    </Container>
    );
  }


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;

  img {
    height: 15rem;
    border-radius: 50rem;
  }
  
   span {
      color: #4e0eff;
    }

  h1 {
    margin-top: 1rem;
    font-size: 2rem;
  }

  h3 {
    margin-top: 1rem;
    font-weight: 300;
    color: #ffffffb3;
  }
`;
