import { Container, List } from "./pageStyles/BrowseBookClubs.styled";
import React, { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { GlobalContext } from "../context/GlobalContext";

const BrowseBookClubs = () => {
  const { allBookClub } = useContext(GlobalContext);

  const userData = useContext(CurrentUserContext);

  const {
    state: { _id, username, email },
  } = userData;

  console.log(`allBookClub`, allBookClub);

  return (
    <Container>
      {allBookClub?.map((x, idx) => (
        <List key={idx}>
          <img src={`https://robohash.org/${x?.bookClubName}`} alt="" />
          <p>{x?.bookClubName}</p>
          <p>Hosted by {x?.host}</p>
        </List>
      ))}
    </Container>
  );
};

export default BrowseBookClubs;
