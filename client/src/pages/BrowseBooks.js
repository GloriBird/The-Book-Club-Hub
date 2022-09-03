import { Container } from "./pageStyles/BrowseBooks.styled";
import React, { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

const BrowseBooks = () => {
  const userData = useContext(CurrentUserContext);

  const {
    state: { username },
  } = userData;

  console.log(`username:`, username);

  return (
    <Container>
      <p>Browse Books</p>
    </Container>
  );
};

export default BrowseBooks;
