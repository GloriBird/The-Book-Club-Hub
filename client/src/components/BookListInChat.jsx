import React, { useEffect, useRef, useState, useContext } from "react";
import styled from "styled-components";
import { GlobalContext } from "../context/GlobalContext";
import Carousel from "react-grid-carousel";

const BookListInChat = (props) => {
  const updateColumns = [
    {
      breakpoint: 1200,
      cols: 4,
    },
    {
      breakpoint: 990,
      cols: 3,
    },
  ];

  return (
    <Wrapper>
      <Title>{props?.currentBookClub}</Title>

      <CarouselStyle cols={1} rows={1} gap={1} loop showDots responsiveLayout={updateColumns}>
        {props?.readingList?.map((x) => (
          <Carousel.Item>
            <Books>
              <BookImgs src={`https://covers.openlibrary.org/b/olid/${x?.cover}-L.jpg`} alt="book Covers" />
              <p>{x?.title}</p>
            </Books>
          </Carousel.Item>
        ))}
      </CarouselStyle>
    </Wrapper>
  );
};

export default BookListInChat;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: 2px solid blue; */
  margin: 0 auto;
  width: 95%;
  justify-content: center;
`;

export const Title = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  /* border: 2px solid green; */
`;

const CarouselStyle = styled(Carousel)`
  z-index: 5;
`;

const Books = styled.div`
  margin: auto;
  text-align: center;
  /* border: 2px solid red; */
  /* height: 100%; */

  p {
    margin-top: 5%;
    font-weight: bold;
  }
`;

const BookImgs = styled.img`
  margin: 0 auto;
  border-radius: 10px;
  filter: drop-shadow(-5px 5px 3px #f1d591);

  &:hover {
    filter: drop-shadow(-10px 10px 3px #e8c97d);
    cursor: pointer;
  }
`;
