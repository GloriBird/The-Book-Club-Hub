import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import PopUpModal from "../components/PopUpModal";

import { CurrentUserContext } from "../context/CurrentUserContext";
import { useAuth0 } from "@auth0/auth0-react";
const moment = require("moment");

const BookDetails = () => {
  const { isAuthenticated } = useAuth0();
  const [isAdded, setIsAdded] = useState(false);
  const [bookDetails, setBookDetails] = useState(null);
  const [toggleModal, setToggleModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState("");

  const {
    state: { username, hostingBookClubs },
  } = useContext(CurrentUserContext);

  const { bookId, author, details } = useParams();

  useEffect(() => {
    const getCurrentBook = async () => {
      const book = await fetch(`https://openlibrary.org/works/${details}.json`);
      const selectedBook = await book.json();
      console.log(`selectedBook published:`, selectedBook?.first_publish_date);
      const getDetails = {
        title: selectedBook?.title,
        first_published: selectedBook?.first_publish_date === undefined ? "N/A" : selectedBook?.first_publish_date,
        cover: bookId,
        author: author,
        description: selectedBook?.description,
      };
      setBookDetails([getDetails]);
    };
    getCurrentBook();
  }, [bookId, author, details]);

  const getAuthor = author?.replace("%20", " ");

  const handleAddBook = (e) => {
    console.log(`e target id:`, e.target.id);
    e.preventDefault();
    setToggleModal(true);
    setIsAdded(true);
    setSelectedBook({
      added_by: username,
      title: e.target.id,
      author: getAuthor,
      first_published: bookDetails?.first_published === undefined && "N/A",
      cover: bookId,
      date_added: moment().format("LL"),
    });
  };

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
    }
  };

  return (
    <>
      {bookDetails !== null && (
        <div>
          {bookDetails?.map((x, idx) => (
            <div key={idx}>
              <Contain>
                <Wrapper>
                  <img src={`https://covers.openlibrary.org/b/olid/${x?.cover}-L.jpg`} alt={"book Covers"} />
                  <TextArea>
                    <h3>{x?.title}</h3>
                    <h3>{x?.author}</h3>
                  </TextArea>
                </Wrapper>
                <DescriptionArea>
                  <h2>Summary:</h2>
                  {x?.description === undefined ? (
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                      in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                  ) : (
                    <>{typeof x?.description === "object" ? <p>{x?.description?.value}</p> : <p>{x?.description}</p>}</>
                  )}
                  <PublishedData>
                    <h3>First Published:</h3> {x?.first_published}
                  </PublishedData>
                  <AddBookButton
                    disabled={hostingBookClubs === undefined || hostingBookClubs === null || isAuthenticated === false}
                    id={x?.title}
                    onClick={handleAddBook}
                  >
                    Add Book
                  </AddBookButton>
                </DescriptionArea>
                <PopUpModal trigger={toggleModal} setTrigger={setToggleModal}>
                  {hostingBookClubs?.map((x, idx) => (
                    <button disabled={isAuthenticated === false} key={idx} onClick={handleSelection}>
                      {x?.bookClubName}
                    </button>
                  ))}
                </PopUpModal>
              </Contain>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default BookDetails;

const Wrapper = styled.div`
  padding-right: 2%;
  img {
    border-radius: 10px;
    &:hover {
      filter: drop-shadow(-10px 10px 3px #e8c97d);
    }
  }
`;

const TextArea = styled.div`
  padding: 7% 5% 0 0;
  text-align: center;
`;

const DescriptionArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-items: flex-start;
  width: 45%;

  h2 {
    text-align: left;
    margin-bottom: 3%;
  }
`;

const Contain = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #fefbe7;
`;

const AddBookButton = styled.button`
  border-radius: 5px;
  width: 30%;
  padding: 10px 5px;
  border: none;
  margin-top: 3%;
  font-weight: bolder;
  font-size: 1rem;
  box-shadow: ${(props) => (props.disabled ? "#dcdcdc" : "0px -4px 7px #afc39e inset")};
  background-color: ${(props) => (props.disabled ? "#dcdcdc" : "#dae5d0")};
  color: ${(props) => (props.disabled ? "white" : "#3b3b3b")};

  &:hover {
    cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  }
`;

const PublishedData = styled.p`
  padding: 20px 0;

  span {
    font-weight: bolder;
  }
`;
