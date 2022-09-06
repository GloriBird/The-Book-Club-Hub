import { Container } from "./pageStyles/BrowseBooks.styled";
import React, { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { GlobalContext } from "../context/GlobalContext";
import ChatConvo from "../components/Chat/conversation";

import {
  Messenger,
  ChatMenu,
  ChatMenuInput,
  ChatBox,
  ChatBoxWrapper,
  ChatBoxTop,
  ChatBoxBottom,
  ChatMessageInput,
  ChatSubmitButton,
  ChatOnline,
  ChatOnlineWrapper,
  ChatMenuWrapper,
  MainMenu,
  NoConversationText,
} from "./pageStyles/Chat.styled";

const Chat = () => {
  const userData = useContext(CurrentUserContext);
  const { trendingBooks, allUsers, isAllUsersLoading, allUsernames } = useContext(GlobalContext);

  const {
    state: { _id, username, email },
  } = userData;

  console.log(`_id:`, _id, `username:`, username, `email:`, email);

  return (
    <>
      <Messenger>
        <MainMenu>
          <ChatMenu>
            <ChatMenuWrapper>
              <ChatMenuInput placeholder="Search for Friends" />
              <ChatConvo />
              <ChatConvo />
              <ChatConvo />
              <ChatConvo />
            </ChatMenuWrapper>
            {/* <p>This is Chat Page</p> */}
          </ChatMenu>
          <ChatBox>
            <ChatBoxWrapper>
              <ChatBoxTop></ChatBoxTop>
              <ChatBoxBottom></ChatBoxBottom>
            </ChatBoxWrapper>
          </ChatBox>
          <ChatOnline></ChatOnline>
          <ChatOnlineWrapper>Online</ChatOnlineWrapper>
        </MainMenu>
      </Messenger>
    </>
  );
};

export default Chat;
