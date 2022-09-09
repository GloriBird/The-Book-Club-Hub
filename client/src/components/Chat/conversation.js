import React from "react";
import { Conversation, ConversationImg, ConversationName } from "./conversation.styled";

const ChatConvo = () => {
  return (
    <Conversation>
      <ConversationImg
        src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        alt=""
      />
      <ConversationName>John Doe</ConversationName>
    </Conversation>
  );
};

export default ChatConvo;
