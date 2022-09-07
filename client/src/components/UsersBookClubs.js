import React, { useState, useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import styled from "styled-components";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export const UsersBookClubs = () => {
  const userData = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const { bookClubName } = useParams();
  const {
    state: { _id, username, email, bookClubs, hostingBookClubs },
    actions: { receiveCurrentUser, receiveNewUserName },
  } = userData;

  const navigateToChat = () => {
    navigate("/BookClubConversation");
  };

  return (
    <div>
      {hostingBookClubs?.map((group, idx) => (
        <List key={idx}>
          <button onClick={navigateToChat}>{group?.bookClubName}</button>
        </List>
      ))}
    </div>
  );
};

const List = styled.li`
  margin-bottom: 2000;
  list-style: none;
  z-index: -1000;
`;
