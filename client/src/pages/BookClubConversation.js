import React, { useEffect, useRef, useState, useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import { SideBar } from "../components/SideBar";
// import io from "socket.io-client";

import {
  CardGrid,
  ChatForm,
  MessageBox,
  InputAndButtonWrapper,
  SendButton,
} from "./pageStyles/BookClubConversation.styled";

// const socket = io.connect("http://localhost:8000");

const BookClubConversation = () => {
  const userData = useContext(CurrentUserContext);
  const { trendingBooks, allUsers, allBookClub, allUsernames, userInData } = useContext(GlobalContext);
  const [userMessage, setUserMessage] = useState();

  const { bookClubID } = useParams();

  const {
    state: { username, hostingBookClubs },
  } = userData;

  const sendMessage = () => {
    // socket.emit("send_message");
  };

  const bookGroup = hostingBookClubs !== null && allBookClub?.filter((x) => x?._id === bookClubID);

  return (
    <>
      {allBookClub !== undefined && (
        <CardGrid>
          <>
            <p>{bookGroup[0]?.bookClubName}</p>
            <ChatForm>
              <p>
                {username}:{userMessage}
              </p>
              <InputAndButtonWrapper>
                <MessageBox type="text" required />
                <SendButton onClick={sendMessage}>
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
