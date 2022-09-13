import React, { useEffect, useRef, useState, useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import { SideBar } from "../components/SideBar";
import io from "socket.io-client";
// import ScrollToBottom from "react-scroll-to-bottom";
import {
  CardGrid,
  ChatForm,
  MessageBox,
  InputAndButtonWrapper,
  SendButton,
  CurrentUser,
  OtherUser,
  Wrapper,
  Scrolling,
} from "./pageStyles/BookClubConversation.styled";
const moment = require("moment");

const socket = io.connect("http://localhost:8000");

const BookClubConversation = () => {
  const userData = useContext(CurrentUserContext);
  const { trendingBooks, allUsers, allBookClub, allUsernames, userInData, bookClubChat } = useContext(GlobalContext);
  const [userMessage, setUserMessage] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [onlineMembers, setOnlineMembers] = useState([]);

  const { bookClubID } = useParams();

  const {
    state: { username, hostingBookClubs },
    actions: { receiveUserOnline },
  } = userData;

  const bookGroup = hostingBookClubs !== null && allBookClub?.filter((x) => x?._id === bookClubID);

  const joinBookClubChat = (e) => {
    setIsOnline(true);
    receiveUserOnline(true);
    if (bookClubChat !== "") {
      socket.emit("join_chat", bookClubChat);
      socket.emit("online_members", username);
      setOnlineMembers(username);
    }
  };

  console.log(`onlineMembers:`, onlineMembers);

  const sendMessage = () => {
    const msgData = { sender: username, message: userMessage, time: moment().calendar(), bookClubChat };
    socket.emit("send_message", msgData);
    setChatMessages((msgList) => [...msgList, msgData]);
    setUserMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChatMessages((msgList) => [...msgList, data]);
    });
  }, [socket]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && userMessage.replace(/\s+/g, "").trim().length !== 0) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {allBookClub !== undefined && (
        <CardGrid>
          <>
            <p>{bookGroup[0]?.bookClubName}</p>
            <ChatForm>
              <Scrolling>
                {chatMessages.map((msg, idx) => (
                  <Wrapper key={idx}>
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
              </Scrolling>
              <InputAndButtonWrapper>
                {isOnline ? (
                  <>
                    <MessageBox
                      type="text"
                      value={userMessage}
                      onChange={(e) => setUserMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                    <SendButton onClick={sendMessage}>
                      <p>Send</p>
                    </SendButton>
                  </>
                ) : (
                  <button id={bookGroup[0]?._id} className={username} onClick={joinBookClubChat}>
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
