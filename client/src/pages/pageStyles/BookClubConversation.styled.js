import styled from "styled-components";

export const CardGrid = styled.div`
  /* color: red;
  border: 2px solid red;
  height: 100vh; */
  display: grid;
  grid-template-columns: 1fr 1.1fr 0.8fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: "Book ChatArea Members";
  gap: 30px;
`;

export const ChatForm = styled.form`
  border: 2px solid blue;
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  grid-area: ChatArea;
`;

export const InputAndButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  height: 10%;
  margin-bottom: 10px;
`;

export const MessageBox = styled.textarea`
  background-color: lightblue;
  width: 85%;
  resize: none;
  outline: none;
  border-radius: 5px;
`;

export const SendButton = styled.button`
  border: none;
  background-color: lightgreen;
  border-radius: 5px;
  width: 10%;
`;