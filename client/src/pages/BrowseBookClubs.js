import { Container, List, Add, Minus, Wrapper, BookClubInfo } from "./pageStyles/BrowseBookClubs.styled";
import React, { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { GlobalContext } from "../context/GlobalContext";

const BrowseBookClubs = () => {
  const { allUsers, allBookClub } = useContext(GlobalContext);
  const [isAdded, setIsAdded] = useState(false);

  const userData = useContext(CurrentUserContext);

  const {
    state: { _id, username, email, bookClubName, joinedDate, sub, hostingBookClubs },
  } = userData;

  // console.log(`allUsers:`, allUsers);
  const handleAddRequest = (e) => {
    setIsAdded(true);
    fetch("/request-to-join-book-club", {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ _id, username, email, joinedDate, sub, bookClubName: e.target.id }),
    }).then((response) => {
      return response.json();
    });
  };

  const handleRemoveRequest = (e) => {
    setIsAdded(false);
    fetch("/remove-request-to-join", {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ _id, username, email, joinedDate, sub, bookClubName: e.target.id }),
    }).then((response) => {
      return response.json();
    });
  };

  return (
    <Container>
      {allBookClub?.map((x, idx) => (
        <List key={idx}>
          <img src={`https://avatars.dicebear.com/api/initials/${x?.bookClubName}.svg`} alt="" />

          <Wrapper>
            <button id={x?.bookClubName} onClick={handleRemoveRequest}>
              -
            </button>
            <BookClubInfo>
              <p>{x?.bookClubName}</p>
              <p>Hosted by {x?.host}</p>
            </BookClubInfo>
            <button id={x?.bookClubName} onClick={handleAddRequest}>
              +
            </button>
          </Wrapper>
        </List>
      ))}
    </Container>
  );
};

export default BrowseBookClubs;
