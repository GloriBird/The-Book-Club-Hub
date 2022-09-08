import React, { useState, useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import styled from "styled-components";
import { Navigate, useNavigate, useParams, Link } from "react-router-dom";
import BookClub from "../pages/BookClub";
import { GlobalContext } from "../context/GlobalContext";

export const UsersBookClubs = () => {
  const userData = useContext(CurrentUserContext);
  const { allUsers, allBookClub } = useContext(GlobalContext);
  const [isAccepted, setIsAccepted] = useState();

  const navigate = useNavigate();
  const {
    state: { _id, username, email, bookClubs, bookClubName, bookClubInvites, hostingBookClubs, bookClubsToJoinPending },
    actions: { receiveCurrentUser, receiveNewUserName },
  } = userData;

  // console.log(`hostingBookClubs`);
  console.log(`bookClubs:`, bookClubs);

  const handleAccept = (e) => {
    // e.preventDefault();
    setIsAccepted(true);
    bookClubInvites.splice(e.target.id, 1);
    console.log(`e.target.id:`, e.target.id);
    fetch("/accept-reject-invite", {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ _id, username, bookClubName: e.target.id, accept: true, reject: false }),
    });
  };

  const handleDeny = (e) => {
    // e.preventDefault();
    setIsAccepted(false);
    bookClubInvites.splice(e.target.id, 1);
    fetch("/accept-reject-invite", {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ _id, username, bookClubName: e.target.id, accept: false, reject: true }),
    });
  };

  return (
    <>
      <Title>Hosting</Title>
      <Wrapper>
        {hostingBookClubs?.map((group, idx) => (
          <List key={idx} id={group?._id}>
            <Link reloadDocument to={`/BookClub/${group?._id}`}>
              <p> {group?.bookClubName}</p>
            </Link>
          </List>
        ))}
      </Wrapper>
      <Title>My Book Clubs</Title>
      <Wrapper>
        {bookClubs?.map((group, idx) => (
          <List key={idx} id={group?._id}>
            <Link reloadDocument to={`/BookClub/${group?._id}`}>
              <p> {group?.bookClubName}</p>
            </Link>
          </List>
        ))}
      </Wrapper>
      <Title>Book Club Invites</Title>
      <Wrapper>
        {bookClubInvites?.map(
          (group, idx) => (
            // isAccepted !== null && (
            <List key={idx} id={idx}>
              <p> {group?.bookClubName}</p>
              <button id={group?.bookClubName} onClick={handleAccept}>
                Accept
              </button>
              <button id={group?.bookClubName} onClick={handleDeny}>
                Deny
              </button>
            </List>
          )
          // )
        )}
      </Wrapper>
      <Title>My Book Club Requests</Title>
      <Wrapper>
        {bookClubsToJoinPending?.map((group, idx) => (
          <List key={idx}>
            <p> {group?.bookClubName}</p>
          </List>
        ))}
      </Wrapper>
    </>
  );
};

const Title = styled.h3`
  padding-top: 5%;
`;

const Wrapper = styled.ol`
  display: flex;
  flex-direction: column;
  border: 2px solid red;
  width: 100vw;
  height: 20vh;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const List = styled.li`
  list-style: none;
  /* border: 2px solid green; */
  padding: 0 2%;
  border: 2px solid blue;

  span {
    display: inline;
    flex-direction: row;
    justify-content: space-evenly;
    padding-right: 20px;
  }
  /*  */
`;
