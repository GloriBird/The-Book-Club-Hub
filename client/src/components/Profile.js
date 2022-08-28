import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import styled from "styled-components";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <Container>
      {isAuthenticated && <article>{user?.picture && <img src={user.picture} alt={user?.name} />}</article>}
      <h2>{user?.name}</h2>
      <ul>
        {Object.keys(user).map((objKey, idx) => (
          <li key={idx}>
            {objKey}: {user[objKey]}
          </li>
        ))}
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
