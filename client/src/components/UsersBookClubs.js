import React, { useState, useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import styled from "styled-components";
import { Navigate, useNavigate, useParams, Link } from "react-router-dom";
import BookClub from "../pages/BookClub";

export const UsersBookClubs = () => {
  const userData = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const {
    state: { _id, username, email, bookClubs, bookClubName, hostingBookClubs },
    actions: { receiveCurrentUser, receiveNewUserName },
  } = userData;

  // console.log(`hostingBookClubs`);

  return (
    <>
      <HostingCategory>Hosting</HostingCategory>

      <Wrapper>
        {hostingBookClubs?.map((group, idx) => (
          <List key={idx}>
            <Link to={`/BookClub/${group?._id}`}>
              <p> {group?.bookClubName}</p>
            </Link>
          </List>
        ))}
        {/* {hostingBookClubs?.map((group, idx) => (
          <List key={idx}>
            <Link to={`/BookClubConversation/${group?._id}`}>
              <p> {group?.bookClubName}</p>
            </Link>
          </List>
        ))} */}
      </Wrapper>
    </>
  );
};

const HostingCategory = styled.h3`
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
`;
