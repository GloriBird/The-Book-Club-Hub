import { Container } from "./pageStyles/BrowseBookClubs.styled";
import React, { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

const BrowseBookClubs = () => {
  const userData = useContext(CurrentUserContext);

  const {
    state: { _id, username, email },
  } = userData;

  console.log(`_id:`, _id, `username:`, username, `email:`, email);

  return (
    <Container>
      <p>Browse Book Clubs</p>
    </Container>
  );
};

export default BrowseBookClubs;
