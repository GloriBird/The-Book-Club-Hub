import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
const moment = require("moment");

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const { isNewUser, setIsNewUser } = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  console.log(`user`, user);
  const joinedDate = moment().format("MMMM Do YYYY");

  const { email, nickname } = user;

  // useEffect(() => {
  //   const userData = { email, nickname };
  //   fetch("/create-profile", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(userData),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw Error(`It's broken`);
  //       }
  //       return response.json();
  //     })
  //     .then((result) => {
  //       console.log(`result:`, result);
  //       setIsNewUser(result);
  //     });
  // }, []);

  return (
    <Container>
      {isAuthenticated && <article>{user?.picture && <img src={user.picture} alt={user?.name} />}</article>}

      <ul>
        <p>{user.nickname}</p>
        <p>{user.email}</p>
        <p>Joined on: {joinedDate}</p>

        {/* {Object.keys(user).map((objKey, idx) => (
          <li key={idx}>
            {objKey}: {user[objKey]}
          </li>
        ))} */}
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
