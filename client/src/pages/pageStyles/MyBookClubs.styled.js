import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #fefbe7;
`;

export const CreateClubButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: #a0bcc2;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 5px;
  padding: 0.5% 1%;
  font-size: 1rem;
  margin-top: 50px;
  font-weight: bolder;
`;

export const ChatButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: lightblue;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 5px;
  padding: 0.5% 1%;
  margin-top: 50px;
`;
