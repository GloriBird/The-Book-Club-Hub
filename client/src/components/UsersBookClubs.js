import React, { useState, useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import styled from "styled-components";
import { Navigate, useNavigate, useParams, Link } from "react-router-dom";

export const UsersBookClubs = () => {
  const userData = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const {
    state: { _id, username, email, bookClubs, bookClubName, hostingBookClubs },
    actions: { receiveCurrentUser, receiveNewUserName },
  } = userData;

  // console.log(`hostingBookClubs`);

  const navigateToChat = (e) => {
    // console.log(e.target);
    // const test = hostingBookClubs.filter((x) => x.bookClubName.includes(bookClubName));
    console.log(`test:`, hostingBookClubs);
    // navigate(`/BookClubConversation:${bookClubID}`);
  };

  // console.log(`hostingBookClubs:`, hostingBookClubs);

  return (
    <div>
      {hostingBookClubs?.map((group, idx) => (
        <List key={idx}>
          <Link to={`/BookClubConversation/${group?._id}`}>
            <p>{group?.bookClubName}</p>
            {/* <p>{bookClubID}</p> */}
            {/* <p>{group?._id}</p> */}
          </Link>
        </List>
      ))}
    </div>
    // <div>
    //   {hostingBookClubs?.map((group, idx) => (
    //     <List key={idx}>
    //       <button onClick={navigateToChat}>{group?.bookClubName}</button>
    //       <button onClick={navigateToChat}>{group?._id}</button>
    //     </List>
    //   ))}
    // </div>
  );
};

const List = styled.li`
  margin-bottom: 2000;
  list-style: none;
  z-index: -1000;
`;
