import React from "react";
// import { format } from "timeago.js";
import {
  MessageWrapper,
  MessageTop,
  MessageImg,
  MessageText,
  MessageBottom,
  Wrapper,
  CurrentUser,
  OtherText,
} from "./message.styled";

const MessageChat = ({ message, own }) => {
  return (
    <>
      {own ? (
        <CurrentUser>
          <MessageTop>
            <MessageImg
              src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
            <MessageText>
              <p>Message text</p>
              {/* {message.text} */}
            </MessageText>
          </MessageTop>
          <messageBottom>1 hour ago</messageBottom>
        </CurrentUser>
      ) : (
        <OtherText>
          <MessageTop>
            <MessageImg
              src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
            <messageText>hello</messageText>
          </MessageTop>
          <MessageBottom></MessageBottom>
        </OtherText>
      )}
    </>
  );
};

export default MessageChat;
