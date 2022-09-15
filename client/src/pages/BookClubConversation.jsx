import React, { useEffect, useRef, useState, useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import { SideBar } from "../components/SideBar";
import io from "socket.io-client";
import { useAuth0 } from "@auth0/auth0-react";

import BookListInChat from "../components/BookListInChat";
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
  ProfileImg,
  ProfileTime,
  FriendMsg,
  MsgArea,
  OtherMemberMsgArea,
  OtherProfileImg,
  JoinButton,
  OtherProfileTime,
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
  const { isLoading, isAuthenticated } = useAuth0();

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

  const sendMessage = () => {
    if (userMessage.replace(/\s+/g, "").trim().length > 0) {
      const msgData = { sender: username, message: userMessage, time: moment().calendar(), bookClubChat };
      socket.emit("send_message", msgData);
      setChatMessages((msgList) => [...msgList, msgData]);
      setUserMessage("");
    }
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

  const isUserInBookClub = bookGroup[0]?.members?.some((user) => username?.includes(user?.username));

  console.log(`isUserInBookClub:`, isUserInBookClub);
  return (
    <>
      {isLoading === false ? (
        <>
          {allBookClub !== undefined && (
            <CardGrid>
              <>
                <BookListInChat currentBookClub={bookGroup[0]?.bookClubName} readingList={bookGroup[0]?.readingList} />
                <ChatForm joined={isOnline}>
                  <Scrolling>
                    {chatMessages.map((msg, idx) => (
                      <Wrapper key={idx}>
                        {username === msg.sender ? (
                          <CurrentUser>
                            <MsgArea>
                              <p>{msg.message}</p>
                            </MsgArea>
                            <ProfileTime>
                              <ProfileImg
                                src={`https://avatars.dicebear.com/api/avataaars/${msg?.sender}.svg`}
                                alt=""
                              />
                              <p>{msg.time}</p>
                            </ProfileTime>
                          </CurrentUser>
                        ) : (
                          <OtherUser>
                            <OtherProfileTime>
                              <OtherProfileImg
                                src={`https://avatars.dicebear.com/api/avataaars/${msg?.sender}.svg`}
                                alt=""
                              />
                              <p>{msg.time}</p>
                            </OtherProfileTime>
                            <OtherMemberMsgArea>
                              <FriendMsg>{msg.message}</FriendMsg>
                            </OtherMemberMsgArea>
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
                        <SendButton onClick={sendMessage} disabled={userMessage.replace(/\s+/g, "").trim().length < 1}>
                          <p>Send</p>
                        </SendButton>
                      </>
                    ) : (
                      <JoinButton
                        id={bookGroup[0]?._id}
                        disabled={isUserInBookClub === undefined || isUserInBookClub === false}
                        className={username}
                        onClick={joinBookClubChat}
                      >
                        Click to Join
                      </JoinButton>
                    )}
                  </InputAndButtonWrapper>
                </ChatForm>
                <SideBar />
              </>
            </CardGrid>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default BookClubConversation;
