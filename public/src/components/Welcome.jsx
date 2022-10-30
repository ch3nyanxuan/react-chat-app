import React from "react";
import styled from "styled-components";

function Welcome({ currentUser }) {
  return (
  <>
  { currentUser && <Container>
    <h1>Welcome,<span> {currentUser.username}!</span></h1>
     <h3>Please select a chat to Start Messaging!</h3>
  </Container>
  }</>);
}
const Container = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items: center
`;
export default Welcome;
