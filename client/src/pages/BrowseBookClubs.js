import { Container } from "./pageStyles/BrowseBooks.styled";
import React, { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

const BrowseBookClubs = () => {
  const userData = useContext(CurrentUserContext);

  const {
    state: { _id, username, email },
  } = userData;

  console.log(`_id:`, _id, `username:`, username, `email:`, email);

  return (
    <div>
      <p>Browse Book Clubs</p>
    </div>
  );
};

export default BrowseBookClubs;
