import { Container } from "./pageStyles/BrowseBookClubs.styled";
import React, { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

const BrowseBookClubs = () => {
  const userData = useContext(CurrentUserContext);

  const {
    state: { username },
  } = userData;

  console.log(`username:`, username);
  return (
    <Container>
      <p>Browse Book Clubs</p>
    </Container>
  );
};

export default BrowseBookClubs;
