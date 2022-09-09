import React, { createContext, useState, useEffect } from "react";

export const conversationContext = createContext(null);

export const conversationProvider = ({ children }) => {
  const [chatMessage, setChatMessage] = useState([]);

  //   const createConversation = (members) => {
  //     setChatMessage((prevChatMessage) => {
  //       return [...prevChatMessage, { members, messages: [] }];
  //     });
  //   };

  return (
    <conversationContext.Provider value={{ setChatMessage, chatMessage }}>{children}</conversationContext.Provider>
  );
};
