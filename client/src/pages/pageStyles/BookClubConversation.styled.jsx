import styled from "styled-components";
import ScrollToBottom from "react-scroll-to-bottom";

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.1fr 0.8fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: "Book ChatArea Members";
  gap: 30px;
`;

export const ChatForm = styled.div`
  border: 12px solid blue;
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  grid-area: ChatArea;
  /* overflow: auto; */
  height: 80vh;
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
  overflow: hidden;
`;

export const SendButton = styled.button`
  border: none;
  background-color: lightgreen;
  border-radius: 5px;
  width: 10%;
`;

export const CurrentUser = styled.div`
  border-radius: 5px;
`;

export const OtherUser = styled.div`
  background-color: green;
  width: fit-content;
  text-align: end;
`;

export const Wrapper = styled.div`
  border: 2px solid red;
  text-align: left;

  ${CurrentUser} {
    text-align: right;
    width: auto;
    background-color: orange;
  }
`;

export const Scrolling = styled(ScrollToBottom)`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
`;
