import React, { useEffect, useRef, useState, useContext } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { GlobalContext } from "../context/GlobalContext";
import { useLocation } from "react-router-dom";

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

  return (
    <>
      {username !== undefined ? (
        <Wrapper>
          {bookGroup?.[0]?.readingList?.map((x, idx) => (
            <div key={idx}>
              <img src={`https://covers.openlibrary.org/b/olid/${x?.cover}-M.jpg`} alt="test" />

              <p>{x?.title}</p>
            </div>
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
  justify-content: flex-start;
  border: 2px solid green;
`;

const MemberArea = styled.div`
  display: inline;
  flex-direction: column;
  border: 2px solid red;

  p {
    display: block;
    border: 2px solid blue;
  }
`;

// const BookImgs = styled.img`
//   width: 200px;
//   height: auto;
//   border-radius: 10px;
//   filter: drop-shadow(-5px 5px 3px #f1d591);

//   &:hover {
//     width: 210px;

//     filter: drop-shadow(-10px 10px 3px #e8c97d);
//     cursor: pointer;
//   }
// `;
