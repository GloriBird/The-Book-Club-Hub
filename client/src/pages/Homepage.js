import React, { useEffect, useState, useContext } from "react";
import { Container } from "./pageStyles/Homepage.styled";
import { GlobalContext } from "../context/GlobalContext";
import Carousel from "react-elastic-carousel";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const { trendingBooks, allUsers } = useContext(GlobalContext);
  const { user } = useAuth0();

  // const userInData = allUsers?.some((existingUser) => existingUser?.email.includes(user?.email));

  useEffect(() => {
    if (user !== undefined) {
      const { email, nickname } = user;
      let username = nickname;
      const newData = { username, email };
      fetch("/create-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });
    }
  }, [user]);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 200, itemsToShow: 2 },
    { width: 300, itemsToShow: 3 },
    { width: 400, itemsToShow: 4 },
    { width: 500, itemsToShow: 5 },
  ];

  return (
    <div>
      <Carousel breakPoints={breakPoints}>
        {trendingBooks?.map((x, idx) => (
          <List key={idx}>
            <img src={`https://covers.openlibrary.org/b/olid/${x.cover_edition_key}-M.jpg`} alt={"book Covers"} />
            <p>{x?.title}</p>
            <p>{x.author_name}</p>
          </List>
        ))}
        <></>
      </Carousel>
    </div>
  );
};

export default App;

const List = styled.li`
  list-style: none;
`;
