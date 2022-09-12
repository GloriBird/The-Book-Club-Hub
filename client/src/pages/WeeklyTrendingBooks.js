// import { Container } from "./pageStyles/BrowseBooks.styled";
import React, { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { GlobalContext } from "../context/GlobalContext";
import CarouselTrendingBooks from "../components/Carousel";
const WeeklyTrendingBooks = () => {
  const userData = useContext(CurrentUserContext);
  const { trendingBooks, allUsers, isAllUsersLoading, allUsernames } = useContext(GlobalContext);

  const {
    state: { _id, username, email },
  } = userData;

  

  return (
    <div>
      <p>Browse Books</p>
      <CarouselTrendingBooks />
    </div>
  );
};

export default WeeklyTrendingBooks;
