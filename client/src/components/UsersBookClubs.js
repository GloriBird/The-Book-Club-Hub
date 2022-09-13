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

  console.log(`bookClubs:`, bookClubs);

  const handleAccept = (e) => {
    // e.preventDefault();
    setIsAccepted(true);
    navigate(0);

    bookClubInvites.splice(e.target.id, 1);
    console.log(`e.target.id:`, e.target.id);
    fetch("/accept-reject-invite", {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ _id, username, bookClubName: e.target.id, accept: true, reject: false }),
    });
    // window.location.reload();
  };

  const handleDeny = (e) => {
    // e.preventDefault();
    setIsAccepted(false);
    fetch("/accept-reject-invite", {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ _id, username, bookClubName: e.target.id, accept: false, reject: true }),
    });
    bookClubInvites.splice(e.target.id, 1);
  };

  console.log(`username:`, username);
  return (
    <>
      {username !== null ? (
        <>
          {hostingBookClubs !== undefined && (
            <>
              <Title>Hosting</Title>
              <Wrapper>
                {hostingBookClubs !== undefined &&
                  hostingBookClubs?.map((group, idx) => (
                    <List key={idx} id={group?._id}>
                      <Link style={{ textDecoration: "none" }} reloadDocument to={`/BookClub/${group?._id}`}>
                        <BookClubImg
                          src={`https://avatars.dicebear.com/api/initials/${group?.bookClubName}.svg`}
                          alt=""
                        />
                        <p> {group?.bookClubName}</p>
                      </Link>
                    </List>
                  ))}
              </Wrapper>
            </>
          )}
          <MyBookClubs>My Book Clubs</MyBookClubs>
          <Wrapper>
            {bookClubs?.map((group, idx) => (
              <List key={idx} id={group?._id}>
                <Link reloadDocument to={`/BookClub/${group?._id}`}>
                  <p>{group?.bookClubName}</p>
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
              <List key={idx} id={group?._id}>
                <Link reloadDocument to={`/BookClub/${group?._id}`}>
                  <p> {group?.bookClubName}</p>
                </Link>
              </List>
            ))}
          </Wrapper>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

const Title = styled.h3`
  padding-top: 1%;
`;

const Wrapper = styled.ol`
  border: 2px solid red;
  width: 100vw;
  height: 20vh;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin-top: 0 10px;
  padding: 0;

  p {
    margin-top: 10px;
    text-align: center;
    text-decoration: none;
  }
`;

const List = styled.li`
  list-style: none;
  padding: 0.5% 1%;
  height: 100%;
  /* border: 2px solid blue; */
  display: flex;

  span {
    display: inline;
    flex-direction: row;
    justify-content: space-evenly;
    padding-right: 20px;
  }
  /*  */
`;

const BookClubImg = styled.img`
  border-radius: 5px;
  height: 100%;
`;

const MyBookClubs = styled.h3`
  padding-top: 3%;
`;
