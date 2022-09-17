import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { GlobalContext } from "../context/GlobalContext";
import { useLocation, useNavigate } from "react-router-dom";
import Carousel from "react-grid-carousel";

export const BookList = () => {
  const userData = useContext(CurrentUserContext);
  const { allBookClub, setCurrentBookClubMembers, setBookClubChat } = useContext(GlobalContext);
  const navigate = useNavigate();

  const location = useLocation();

  const {
    state: { username },
  } = userData;

  const getURL = location.pathname;
  const getIdFromURL = getURL.split("/BookClub/")[1];
  const bookGroup = allBookClub !== null && allBookClub?.filter((x) => x?._id === getIdFromURL);

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

  const handleRemoveBook = (e) => {
    if (bookGroup[0]?.host === username) {
      fetch("/remove-books", {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ added_by: username, bookClubName: bookGroup[0]?.bookClubName, title: e.target.id }),
      }).then((response) => {
        return response.json();
      });
    }
    navigate(0);
  };

  return (
    <>
      {username !== undefined ? (
        <Wrapper>
          {bookGroup[0]?.readingList?.length > 0 &&
            (bookGroup[0]?.readingList?.length > 3 ? (
              <>
                <CarouselStyle cols={4} rows={2} loop showDots responsiveLayout={updateColumns}>
                  {bookGroup?.[0]?.readingList?.map((x, idx) => (
                    <Carousel.Item key={idx}>
                      <Books>
                        {bookGroup[0]?.host === username && (
                          <RemoveBook onClick={handleRemoveBook} id={x?.title}>
                            X
                          </RemoveBook>
                        )}
                        <BookImgs src={`https://covers.openlibrary.org/b/olid/${x?.cover}-M.jpg`} alt="test" />
                        <div>
                          {x?.title?.length > 20 ? (
                            <>
                              <Para>
                                <span>{idx + 1}:</span> {x?.title.substring(0, 20)}...
                              </Para>
                              <Para>
                                <span>Author: </span> {x?.author.substring(0, 20)}...
                              </Para>
                            </>
                          ) : (
                            <>
                              <Para>
                                <span>{idx + 1}:</span> {x?.title}
                              </Para>
                              <Para>
                                <span>Author: </span> {x?.author}
                              </Para>
                            </>
                          )}
                        </div>
                      </Books>
                    </Carousel.Item>
                  ))}
                </CarouselStyle>
              </>
            ) : (
              <>
                <CarouselStyle cols={1} rows={1} loop showDots responsiveLayout={updateColumns}>
                  {bookGroup?.[0]?.readingList?.map((x, idx) => (
                    <Carousel.Item key={idx}>
                      <SoloBooks>
                        {bookGroup[0]?.host === username && (
                          <RemoveSoloBook onClick={handleRemoveBook} id={x?.title}>
                            X
                          </RemoveSoloBook>
                        )}
                        <SoloImg src={`https://covers.openlibrary.org/b/olid/${x?.cover}-L.jpg`} alt="test" />
                        <div>
                          <Para>
                            <span>{idx + 1}:</span> {x?.title}
                          </Para>
                          <Para>
                            <span>Author: </span>
                            {x?.author}
                          </Para>
                        </div>
                      </SoloBooks>
                    </Carousel.Item>
                  ))}
                </CarouselStyle>
              </>
            ))}
        </Wrapper>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default BookList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 100vh;
`;

const CarouselStyle = styled(Carousel)`
  z-index: 5;
`;

const Para = styled.p`
  &:nth-child(1) {
    padding-top: 10%;
  }

  span {
    font-weight: bold;
  }
`;
const Books = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 100%;

  div {
    margin: auto;
  }
`;

const BookImgs = styled.img`
  margin: auto;
  height: 65%;
  width: 65%;
  border-radius: 10px;
  filter: drop-shadow(-5px 5px 3px #f1d591);
  &:hover {
    filter: drop-shadow(-10px 10px 3px #e8c97d);
    cursor: pointer;
  }
`;

const RemoveBook = styled.button`
  cursor: pointer;
  padding: 2% 3%;
  background-color: #ff7171;
  color: white;
  border-radius: 50px;
  margin: 3% 10% 0 0;
  border: none;
`;

const RemoveSoloBook = styled.button`
  cursor: pointer;
  padding: 2% 3%;
  background-color: #ff7171;
  color: white;
  border-radius: 50px;
  margin-bottom: 2%;
  border: none;
`;

const SoloBooks = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  width: fit-content;
  margin: auto;
  padding: 10px 10px;

  div {
    margin: auto;
  }
`;

const SoloImg = styled.img`
  margin: auto;
  border-radius: 10px;
  height: 65vh;
  filter: drop-shadow(-5px 5px 3px #f1d591);
  &:hover {
    filter: drop-shadow(-10px 10px 3px #e8c97d);
    cursor: pointer;
  }
`;
