import React, { useEffect, useRef, useState, useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import { SideBar } from "../components/SideBar";
import io from "socket.io-client";

import {
  CardGrid,
  ChatForm,
  MessageBox,
  InputAndButtonWrapper,
  SendButton,
} from "./pageStyles/BookClubConversation.styled";
const moment = require("moment");

const socket = io.connect("http://localhost:8000");

const BookClubConversation = () => {
  const userData = useContext(CurrentUserContext);
  const { trendingBooks, allUsers, allBookClub, allUsernames, userInData, bookClubChat } = useContext(GlobalContext);
  const [userMessage, setUserMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState([]);
  const [isOnline, setIsOnline] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);

  const { bookClubID } = useParams();

  const {
    state: { username, hostingBookClubs },
  } = userData;

  const bookGroup = hostingBookClubs !== null && allBookClub?.filter((x) => x?._id === bookClubID);

  const joinBookClubChat = () => {
    setIsOnline(true);
    if (bookClubChat !== "") {
      socket.emit("join_chat", bookClubChat);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { sender: username, message: userMessage, time: moment().calendar(), bookClubChat });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("data:", data);
      setChatMessages((msgList) => [...msgList, data]);
      // setReceivedMessage(data);
    });
  }, [socket]);

  return (
    <>
      {allBookClub !== undefined && (
        <CardGrid>
          <>
            <p>{bookGroup[0]?.bookClubName}</p>
            <ChatForm>
              {/* <p>
                {receivedMessage.sender} {receivedMessage.message}
              </p>
              <p>{receivedMessage.time}</p> */}
              {chatMessages.map((msg) => {
                return <h1>{msg.message}</h1>;
              })}
              <InputAndButtonWrapper>
                {isOnline ? (
                  <>
                    <MessageBox onChange={(e) => setUserMessage(e.target.value)} />
                    <SendButton onClick={sendMessage}>
                      <p>Send</p>
                    </SendButton>
                  </>
                ) : (
                  <button id={bookGroup[0]?._id} onClick={joinBookClubChat}>
                    Click to Join
                  </button>
                )}
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
