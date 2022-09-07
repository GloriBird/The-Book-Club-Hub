import React, { useEffect, useRef, useState, useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { SideBar } from "../components/SideBar";
import {
  CardGrid,
  ChatForm,
  MessageBox,
  InputAndButtonWrapper,
  SendButton,
} from "./pageStyles/BookClubConversation.styled";

const BookClubConversation = () => {
  const userData = useContext(CurrentUserContext);
  const [userMessage, setUserMessage] = useState();
  const messageRef = useRef();

  // const {
  //   state: { _id, username, email },
  // } = userData;

  // console.log(`_id:`, _id, `username:`, username, `email:`, email);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserMessage(messageRef.current.value);
  };

  console.log(`userMessage:`, userMessage);
  return (
    <>
      <CardGrid>
        <p>Book Club Conversation</p>

        <ChatForm onSubmit={handleSubmit}>
          <p>{userMessage}</p>
          <InputAndButtonWrapper>
            <MessageBox type="text" ref={messageRef} />
            <SendButton>Send</SendButton>
          </InputAndButtonWrapper>
        </ChatForm>
        <SideBar />
      </CardGrid>
    </>
  );
};

export default BookClubConversation;
