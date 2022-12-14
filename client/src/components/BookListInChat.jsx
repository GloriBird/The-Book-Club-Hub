import React, { useEffect, useRef, useState, useContext } from "react";
import styled from "styled-components";
import { GlobalContext } from "../context/GlobalContext";
import Carousel from "react-grid-carousel";
import { IoClose } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../context/CurrentUserContext";

const BookListInChat = (props) => {
  const { allBookClub } = useContext(GlobalContext);

  const location = useLocation();
  const getURL = location.pathname;
  const getIdFromURL = getURL.split("/BookClubConversation/")[1];

  const bookGroup = allBookClub !== null && allBookClub?.filter((x) => x?._id === getIdFromURL);

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
      {bookGroup[0]?.readingList?.length > 0 && (
        <CarouselStyle cols={1} rows={1} gap={1} loop showDots responsiveLayout={updateColumns}>
          {props?.readingList?.map((x, idx) => (
            <Carousel.Item key={idx}>
              <Books>
                <BookImgs src={`https://covers.openlibrary.org/b/olid/${x?.cover}-L.jpg`} alt="book Covers" />

                <div>
                  <p>{x?.title}</p>
                  <p>{x?.author}</p>
                </div>
              </Books>
            </Carousel.Item>
          ))}
        </CarouselStyle>
      )}
    </Wrapper>
  );
};

export default BookListInChat;

export const Wrapper = styled.div`
  display: inline-block;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 95%;
  justify-content: center;
`;

export const Title = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const CarouselStyle = styled(Carousel)`
  z-index: 5;
`;

const Books = styled.div`
  margin: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;

  div {
    margin: auto;
  }

  p {
    margin: 5% auto;
    font-weight: bold;
    &:nth-child(1) {
      margin-top: 30px;
    }
  }
`;

const BookImgs = styled.img`
  margin: 0 auto;
  border-radius: 10px;
  filter: drop-shadow(-5px 5px 3px #f1d591);

  &:hover {
    filter: drop-shadow(-10px 10px 3px #e8c97d);
  }
`;
