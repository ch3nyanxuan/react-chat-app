import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, Tooltip, notification } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { loginRoute } from "../utils/APIRoutes";
import axios from "axios";
import { useEffect } from "react";
function Login() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem("chat-app-user")){
      navigate("/")
    }
  })
  const onFinish = async (values) => {
    let { username, password, remember } = values;
    const { data } = await axios.post(loginRoute, {
      username,
      password,
    });
    if (data.status === false) {
      notification["error"]({
        message: "error",
        description: data.msg,
      });
    }
    if (data.status === true) {
      if (remember) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
      }
      navigate("/");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    notification.open({
      message: "Tips",
      description: "Please fllow the prompts in the form to fill out the form coorectly!",
      icon: (
        <ExclamationCircleOutlined
          style={{
            color: "#108ee9",
          }}
        />
      ),
    });
  };
  const onFill = () => {};
  return (
    <Screen>
      <FormContainer className="container">
        <Title>login</Title>
        <Form
          name="login"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Tooltip
              placement="topLeft"
              title="Don't` have an account?"
              arrowPointAtCenter
            >
              <Link to="/register">
                <Button type="link" htmlType="button" onClick={onFill}>
                  Register
                </Button>
              </Link>
            </Tooltip>
          </Form.Item>
        </Form>
      </FormContainer>
    </Screen>
  );
}
const FormContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Screen = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.div`
  font-size: 60px;
  background: #0093e9;
  -webkit-background-clip: text;
  color: transparent;
  display: inline-block;
  margin-bottom: 24px;
`;
export default Login;
