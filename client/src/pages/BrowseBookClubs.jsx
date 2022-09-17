import { Link, useNavigate } from "react-router-dom";

import {
  Container,
  List,
  Wrapper,
  BookClubInfo,
  RemoveButton,
  AddButton,
  Loading,
} from "./pageStyles/BrowseBookClubs.styled";
import React, { useState, useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { GlobalContext } from "../context/GlobalContext";
import { useAuth0 } from "@auth0/auth0-react";

const BrowseBookClubs = () => {
  const { allBookClub } = useContext(GlobalContext);
  const [isAdded, setIsAdded] = useState(false);
  const { isLoading, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const userData = useContext(CurrentUserContext);

  const {
    state: { _id, username, email, joinedDate, sub },
  } = userData;

  const handleAddRequest = (e) => {
    setIsAdded(true);
    console.log(`isAdded:`, isAdded);
    console.log(`_id:`, _id);
    console.log(`username:`, username);
    console.log(`email:`, email);
    console.log(`joinedDate:`, joinedDate);
    console.log(`sub:`, sub);
    console.log(`bookClubName:`, e.target.id);

    fetch("/request-to-join-book-club", {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ _id, username, email, joinedDate, sub, bookClubName: e.target.id }),
    }).then((response) => {
      return response.json();
    });
    // navigate(0);
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
    // navigate(0);
  };

  return (
    <>
      {isLoading === false ? (
        <>
          <Container>
            {allBookClub?.map((x, idx) => (
              <List key={idx}>
                <Link style={{ textDecoration: "none" }} reloadDocument to={`/BookClub/${x?._id}`}>
                  <img src={`https://avatars.dicebear.com/api/initials/${x?.bookClubName}.svg`} alt="" />
                </Link>
                <Wrapper>
                  <RemoveButton disabled={isAuthenticated === false} id={x?.bookClubName} onClick={handleRemoveRequest}>
                    -
                  </RemoveButton>
                  <BookClubInfo>
                    <p>{x?.bookClubName}</p>
                    <p>Hosted by {x?.host}</p>
                  </BookClubInfo>
                  <AddButton disabled={isAuthenticated === false} id={x?.bookClubName} onClick={handleAddRequest}>
                    +
                  </AddButton>
                </Wrapper>
              </List>
            ))}
          </Container>
        </>
      ) : (
        <Loading>
          <p>Loading...</p>
        </Loading>
      )}
    </>
  );
};

export default BrowseBookClubs;
