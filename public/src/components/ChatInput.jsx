/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { BsEmojiSmileFill } from "react-icons/bs";
function ChatInput({handleSendMsg}) {
    const [showEmojiPicker,setShowEmojiPicker]=useState(false);
    const [msg,setMsg]=useState("");

    const handleEmojiPickerHideShow=()=>{
        setShowEmojiPicker(!showEmojiPicker)
    }
    const handleEmojiClick=(emoji)=>{
        let message = msg;
        message+=emoji.emoji;
        setMsg(message)
        setShowEmojiPicker(false)
    }
    const sendChat=(event)=>{
        event.preventDefault();
        if(msg.length>0){
            handleSendMsg(msg);
            setMsg("")
        }
    }
  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow}/>
          {
            showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}></Picker>
          }
        </div>
      </div>
      <form className="input-container" onSubmit={(e)=>sendChat(e)}>
        <input type="text" placeholder="Type your message here!" value={msg} onChange={(e)=>setMsg(e.target.value)}/>
        <Button
          type="primary"
          className="send-button"
          icon={<SendOutlined />}
          size="large"
          onClick={(e)=>sendChat(e)}
        ></Button>
      </form>
    </Container>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  border: 1px solid #91d5ff;
  /* padding: 0 2rem; */
  padding-left: 0.3rem;
  .button-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #fff000;
        cursor: pointer;
      }
      .EmojiPickerReact{
        position:absolute;
        top:-455px;
        left:-6px;
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    border: none;
    padding-left: 1rem;
    font-size: 1.2rem;
    input {
        width:90%;
        border:none;
        padding-left: 1rem;
        font-size:1.2rem;
      &::selection {
        background-color: #e6f7ff;
      }
      &:focus {
        outline: none;
      }
    }

    .send-button {
      width:6rem;
      svg{
        height:2rem;
        width:1.5rem
      }
      /* border-radius:1.5rem; */
    }
  }
`;
export default ChatInput;
