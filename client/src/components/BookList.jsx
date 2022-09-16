import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { GlobalContext } from "../context/GlobalContext";
import { useLocation, useNavigate } from "react-router-dom";
import Carousel from "react-grid-carousel";
import { IoClose } from "react-icons/io5";

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
          {bookGroup[0]?.readingList?.length > 0 && (
            <CarouselStyle cols={4} rows={2} loop showDots responsiveLayout={updateColumns}>
              {bookGroup?.[0]?.readingList?.map((x, idx) => (
                <Carousel.Item key={idx}>
                  <Books>
                    {bookGroup[0]?.host === username && <RemoveBook onClick={handleRemoveBook} id={x?.title} />}
                    <BookImgs src={`https://covers.openlibrary.org/b/olid/${x?.cover}-M.jpg`} alt="test" />
                    <div>
                      <Para>
                        <span>{idx + 1}:</span> {x?.title}
                      </Para>
                    </div>
                  </Books>
                </Carousel.Item>
              ))}
            </CarouselStyle>
          )}
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
  align-items: center;
  width: 100%;
  height: 100%;
`;

const CarouselStyle = styled(Carousel)`
  z-index: 5;
`;

const Para = styled.p`
  padding-top: 20px;
`;
const Books = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  div {
    margin: auto;
  }
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

const RemoveBook = styled(IoClose)`
  cursor: pointer;
  width: 6%;
  height: auto;
  background-color: #ff7171;
  color: white;
  border-radius: 50px;
  margin-right: 12%;
`;
