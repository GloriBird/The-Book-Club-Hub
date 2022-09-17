import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "../context/CurrentUserContext";
const moment = require("moment");

const Profile = () => {
  const { user } = useAuth0();
  const userData = useContext(CurrentUserContext);

  const {
    state: { username },
  } = userData;

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
