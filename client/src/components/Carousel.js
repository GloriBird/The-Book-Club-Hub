import React, { useEffect, useState, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { GlobalContext } from "../context/GlobalContext";
import { CurrentUserContext } from "../context/CurrentUserContext";

// import Carousel from "react-elastic-carousel";
import Carousel from "react-grid-carousel";
import styled from "styled-components";
import PopUpModal from "../components/PopUpModal";

const CarouselTrendingBooks = () => {
  const { weeklyTrendingBooks } = useContext(GlobalContext);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 200, itemsToShow: 2 },
    { width: 300, itemsToShow: 3 },
    { width: 400, itemsToShow: 4 },
    { width: 500, itemsToShow: 5 },
  ];

  return (
    <Wrapper>
      <CarouselStyle cols={6} rows={3} gap={10} loop showDots breakPoints={breakPoints}>
        {weeklyTrendingBooks?.map(
          (x, idx) =>
            x?.cover !== undefined && (
              <Carousel.Item key={idx}>
                <Books>
                  <BookImgs src={`https://covers.openlibrary.org/b/olid/${x?.cover}-M.jpg`} alt={"book Covers"} />
                  <p>{x?.title}</p>
                  <p>{x?.author}</p>
                </Books>
              </Carousel.Item>
            )
        )}
      </CarouselStyle>
    </Wrapper>
  );
};

export default CarouselTrendingBooks;

const CarouselStyle = styled(Carousel)`
  z-index: 5;
`;

const Wrapper = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;

  padding: 2% 0;
  border: 12px solid green;
  background-color: var(--main-background-color);
`;

const Books = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  p {
    padding-top: 10px;
  }
`;

const BookImgs = styled.img`
  width: 200px;
  margin: auto;
  height: auto;
  border-radius: 10px;
  filter: drop-shadow(-5px 5px 3px #f1d591);

  &:hover {
    filter: drop-shadow(-10px 10px 3px #e8c97d);
    cursor: pointer;
  }
`;
