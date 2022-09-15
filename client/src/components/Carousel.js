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
  const { isLoading, isAuthenticated } = useAuth0();

  const {
    state: { _id, username, email, hostingBookClubs },
  } = userData;

  console.log(`hostingBookClubs:`, hostingBookClubs);

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
    setSelectedBook({
      added_by: username,
      title: weeksBooks[0]?.title,
      author: weeksBooks[0]?.author[0],
      first_published: weeksBooks[0]?.first_published,
      cover: weeksBooks[0]?.cover,
      date_added: moment().format("LL"),
    });
  };
  console.log(`selectedBook:`, selectedBook);

  const handleSelection = (e) => {
    console.log(`e.target.innerHTML:`, e.target.innerHTML);
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
    }
    // } else if (isAdded === false) {
    //   fetch("/remove-books", {
    //     method: "PATCH",
    //     headers: { "Content-type": "application/json" },
    //     body: JSON.stringify({ ...selectedBook, bookClubName: e.target.innerHTML }),
    //   }).then((response) => {
    //     setTimeout(() => {
    //       setToggleModal(false);
    //     }, 200);
    //     return response.json();
    //   });
    // }
  };

  console.log(`hostingBookClubs:`, hostingBookClubs);
  return (
    <>
      {isLoading === false ? (
        <Wrapper>
          <Title>
            <h1>This Week's Trending Books</h1>
          </Title>
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
                        disabled={
                          hostingBookClubs === undefined || hostingBookClubs === null || isAuthenticated === false
                        }
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
              <button disabled={isAuthenticated === false} key={idx} onClick={handleSelection}>
                {x?.bookClubName}
              </button>
            ))}
          </PopUpModal>
        </Wrapper>
      ) : (
        <Loading>
          <p>Loading...</p>
        </Loading>
      )}
    </>
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
  padding-bottom: 2%;
  background-color: var(--main-background-color);
`;

const Books = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: center;
  height: 100%;
`;

const AddBookButton = styled.button`
  margin: 0 80px 30px 80px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-radius: 5px;
  border: none;
  height: 30px;
  align-items: center;
  font-size: 1rem;
  font-weight: 700;
  box-shadow: ${(props) => (props.disabled ? "#dcdcdc" : "0px -4px 7px #afc39e inset")};
  background-color: ${(props) => (props.disabled ? "#dcdcdc" : "#dae5d0")};
  color: ${(props) => (props.disabled ? "white" : "#3b3b3b")};

  &:hover {
    cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  }
`;

const BookImgs = styled.img`
  width: 200px;
  margin: 0 auto;
  height: auto;
  border-radius: 10px;
  filter: drop-shadow(-5px 5px 3px #f1d591);

  &:hover {
    filter: drop-shadow(-10px 10px 3px #e8c97d);
    cursor: pointer;
  }
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 2rem;
    font-weight: bold;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 50px;
`;
