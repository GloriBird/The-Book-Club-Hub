import React, { useEffect, useState, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { GlobalContext } from "../context/GlobalContext";
import { CurrentUserContext } from "../context/CurrentUserContext";

import Carousel from "react-elastic-carousel";
import styled from "styled-components";
import PopUpModal from "../components/PopUpModal";

const CarouselTrendingBooks = () => {
  const { trendingBooks } = useContext(GlobalContext);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 200, itemsToShow: 2 },
    { width: 300, itemsToShow: 3 },
    { width: 400, itemsToShow: 4 },
    { width: 500, itemsToShow: 5 },
  ];

  return (
    <Wrapper>
      <CarouselStyle breakPoints={breakPoints}>
        {trendingBooks?.map((x, idx) => (
          <List key={idx}>
            <img src={`https://covers.openlibrary.org/b/olid/${x.cover_edition_key}-M.jpg`} alt={"book Covers"} />
            <p>{x?.title}</p>
            <p>{x.author_name}</p>
          </List>
        ))}
      </CarouselStyle>
    </Wrapper>
  );
};

export default CarouselTrendingBooks;

const CarouselStyle = styled(Carousel)`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  border: 10px solid green;

  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${CarouselStyle} {
    border: 10px solid red;
  }
`;

const List = styled.li`
  margin-bottom: 2000;
  list-style: none;
  z-index: -1000;
`;
