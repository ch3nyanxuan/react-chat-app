import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, message, Popconfirm } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };
  const confirm = (e) => {
    handleClick()
    message.success('Complete');
  };
  
  const cancel = (e) => {

    message.error('Cancel');
  };
  return (
    <Popconfirm
      title="Are you sure to Logout?"
      onConfirm={confirm}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
    >
      <Button
        type="primary"
        icon={<PoweroffOutlined />}
      />
    </Popconfirm>
  );
}

export default Logout;
