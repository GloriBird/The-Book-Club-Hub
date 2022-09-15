import React, { useEffect, useRef, useState, useContext } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { GlobalContext } from "../context/GlobalContext";
import { useLocation } from "react-router-dom";

export const SideBar = () => {
  const userData = useContext(CurrentUserContext);
  const {
    trendingBooks,
    allUsers,
    allBookClub,
    allUsernames,
    userInData,
    setCurrentBookClubMembers,
    onlineUsers,
    setBookClubChat,
  } = useContext(GlobalContext);

  const location = useLocation();

  // const [onlineMembers, setOnlineMembers] = useState([]);
  const [userOnline, setUserOnline] = useState([]);

  const {
    state: { _id, username, email, bookClubs, onChat },
  } = userData;

  const getURL = location.pathname;
  const getIdFromURL = getURL.split("/BookClubConversation/")[1];
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
    <Wrapper>
      <h3>Members</h3>
      <MemberArea>
        {allBookClub !== undefined &&
          currentMembers.map((x, idx) => {
            return <p key={idx}>{x}</p>;
          })}
      </MemberArea>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  /* border: 2px solid green; */
  background-color: #f9ebc8;
  border-radius: 10px;

  margin-right: 30%;
`;

const MemberArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f9ebc8;

  width: 80%;
  p {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    border-radius: 5px;
    width: 90%;
    height: 30px;
    text-align: center;
    border: 2px solid #554994;
    margin: 2px 0;
  }
`;
