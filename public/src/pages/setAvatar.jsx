/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setAvatarRoute } from "../utils/APIRoutes";
import { Button, notification, Spin } from "antd";
import axios from "axios";
import { Buffer } from "buffer";
function useAvatar() {
  const api = "https://api.multiavatar.com/";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectAvatar, setSelectedAvatar] = useState(undefined);
  useEffect(()=>{
    if (!localStorage.getItem("chat-app-user")) {
      notification["warning"]({
        message: "warning",
        description: "Please login first!",
      });
      navigate("/login");
    }
  });
  useEffect(() => {
    async function Evt() {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}?apikey=5dJGzTA9uyaR83`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    }
    Evt();
  }, []);
  const setProfilePicture = async (e) => {
    console.log(e);
    if (selectAvatar === undefined) {
      notification["warning"]({
        message: "warning",
        description: "please select an avatar!",
      });
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectAvatar],
      });
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        notification["success"]({
          message: "success",
          description: "seccess change the avatar!",
        });
        localStorage.setItem("chat-app-uset", JSON.stringify(user));
        navigate("/");
      } else {
        notification["error"]({
          message: "error",
          description: "Error setting avatar,try again!",
        });
      }
    }
  };
  return (
    <>
      <Container>
        <Content>
          {" "}
          <div className="title-container">
            <h1>Pick your avatar!</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <Spin spinning={isLoading}>
            <Button type="primary" onClick={(e) => setProfilePicture(e)}>
              This it is!
            </Button>
          </Spin>
        </Content>
      </Container>
    </>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;
const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 500px;
  gap: 3rem;
  .title-container {
    h1 {
      color: "#0093e9";
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
      }
    }
    .selected {
      border: 0.4rem solid #0093e9;
    }
  }
`;
export default useAvatar;
