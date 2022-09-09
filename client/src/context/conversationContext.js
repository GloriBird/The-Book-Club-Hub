import React, { createContext, useState, useEffect, useContext } from "react";
import { GlobalContext } from "./GlobalContext";

export const ConversationContext = createContext();

export const ConversationProvider = ({ children }) => {
  const { allBookClub, currentBookClubMembers } = useContext(GlobalContext);
  const [conversations, setConversations] = useState([]);

  const createConversation = (member) => {
    setConversations((prevConversations) => {
      return [...prevConversations, { member, messages: [] }];
    });
  };

  const formattedConversations = conversations.map((conversation) => {
    const members = conversation.members.map((recipient) => {
      const sender = currentBookClubMembers.find((sender) => {
        return sender.username === recipient;
      });
      const name = (sender && sender.name) || recipient;
      return { username: recipient, name };
    });
    return { ...conversation, members };
  });

  //   console.log(`currentBookClubMembers:`, currentBookClubMembers);

  return (
    <ConversationContext.Provider value={{ conversations: formattedConversations, createConversation }}>
      {children}
    </ConversationContext.Provider>
  );
};
