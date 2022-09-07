import styled from "styled-components";
import React, { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { Navigate, useNavigate, useParams, Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const BookClubPage = () => {
  const { bookClubID } = useParams();
  const [getBookClub, setGetBookClub] = useState();
  const { trendingBooks, allUsers, allBookClub, allUsernames, userInData } = useContext(GlobalContext);

  const userData = useContext(CurrentUserContext);

  const {
    state: { _id, username, email, bookClubs, hostingBookClubs },
    actions: { receiveCurrentUser, receiveNewUserName },
  } = userData;

  const bookGroup = hostingBookClubs !== null && allBookClub?.filter((x) => x?._id === bookClubID);

  console.log(`bookClubName:`, bookGroup);

  return (
    <Wrapper>
      <p>{bookGroup[0]?.bookClubName}</p>
      <p>Reading List{bookGroup[0]?.ReadingList}</p>
      <div>
        {bookGroup[0]?.members.map((x) => {
          return (
            <List>
              <p>Members: {x?.username}</p>
            </List>
          );
        })}
      </div>
      <div>
        <h3>Pending Invites</h3>
        {bookGroup[0]?.pendingMembers.map((x) => {
          return (
            <List>
              <p>Pending Members: {x?.username}</p>
            </List>
          );
        })}
      </div>
      <div>
        <h3>Requests from others</h3>
        {bookGroup[0]?.joinRequestFromUsers.map((x) => {
          return (
            <List>
              <p>Pending Members: {x?.username}</p>
            </List>
          );
        })}
      </div>
      <h3>Chat</h3>
      <Link to={`/BookClubConversation/${bookGroup[0]?._id}`}>
        <p> {bookGroup[0]?.bookClubName}</p>
      </Link>
      {/* {hostingBookClubs?.map((group, idx) => (
        <List key={idx}>
          <Link to={`/BookClubConversation/${group?._id}`}>
            <p> {group?.bookClubName}</p>
          </Link>
        </List>
      ))} */}
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
