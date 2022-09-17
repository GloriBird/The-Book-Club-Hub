import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #fefbe7;
`;

export const CreateClubButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: #a1cf8b;
  color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 5px;
  padding: 1% 1.5%;
  font-size: 1rem;
  margin-top: 50px;
  font-weight: bolder;
  box-shadow: 0px -4px 7px #68a033 inset;

  &:hover {
    cursor: pointer;
  }
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
