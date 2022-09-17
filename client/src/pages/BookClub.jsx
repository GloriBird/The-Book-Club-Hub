import styled from "styled-components";
import React, { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import BookList from "../components/BookList";
import { useAuth0 } from "@auth0/auth0-react";
import { Loading } from "../components/styles/Loading.styled";
import CurrentBookClubMembers from "../components/CurrentBookClubMembers";
import UsersToAcceptInvite from "../components/UsersToAcceptInvite";
import UserPendingRequest from "../components/UserPendingRequest";

const BookClub = () => {
  const { bookClubID } = useParams();

  const { allBookClub, sub } = useContext(GlobalContext);
  const { isLoading } = useAuth0();

  const {
    state: { _id, username, email, bookClubs, hostingBookClubs, bookClubsToJoinPending, bookClubInvites, joinedDate },
  } = useContext(CurrentUserContext);

  const bookGroup = hostingBookClubs !== null && allBookClub?.filter((x) => x?._id === bookClubID);
  const currentUser = [
    {
      username,
      _id,
    },
  ];

  const userAlreadyInvited =
    bookClubInvites !== null && bookClubInvites?.some((x) => x?.bookClubName === bookGroup[0]?.bookClubName);

  const bookClubAlreadyPending =
    bookClubsToJoinPending !== undefined &&
    bookGroup !== undefined &&
    bookClubsToJoinPending?.some((request) => request?.bookClubName === bookGroup[0]?.bookClubName);

  const isAMember =
    bookClubs !== null &&
    bookGroup !== undefined &&
    bookClubs?.some((x) => x?.bookClubName === bookGroup[0]?.bookClubName);

  const isAHost =
    bookClubs !== null &&
    bookGroup !== undefined &&
    hostingBookClubs?.some((x) => x?.bookClubName === bookGroup[0]?.bookClubName);

  return (
    <>
      {username !== null && isLoading === false ? (
        <Wrapper>
          <BookClubInfo>
            {bookGroup !== null && hostingBookClubs !== null && (
              <>
                <SpaceAreas>
                  <h1>{bookGroup[0]?.bookClubName}</h1>
                  <p>Hosted by {bookGroup[0]?.host}</p>
                </SpaceAreas>
                <CurrentBookClubMembers bookGroup={bookGroup} username={username} />
                <UsersToAcceptInvite
                  isAMember={isAMember}
                  isAHost={isAHost}
                  bookGroup={bookGroup}
                  username={username}
                />
                <UserPendingRequest
                  bookClubs={bookClubs}
                  bookClubsToJoinPending={bookClubsToJoinPending}
                  isAMember={isAMember}
                  bookGroup={bookGroup}
                  bookClubAlreadyPending={bookClubAlreadyPending}
                  username={username}
                  userAlreadyInvited={userAlreadyInvited}
                  joinedDate={joinedDate}
                  _id={_id}
                  sub={sub}
                  email={email}
                  currentUser={currentUser}
                />
              </>
            )}
          </BookClubInfo>
          <BookList />
        </Wrapper>
      ) : (
        <Loading>
          <p>Loading...</p>
        </Loading>
      )}
    </>
  );
};

export default BookClub;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: "BookClubDetails Books";
  gap: 30px;
  height: 100vh;
  background-color: #fefbe7;

  h3 {
    text-align: left;
  }
`;

const SpaceAreas = styled.div`
  margin: 10px 0;
`;

const BookClubInfo = styled.div`
  grid-area: BookClubDetails;
  margin: 10% 0 0 50%;
  /* border: 10px solid green;
  display: flex;
  flex-direction: column;
  justify-content: center; */
  /* margin: 0 auto; */
`;
