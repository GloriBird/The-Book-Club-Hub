import React, { useEffect, useRef, useState, useContext } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { GlobalContext } from "../context/GlobalContext";
import { useLocation } from "react-router-dom";
import Carousel from "react-grid-carousel";

export const BookList = () => {
  const userData = useContext(CurrentUserContext);
  const { allBookClub, setCurrentBookClubMembers, setBookClubChat } = useContext(GlobalContext);

  const location = useLocation();

  const {
    state: { _id, username, email, bookClubs, onChat, hostingBookClubs },
  } = userData;

  const getURL = location.pathname;
  const getIdFromURL = getURL.split("/BookClub/")[1];
  const bookGroup = allBookClub !== null && allBookClub?.filter((x) => x?._id === getIdFromURL);

  const currentMembers =
    allBookClub !== undefined &&
    bookGroup[0]?.members.map((x) => {
      return x?.username;
    });

  useEffect(() => {
    setCurrentBookClubMembers(bookGroup[0]?.members);
    setBookClubChat(getIdFromURL);
  }, []);

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

  //test
  return (
    <>
      {username !== undefined ? (
        <Wrapper>
          <CarouselStyle cols={3} rows={2} loop showDots responsiveLayout={updateColumns}>
            {bookGroup?.[0]?.readingList?.map((x, idx) => (
              <Carousel.Item key={idx}>
                <Books>
                  <BookImgs src={`https://covers.openlibrary.org/b/olid/${x?.cover}-M.jpg`} alt="test" />

                  <Para>
                    <span>{idx + 1}:</span> {x?.title}
                  </Para>
                </Books>
              </Carousel.Item>
            ))}
          </CarouselStyle>
        </Wrapper>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default BookList;

const Wrapper = styled.div`
  /* border: 12px solid green; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CarouselStyle = styled(Carousel)`
  z-index: 5;
`;

const Books = styled.div`
  margin: auto;
  text-align: center;
`;
const BookImgs = styled.img`
  margin: auto;
  border-radius: 10px;
  filter: drop-shadow(-5px 5px 3px #f1d591);

  &:hover {
    filter: drop-shadow(-10px 10px 3px #e8c97d);
    cursor: pointer;
  }
`;

const Para = styled.p`
  padding-top: 20px;
`;
