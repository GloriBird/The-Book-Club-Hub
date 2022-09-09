import styled from "styled-components";
import React, { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { Navigate, useNavigate, useParams, Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const BookClubPage = () => {
  const userData = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const { bookClubID } = useParams();
  const [pending, setPending] = useState(false);
  const [getId, setGetId] = useState();
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
    bookGroup !== undefined &&
    bookClubsToJoinPending?.some((request) => request?.bookClubName === bookGroup[0]?.bookClubName);

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
  const isAMember =
    bookClubs !== null &&
    bookGroup !== undefined &&
    bookClubs?.some((x) => x?.bookClubName === bookGroup[0]?.bookClubName);

  const isAHost =
    bookClubs !== null &&
    bookGroup !== undefined &&
    hostingBookClubs?.some((x) => x?.bookClubName === bookGroup[0]?.bookClubName);

  console.log(`bookClubs:`, bookClubs);
  const handleAcceptUser = (e) => {
    bookGroup[0]?.joinRequestFromUsers.splice(e.target.id, 1);
    console.log(`remove:`, bookGroup[0]?.joinRequestFromUsers.splice(e.target.id, 1));
    console.log(e.target.className, e.target.id, bookGroup[0]?.bookClubName);

    fetch("/accept-reject-user-request", {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        _id: e.target.className,
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
        _id: e.target.className,
        username: e.target.id,
        bookClubName: bookGroup[0]?.bookClubName,
        accept: false,
        reject: true,
      }),
    });
    navigate(0);
  };

  const handleRemoveMember = (e) => {
    e.preventDefault();
    navigate(0);
    fetch("/remove-member", {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        _id: bookGroup[0]?._id,
        bookClubName: bookGroup[0]?.bookClubName,
        host: bookGroup[0]?.host,
        member: [{ username: e.target.id, _id: e.target.className }],
      }),
    });
  };
  // console.log(`hostingBookClubs:`, hostingBookClubs);
  // console.log(`bookGroup:`, bookGroup);

  return (
    <Wrapper>
      {bookGroup !== undefined && hostingBookClubs !== null && (
        <>
          <p>{bookGroup[0]?.bookClubName}</p>
          <p>Hosted by {bookGroup[0]?.host}</p>
          <p>Reading List{bookGroup[0]?.ReadingList}</p>
          <div>
            <h3>Members</h3>
            {bookGroup[0]?.members.map((x, idx) => {
              return (
                <List key={idx}>
                  {bookGroup[0]?.host !== x?.username && <p> {x?.username}</p>}

                  {bookGroup[0]?.host === username && bookGroup[0]?.host !== x?.username && (
                    <button id={x?.username} className={x?._id} onClick={handleRemoveMember}>
                      Remove Member
                    </button>
                  )}
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
                    {bookGroup[0]?.host === username && (
                      <>
                        <button id={x?.username} className={x?._id} onClick={handleAcceptUser}>
                          Accept
                        </button>
                        <button id={x?.username} className={x?._id} onClick={handleDenyUser}>
                          Deny
                        </button>
                      </>
                    )}
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
        </>
      )}
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
