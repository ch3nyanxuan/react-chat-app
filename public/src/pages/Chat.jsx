import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUserRoute,host } from "../utils/APIRoutes";
import { notification } from "antd";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";
function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  // eslint-disable-next-line
  const [currentChat, setCurrentChat] = useState(undefined);
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      notification["warning"]({
        message: "warning",
        description: "Please login first!",
      });
      navigate("/login");
    }
  });
  useEffect(() => {
    if(currentUser){
      socket.current = io(host);
      socket.current.emit("add-user",currentUser._id);
    }
  }, [currentUser]);
  useEffect(() => {
    async function currentUser() {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      }
    }
    currentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    async function getA() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUserRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          notification["warning"]({
            message: "warning",
            description: "Please set your avatar first!",
          });
          navigate("/setAvatar");
          console.log(contacts);
        }
      }
    }
    getA();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <Container>
      <div className="container">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        ></Contacts>
        {currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
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
  align-items: center;
  gap: 1rem;
  .container {
    height: 85vh;
    width: 85vw;
    box-shadow: 0px 6px 16px -8px rgba(0, 0, 0, 0.08),
      0px 9px 28px 0px rgba(0, 0, 0, 0.05),
      0px 12px 48px 16px rgba(0, 0, 0, 0.03);
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and(max-width:1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
export default Chat;
