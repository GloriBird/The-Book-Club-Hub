// import { Container } from "./pageStyles/BrowseBooks.styled";
import React, { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { GlobalContext } from "../context/GlobalContext";
import CarouselTrendingBooks from "../components/Carousel";
const BrowseBooks = () => {
  const userData = useContext(CurrentUserContext);
  const { trendingBooks, allUsers, isAllUsersLoading, allUsernames } = useContext(GlobalContext);

  const {
    state: { _id, username, email },
  } = userData;

  console.log(`_id:`, _id, `username:`, username, `email:`, email);

  return (
    <div>
      <p>Browse Books</p>
      <CarouselTrendingBooks />
    </div>
  );
};

export default BrowseBooks;
