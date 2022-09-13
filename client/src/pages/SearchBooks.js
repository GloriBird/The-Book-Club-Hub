import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import styled from "styled-components";
import Carousel from "react-grid-carousel";
import PopUpModal from "../components/PopUpModal";

import { CurrentUserContext } from "../context/CurrentUserContext";

const SearchBooks = () => {
  // const { searchBook } = useContext(GlobalContext);
  const [searchResult, setSearchResult] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const [numberResult, setNumberResult] = useState();
  const [toggleModal, setToggleModal] = useState(false);
  const userData = useContext(CurrentUserContext);
  const [isAdded, setIsAdded] = useState(false);
  const [selectedBook, setSelectedBook] = useState();
  const [receiveBookName, setReceiveBookName] = useState();

  const {
    state: { _id, username, email, hostingBookClubs },
  } = userData;

  const handleAddBook = (e) => {
    e.preventDefault();
    setToggleModal(true);

    setIsAdded(!isAdded);
    setReceiveBookName(e.target.id);

    setSelectedBook({
      // added_by: username,
      // title: weeksBooks[0]?.title,
      // author: weeksBooks[0]?.author[0],
      // first_published: weeksBooks[0]?.first_published,
      // book_img: `https://covers.openlibrary.org/b/olid/${weeksBooks[0]?.cover}-M.jpg`,
      // date_added: moment().format("LL"),
    });
  };

  useEffect(() => {
    const getResults = async () => {
      const searched = await fetch(`http://openlibrary.org/search.json?title=${searchResult}`);
      const response = await searched.json();
      // console.log(`response:`, response.docs);
      const loadResults = await response?.docs?.map((x) => {
        const allResults = {
          title: x?.title,
          first_published: x?.first_publish_year,
          cover: x?.cover_edition_key,
          author: x?.author_name,
          author_key: x?.author_key,
          isbn: x?.isbn,
        };
        return allResults;
      });
      // console.log(`loadResults:`, loadResults);
      setShowSearch(loadResults);
    };
    getResults();
  }, [searchResult]);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 200, itemsToShow: 2 },
    { width: 300, itemsToShow: 3 },
    { width: 400, itemsToShow: 4 },
    { width: 500, itemsToShow: 5 },
  ];

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

  return (
    <>
      <SearchInput
        type="text"
        className="Search"
        placeholder="Search"
        onChange={(e) => setSearchResult(e.target.value)}
      />
      <Wrapper>
        <CarouselStyle cols={6} rows={2} loop showDots breakPoints={breakPoints}>
          {showSearch?.length > 0 &&
            showSearch?.map(
              (x, idx) =>
                x?.cover !== undefined && (
                  <Carousel.Item key={idx}>
                    <Books>
                      <BookImgs src={`https://covers.openlibrary.org/b/olid/${x?.cover}-M.jpg`} alt={"book Covers"} />
                      <div>
                        <p>
                          <span>Title:</span> {x?.title}
                        </p>
                        <p>
                          <span>Author:</span> {x?.author?.[0]}
                        </p>
                        <p>
                          <span>First published:</span> {x?.first_published}
                        </p>
                        <AddBookButton
                          disabled={hostingBookClubs === undefined}
                          id={x?.title}
                          onClick={handleAddBook}
                          isClicked={isAdded}
                        >
                          Add Book
                        </AddBookButton>
                      </div>
                    </Books>
                  </Carousel.Item>
                )
            )}
        </CarouselStyle>
        <PopUpModal trigger={toggleModal} setTrigger={setToggleModal}>
          {hostingBookClubs?.map((x, idx) => (
            <button key={idx} onClick={handleSelection}>
              {x?.bookClubName}
            </button>
          ))}
        </PopUpModal>
      </Wrapper>
    </>
  );
};

export default SearchBooks;

const Wrapper = styled.div`
  height: 170vh;
  display: flex;
  flex-direction: column;

  padding: 2% 0;
  border: 12px solid green;
  background-color: var(--main-background-color);
`;

const CarouselStyle = styled(Carousel)`
  z-index: 5;
`;

const SearchInput = styled.input`
  color: blue;
  width: 300px;
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  align-self: center;
`;

const Books = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100%;
  div {
    padding: 20px;
  }

  p {
    padding-top: 2px;
  }

  span {
    font-weight: bold;
  }
`;

const BookImgs = styled.img`
  width: 200px;
  margin: auto;
  height: auto;
  border-radius: 10px;
  filter: drop-shadow(-5px 5px 3px #f1d591);

  &:hover {
    width: 205px;

    /* filter: drop-shadow(-10px 10px 3px #e8c97d); */
    cursor: pointer;
  }
`;

const AddBookButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 10px auto;
  width: 60%;

  &:focus {
    margin: 0 50px 30px 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    /* background-color: ${(props) => (props.isClicked ? "green" : "blue")}; */
  }
`;
