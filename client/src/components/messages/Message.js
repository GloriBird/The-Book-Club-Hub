import React from "react";
import { format } from "timeago.js";
import {
  MessageWrapper,
  MessageTop,
  MessageImg,
  MessageText,
  MessageBottom,
  currentUser,
  otherText,
} from "./message.styled";

const Message = ({ message, own }) => {
  return (
    <>
      {own ? (
        <currentUser>
          <MessageTop>
            <img
              src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
            <messageText>{message.text}</messageText>
          </MessageTop>
          <messageBottom></messageBottom>
        </currentUser>
      ) : (
        <otherText>
          <MessageTop>
            <img
              src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
            <messageText>{message.text}</messageText>
          </MessageTop>
          <messageBottom></messageBottom>
        </otherText>
      )}
    </>
  );
};

export default Message;
