// import { Container } from "./pageStyles/BrowseBooks.styled";
import React from "react";

import CarouselTrendingBooks from "../components/Carousel";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
const WeeklyTrendingBooks = () => {
  const { isLoading } = useAuth0();

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
