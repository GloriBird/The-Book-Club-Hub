import { Container, List } from "./pageStyles/BrowseBookClubs.styled";
import React, { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { GlobalContext } from "../context/GlobalContext";

const SearchForMembers = () => {
  const { allUsers } = useContext(GlobalContext);

  const userData = useContext(CurrentUserContext);

  const {
    state: { _id, username, email },
  } = userData;

  return (
    <Container>
      {allUsers?.map((x, idx) => (
        <List key={idx}>
          <img src={`https://robohash.org/${x?.username}`} alt="" />
          <p>{x?.username}</p>
        </List>
      ))}
    </Container>
  );
};

export default SearchForMembers;
