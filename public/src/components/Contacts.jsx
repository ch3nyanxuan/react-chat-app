/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
function Contacts({ contacts, currentUser,changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    console.log(contacts);
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser, contacts]);
  const changeCurrentChat = (index, contact) => {
    console.log(index,contact)
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <h3>userList</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key={index}
                  onClick={()=>changeCurrentChat(index,contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  .brand {
    display: flex;
    align-item: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 2rem;
    }
    h3 {
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar{
      width:0.2rem;
      &-thumb{
        background:#000;
        width:0.1rem;
        border-radius:1rem;
      }

    }
    .selected {
      border: 0.2rem solid #1890ff !important; 
    }
    .contact {
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      transition: 0.3s ease-in-out;
      background-color:#e6f7ff;
      border:1px solid #91d5ff;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
      }
    }
  }
  .current-user {
    display: flex;
     border:1px solid #91d5ff;
    justify-content: center;
    align-items: center;
    gap:2rem;
    .avatar{
      img{
        height:4rem;
        max-inline-size:100%
      }
    }
    .username{
      h2{

      }
    }
    @media screen and(min-width:720px) and (max-width:1080px){
      gap:0.5rem;
      .username{
        h2{
          font-size:1rem;
        }
      }
    }
  }
}
`;
export default Contacts;
