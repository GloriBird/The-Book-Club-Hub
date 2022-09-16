// import { Container } from "./pageStyles/BrowseBooks.styled";
import React, { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { GlobalContext } from "../context/GlobalContext";
import CarouselTrendingBooks from "../components/Carousel";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import BookDetails from "./BookDetails";
const WeeklyTrendingBooks = () => {
  const userData = useContext(CurrentUserContext);
  const { trendingBooks, allUsers, isAllUsersLoading, allUsernames } = useContext(GlobalContext);
  const { user, isLoading, isAuthenticated } = useAuth0();

  return (
    <>
      {isLoading === false ? (
        <div>
          <CarouselTrendingBooks />
        </div>
      ) : (
        <div>
          <Title>
            <h1>Loading</h1>
          </Title>
        </div>
      )}
    </>
  );
};

export default WeeklyTrendingBooks;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 50px;
`;
