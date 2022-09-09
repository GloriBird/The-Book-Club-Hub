import React, { useEffect, useRef, useState, useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

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
  const { trendingBooks, allUsers, allBookClub, allUsernames, userInData } = useContext(GlobalContext);

  const [userMessage, setUserMessage] = useState();
  const { bookClubID } = useParams();
  const messageRef = useRef();

  const {
    state: { _id, username, email, bookClubs, hostingBookClubs },
  } = userData;

  console.log(`allBookClub:`, allBookClub);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`messageRef.current.value:`, messageRef.current.value);
    setUserMessage(messageRef.current.value);
  };

  const bookGroup = hostingBookClubs !== null && allBookClub?.filter((x) => x?._id === bookClubID);

  console.log(`bookGroup:`, bookGroup);

  return (
    <>
      {allBookClub !== undefined && (
        <CardGrid>
          <>
            <p>{bookGroup[0]?.bookClubName}</p>
            <ChatForm onSubmit={handleSubmit}>
              <p>{userMessage}</p>
              <InputAndButtonWrapper>
                <MessageBox type="text" ref={messageRef} required />
                <SendButton type="submit">Send</SendButton>
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
