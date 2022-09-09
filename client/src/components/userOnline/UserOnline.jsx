import { useEffect, useState } from "react";
import {
  ChatOnlineFriend,
  ChatOnlineImgContainer,
  ChatOnlineImg,
  ChatOnlineBadge,
  ChatOnlineName,
} from "./userOnline.styled";

const UserOnline = () => {
  return (
    <div>
      <ChatOnlineFriend>
        <ChatOnlineImgContainer>
          <ChatOnlineImg
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <ChatOnlineBadge></ChatOnlineBadge>
        </ChatOnlineImgContainer>
        <ChatOnlineName>John Doe</ChatOnlineName>
      </ChatOnlineFriend>
      <ChatOnlineFriend>
        <ChatOnlineImgContainer>
          <ChatOnlineImg
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <ChatOnlineBadge></ChatOnlineBadge>
        </ChatOnlineImgContainer>
        <ChatOnlineName>John Doe</ChatOnlineName>
      </ChatOnlineFriend>
      <ChatOnlineFriend>
        <ChatOnlineImgContainer>
          <ChatOnlineImg
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <ChatOnlineBadge></ChatOnlineBadge>
        </ChatOnlineImgContainer>
        <ChatOnlineName>John Doe</ChatOnlineName>
      </ChatOnlineFriend>
    </div>
  );
};

export default UserOnline;
