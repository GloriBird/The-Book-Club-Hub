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
  CurrentUser,
  OtherUser,
  Wrapper,
} from "./pageStyles/BookClubConversation.styled";
const moment = require("moment");

const socket = io.connect("http://localhost:8000");

const BookClubConversation = () => {
  const userData = useContext(CurrentUserContext);
  const { trendingBooks, allUsers, allBookClub, allUsernames, userInData, bookClubChat } = useContext(GlobalContext);
  const [userMessage, setUserMessage] = useState("");
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
    const msgData = { sender: username, message: userMessage, time: moment().calendar(), bookClubChat };
    socket.emit("send_message", msgData);
    setChatMessages((msgList) => [...msgList, msgData]);
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("data:", data);
      setChatMessages((msgList) => [...msgList, data]);
    });
  }, [socket]);

  return (
    <>
      {allBookClub !== undefined && (
        <CardGrid>
          <>
            <p>{bookGroup[0]?.bookClubName}</p>
            <ChatForm>
              {chatMessages.map((msg, idx) => (
                // <div key={idx} id={username === msg.sender ? "currentUser" : "otherUser"}>
                <Wrapper>
                  {username === msg.sender ? (
                    <CurrentUser>
                      <p>
                        {msg.sender}: {msg.message}
                      </p>
                      <p>{msg.time}</p>
                    </CurrentUser>
                  ) : (
                    <OtherUser>
                      <p>
                        {msg.sender}: {msg.message}
                      </p>
                      <p>{msg.time}</p>
                    </OtherUser>
                  )}
                </Wrapper>
              ))}
              <InputAndButtonWrapper>
                {isOnline ? (
                  <>
                    <MessageBox
                      onChange={(e) => setUserMessage(e.target.value)}
                      onKeyPress={(e) => {
                        e.key === "Enter" && sendMessage();
                      }}
                    />
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
