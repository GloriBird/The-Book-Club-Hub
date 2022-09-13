import React, { useEffect, useState, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { GlobalContext } from "../context/GlobalContext";
import { CurrentUserContext } from "../context/CurrentUserContext";
import Carousel from "react-grid-carousel";
import styled from "styled-components";
import PopUpModal from "../components/PopUpModal";
const moment = require("moment");

const CarouselTrendingBooks = () => {
  const { weeklyTrendingBooks, allUsers, allBookClub } = useContext(GlobalContext);
  const userData = useContext(CurrentUserContext);
  const [toggleModal, setToggleModal] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [selectedBook, setSelectedBook] = useState();
  const [receiveBookName, setReceiveBookName] = useState();
  const [showBookClubName, setShowBookClubName] = useState();

  const {
    state: { _id, username, email, hostingBookClubs },
  } = userData;

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

  const handleAddBook = (e) => {
    e.preventDefault();
    setToggleModal(true);
    const weeksBooks =
      weeklyTrendingBooks !== undefined && weeklyTrendingBooks?.filter((x) => x?.title.includes(e.target.id));
    setIsAdded(true);
    setReceiveBookName(e.target.id);
    // setShowBookClubName;
    setSelectedBook({
      added_by: username,
      title: weeksBooks[0]?.title,
      author: weeksBooks[0]?.author[0],
      first_published: weeksBooks[0]?.first_published,
      book_img: `https://covers.openlibrary.org/b/olid/${weeksBooks[0]?.cover}-M.jpg`,
      date_added: moment().format("LL"),
    });
  };
  console.log(`selectedBook:`, selectedBook);

  const handleSelection = (e) => {
    if (isAdded === true) {
      fetch("/add-books", {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ ...selectedBook, bookClubName: e.target.innerHTML }),
      }).then((response) => {
        setTimeout(() => {
          setToggleModal(false);
        }, 200);
        return response.json();
      });
    } else if (isAdded === false) {
      fetch("/remove-books", {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ ...selectedBook, bookClubName: e.target.innerHTML }),
      }).then((response) => {
        setTimeout(() => {
          setToggleModal(false);
        }, 200);
        return response.json();
      });
    }
  };

  // const bookAdded =
  //   receiveBookName !== undefined && hostingBookClubs?.[0]?.readingList?.some((x) => x?.title === receiveBookName);
  // const filterBooks = receiveBookName !== undefined && hostingBookClubs?.[0]?.readingList?.filter((x) => x?.title);
  // const titles = receiveBookName !== undefined && hostingBookClubs?.[0]?.readingList?.map(({ bookClubName }) => bookClubName);
  // const test = receiveBookName !== undefined && hostingBookClubs?.[0]?.readingList?.map((x) => x);

  // const test = titles?.map((y) => (y === "It Ends With Us" ? true : false));
  const test = () => {
    if (receiveBookName !== undefined) {
      hostingBookClubs?.forEach((x) => {
        x?.readingList?.forEach((y) => {
          console.log("titles:", y?.title);
        });
      });
    }
  };
  console.log(`test:`, test());

  return (
    <Wrapper>
      <CarouselStyle cols={5} rows={3} gap={10} loop showDots responsiveLayout={updateColumns}>
        {weeklyTrendingBooks?.map(
          (x, idx) =>
            x?.cover !== undefined && (
              <Carousel.Item key={idx}>
                <Books>
                  <BookImgs
                    src={`https://covers.openlibrary.org/b/olid/${x?.cover}-M.jpg`}
                    alt={"book Covers"}
                    isClicked={isAdded}
                  />
                  <p>{x?.title}</p>
                  <p>{x?.author}</p>
                  <AddBookButton
                    disabled={hostingBookClubs === undefined}
                    id={x?.title}
                    onClick={handleAddBook}
                    isClicked={isAdded}
                  >
                    Add Book
                  </AddBookButton>
                </Books>
              </Carousel.Item>
            )
        )}
      </CarouselStyle>
      <PopUpModal trigger={toggleModal} setTrigger={setToggleModal}>
        {hostingBookClubs?.map((x, idx) => (
          // <button key={idx} disabled={bookAdded && x?.bookClubName === "Toaster Book Club"} onClick={handleSelection}>
          <button key={idx} onClick={handleSelection}>
            {/* <button
            key={idx}
            disabled={titles?.map((y) => (y === x?.bookClubName ? true : false))}
            onClick={handleSelection}
          > */}
            {x?.bookClubName}
          </button>
        ))}
      </PopUpModal>
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
  background-color: var(--main-background-color);
`;

const Books = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  height: 100%;
`;

const AddBookButton = styled.button`
  margin: 0 80px 30px 80px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: #dae5d0;
  border-radius: 5px;
  border: none;
  height: 30px;
  align-items: center;
  box-shadow: 0px -4px 7px #afc39e inset;

  &:hover {
    cursor: pointer;
  }
`;

const BookImgs = styled.img`
  width: 200px;
  margin: 10px auto;
  height: auto;
  border-radius: 10px;
  filter: drop-shadow(-5px 5px 3px #f1d591);

  &:hover {
    width: 210px;

    filter: drop-shadow(-10px 10px 3px #e8c97d);
    cursor: pointer;
  }
`;
