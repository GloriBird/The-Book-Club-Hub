import styled from "styled-components";
import React, { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { Navigate, useNavigate, useParams, Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const BookClubPage = () => {
  const userData = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const { bookClubID } = useParams();
  const [getBookClub, setGetBookClub] = useState();
  const [pending, setPending] = useState(false);

  const { trendingBooks, allUsers, allBookClub, allUsernames, userInData, sub } = useContext(GlobalContext);

  const {
    state: { _id, username, email, bookClubs, hostingBookClubs, bookClubsToJoinPending, bookClubInvites, joinedDate },
  } = userData;

  const bookGroup = hostingBookClubs !== null && allBookClub?.filter((x) => x?._id === bookClubID);
  // console.log(`bookClubsToJoinPending:`, bookClubsToJoinPending[0]?.bookClubName);
  const currentUser = [
    {
      username,
      _id,
    },
  ];

  // console.log(`bookClubsToJoinPending:`, bookClubsToJoinPending);
  const bookClubAlreadyPending =
    bookClubsToJoinPending !== undefined &&
    bookClubsToJoinPending?.some((request) => request.bookClubName === bookGroup[0]?.bookClubName);

  console.log(`bookClubAlreadyPending:`, bookClubAlreadyPending);

  const handleLeaveGroup = () => {
    fetch("/remove-member", {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        _id: bookGroup[0]?._id,
        host: bookGroup[0]?.host,
        bookClubName: bookGroup[0]?.bookClubName,
        member: currentUser,
      }),
    }).then((response) => {
      return response.json();
    });
    navigate(0);
  };

  const handleJoinRequest = (e) => {
    setPending(true);
    e.preventDefault();
    fetch("/request-to-join-book-club", {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        joinedDate: joinedDate,
        _id: _id,
        bookClubName: bookGroup[0]?.bookClubName,
        username: username,
        email: email,
        sub: sub,
      }),
    }).then((response) => {
      return response.json();
    });
  };

  const isAMember = bookClubs !== null && bookClubs?.some((x) => x?.bookClubName === bookGroup[0]?.bookClubName);
  const isAHost =
    hostingBookClubs !== null && hostingBookClubs?.some((x) => x?.bookClubName === bookGroup[0]?.bookClubName);

  // console.log(`bookClubs:`, isAMember);
  // console.log(`isAHost:`, isAHost);
  const handleAcceptUser = (e) => {
    bookGroup[0]?.joinRequestFromUsers.splice(e.target.id, 1);
    fetch("/accept-reject-user-request", {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        _id,
        username: e.target.id,
        bookClubName: bookGroup[0]?.bookClubName,
        accept: true,
        reject: false,
      }),
    });
    navigate(0);
  };

  const handleDenyUser = (e) => {
    bookGroup[0]?.joinRequestFromUsers.splice(e.target.id, 1);
    fetch("/accept-reject-user-request", {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        _id,
        username: e.target.id,
        bookClubName: bookGroup[0]?.bookClubName,
        accept: false,
        reject: true,
      }),
    });
    navigate(0);
  };

  console.log(`is pending:`, pending);

  return (
    <Wrapper>
      <p>{bookGroup[0]?.bookClubName}</p>
      <p>Reading List{bookGroup[0]?.ReadingList}</p>
      <div>
        {bookGroup[0]?.members.map((x, idx) => {
          return (
            <List key={idx}>
              <p>Members: {x?.username}</p>
            </List>
          );
        })}
      </div>
      {(isAMember === true || isAHost === true) && (
        <>
          <div>
            <h3>Pending Invites</h3>
            {bookGroup[0]?.pendingMembers.map((x, idx) => {
              return (
                <List key={idx}>
                  <p>Pending Members: {x?.username}</p>
                </List>
              );
            })}
          </div>
          <div>
            <h3>Requests from others</h3>
            {bookGroup[0]?.joinRequestFromUsers.map((x, idx) => (
              <List key={idx} id={idx}>
                <p>Pending Members: {x?.username}</p>
                <button id={x?.username} onClick={handleAcceptUser}>
                  Accept
                </button>
                <button id={x?.username} onClick={handleDenyUser}>
                  Deny
                </button>
              </List>
            ))}
          </div>
          <div>
            <h3>Book Club Invites</h3>
            {bookClubInvites?.map((x, idx) => {
              return (
                <List key={idx}>
                  <p>Book Clubs: {x?.bookClubName}</p>
                </List>
              );
            })}
          </div>
          <h3>Chat</h3>
          <Link to={`/BookClubConversation/${bookGroup[0]?._id}`}>
            <p> {bookGroup[0]?.bookClubName}</p>
          </Link>
        </>
      )}
      <div>
        {bookClubs !== null &&
          bookClubsToJoinPending !== null &&
          (isAMember === false ? (
            <button
              disabled={bookGroup[0]?.host === username || bookClubAlreadyPending || pending}
              onClick={handleJoinRequest}
            >
              {pending || bookClubAlreadyPending ? <p>Awaiting host response...</p> : <p>Join Book Club</p>}
            </button>
          ) : (
            <button disabled={bookGroup[0]?.host === username} onClick={handleLeaveGroup}>
              Leave Book Club
            </button>
          ))}
      </div>
    </Wrapper>
  );
};

export default BookClubPage;

const Wrapper = styled.div`
  height: 80vh;
  border: 2px solid red;
`;

const List = styled.li`
  list-style: none;
`;
