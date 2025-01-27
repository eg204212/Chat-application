import React, { useState, useEffect, useRef } from 'react';
import styled from "styled-components";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { allUserRoute , host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from "socket.io-client";

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat , setCurrentChat] = useState(undefined);
  const [isLoaded , setIsLoaded] = useState(false);

  // Check if a user exists in localStorage and set the current user
  useEffect(() => {
    const fetchUser = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/chat");
      } else {
        const storedUser = await JSON.parse(localStorage.getItem("chat-app-user"));
        setCurrentUser(storedUser);
        setIsLoaded(true);
      }
    };
    fetchUser();
  }, [navigate]);

  useEffect(() =>{
    if(currentUser){
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser])

  // Fetch contacts for the current user if the avatar is set
  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          try {
            const { data } = await axios.get(`${allUserRoute}/${currentUser._id}`);
            setContacts(data);
          } catch (error) {
            console.error("Failed to fetch contacts:", error);
          }
        } else {
          navigate('/setAvatar');
        }
      }
    };
    fetchContacts();
  }, [currentUser, navigate]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  }

  return (
    <Container>
      <div className='container'>
      <Contacts 
      contacts={contacts} 
      currentUser={currentUser} 
      changeChat ={handleChatChange} 
      />
      {isLoaded && currentChat === undefined ? (
        <Welcome currentUser= {currentUser} /> 
      ):(
        <ChatContainer 
        currentChat= {currentChat} 
        currentUser= {currentUser}
        socket = {socket}/>
      )} 
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .container {
    height: 90vh;
    width: 90vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
