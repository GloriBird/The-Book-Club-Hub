import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import styled from "styled-components";
import { CurrentUserContext } from "../context/CurrentUserContext";
const moment = require("moment");

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const { allUsers } = useContext(GlobalContext);
  const userData = useContext(CurrentUserContext);

  const {
    state: { _id, username, email },
  } = userData;

  console.log(`_id:`, _id, `username:`, username, `email:`, email);

  const joinedDate = moment().format("MMMM Do YYYY");

  return (
    <Container>
      {username !== null && (
        <ul>
          <li>
            <img src={`https://avatars.dicebear.com/api/avataaars/${username}.svg`} alt="" />
          </li>
          <li>{username}</li>
          <li>{user?.email}</li>
          <li>Joined on: {joinedDate}</li>
        </ul>
      )}
    </Container>
  );
};

export default Profile;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  align-self: center;
  height: 100vh;

  ul {
    display: flex;
    flex-direction: column;
  }
  li {
    list-style: none;
    display: flex;
    justify-content: center;
  }
`;