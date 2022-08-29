import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
const moment = require("moment");

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  console.log(`user`, user);
  const joinedDate = moment().format("MMMM Do YYYY");

  return (
    <Container>
      {isAuthenticated && <article>{user?.picture && <img src={user.picture} alt={user?.name} />}</article>}

      <ul>
        <p>{user.nickname}</p>
        <p>{user.email}</p>
        <p>Joined on: {joinedDate}</p>
      </ul>
    </Container>
  );
};

export default Profile;

const Container = styled.div`
  border: 2px solid blue;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  align-self: center;
  height: 100vh;

  img {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 2px solid blue;
  }

  ul {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  li {
    list-style: none;
    border: 2px solid red;
  }
`;
