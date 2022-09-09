import React, { useEffect, useRef, useState, useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import { SideBar } from "../components/SideBar";
import { ConversationContext } from "../context/ConversationContext";
import {
  CardGrid,
  ChatForm,
  MessageBox,
  InputAndButtonWrapper,
  SendButton,
} from "./pageStyles/BookClubConversation.styled";

const BookClubConversation = () => {
  const userData = useContext(CurrentUserContext);
  const { trendingBooks, allUsers, allBookClub, allUsernames, userInData } = useContext(GlobalContext);
  const conversationData = useContext(ConversationContext);
  const [userMessage, setUserMessage] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { bookClubID } = useParams();
  const messageRef = useRef();

  const {
    state: { _id, username, email, bookClubs, hostingBookClubs },
  } = userData;

  const {
    conversations: { formattedConversations, createConversation },
  } = conversationData;

  const handleSubmit = (e) => {
    setIsSubmitted(true);
    e.preventDefault();
    setUserMessage(messageRef.current.value);
    setIsSubmitted(false);
  };
  // setUserMessage((prevUserMessage) => {
  //   return [...prevUserMessage, messageRef.current.value];
  // });

  const bookGroup = hostingBookClubs !== null && allBookClub?.filter((x) => x?._id === bookClubID);
  // const handleClearTextArea = (e) => {
  //   setUserMessage("");
  // };

  return (
    <>
      {allBookClub !== undefined && (
        <CardGrid>
          <>
            <p>{bookGroup[0]?.bookClubName}</p>
            <ChatForm onSubmit={handleSubmit}>
              <p>
                {username}:{userMessage}
              </p>
              <InputAndButtonWrapper>
                <MessageBox type="text" ref={messageRef} required />
                <SendButton type="submit">
                  <p>Send</p>
                </SendButton>
              </InputAndButtonWrapper>
            </ChatForm>
            <SideBar />
          </>
        </CardGrid>
      )}
    </>
  );
};

export default BookClubConversation;
