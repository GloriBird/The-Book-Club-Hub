import React from "react";
import { Conversation, ConversationImg, ConversationName } from "./conversation.styled";

const ChatConvo = () => {
  return (
    <Conversation>
      <ConversationImg
        src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
      />
      <ConversationName>John Doe</ConversationName>
    </Conversation>
  );
};

export default ChatConvo;
