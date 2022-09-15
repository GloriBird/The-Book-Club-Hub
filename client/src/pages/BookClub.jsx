import styled from "styled-components";
import React, { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { Navigate, useNavigate, useParams, Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import BookList from "../components/BookList";
import { useAuth0 } from "@auth0/auth0-react";
import { Loading } from "../components/styles/Loading.styled";
const BookClubPage = () => {
  const userData = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const { bookClubID } = useParams();
  const [pending, setPending] = useState(false);
  const { allBookClub, sub } = useContext(GlobalContext);
  const { isLoading } = useAuth0();

  const {
    state: { _id, username, email, bookClubs, hostingBookClubs, bookClubsToJoinPending, bookClubInvites, joinedDate },
  } = userData;

  const bookGroup = hostingBookClubs !== null && allBookClub?.filter((x) => x?._id === bookClubID);
  const currentUser = [
    {
      username,
      _id,
    },
  ];

  const bookClubAlreadyPending =
    bookClubsToJoinPending !== undefined &&
    bookGroup !== undefined &&
    bookClubsToJoinPending?.some((request) => request?.bookClubName === bookGroup[0]?.bookClubName);

  const handleLeaveGroup = () => {
    fetch("/remove-member", {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
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

  const handleAcceptUser = (e) => {
    const idxToRemove = e.target.className.lastIndexOf(" ");
    const finalUserId = e.target.className.substring(idxToRemove + 1);
    fetch("/accept-reject-user-request", {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        _id: finalUserId,
        username: e.target.id,
        bookClubName: bookGroup[0]?.bookClubName,
        accept: true,
        reject: false,
      }),
    });
    window.location.reload();
  };

  const handleDenyUser = (e) => {
    const idxToRemove = e.target.className.lastIndexOf(" ");
    const finalUserId = e.target.className.substring(idxToRemove + 1);
    fetch("/accept-reject-user-request", {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        _id: finalUserId,
        username: e.target.id,
        bookClubName: bookGroup[0]?.bookClubName,
        accept: false,
        reject: true,
      }),
    });
    window.location.reload();
  };

  const handleRemoveMember = (e) => {
    const idxToRemove = e.target.className.lastIndexOf(" ");
    const finalUserId = e.target.className.substring(idxToRemove + 1);

    fetch("/remove-member", {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        bookClubName: bookGroup[0]?.bookClubName,
        member: [{ username: e.target.id, _id: finalUserId }],
      }),
    });
    navigate(0);
  };

  console.log(`bookGroup:`, bookGroup[0]?.readingList.length < 1);

  return (
    <>
      {username !== null && isLoading === false ? (
        <Wrapper>
          <BookClubInfo>
            {bookGroup !== undefined && hostingBookClubs !== null && (
              <>
                <SpaceAreas>
                  <h1>{bookGroup[0]?.bookClubName}</h1>
                  <p>Hosted by {bookGroup[0]?.host}</p>
                </SpaceAreas>
                <SpaceAreas>
                  <div>
                    <MemberList>
                      <h3>Members:</h3>
                      {bookGroup[0]?.members.map((x, idx) => {
                        return (
                          <List key={idx}>
                            <MembersArea>
                              <p> {x?.username}</p>
                              {bookGroup[0]?.host === username && bookGroup[0]?.host !== x?.username && (
                                <RemoveMemberButton id={x?.username} className={x?._id} onClick={handleRemoveMember}>
                                  Remove Member
                                </RemoveMemberButton>
                              )}
                            </MembersArea>
                          </List>
                        );
                      })}
                    </MemberList>
                  </div>
                </SpaceAreas>

                {(isAMember === true || isAHost === true) && (
                  <>
                    <SpaceAreas>
                      {bookGroup[0]?.pendingMembers.length > 0 && (
                        <>
                          <div>
                            <h3>Users To Accept Invite</h3>
                            {bookGroup[0]?.pendingMembers.map((x, idx) => {
                              return (
                                <List key={idx}>
                                  <p>Pending Members: {x?.username}</p>
                                </List>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </SpaceAreas>
                    {bookGroup[0]?.joinRequestFromUsers?.length > 0 && (
                      <SpaceAreas>
                        <h3>Join Requests From Users</h3>
                        {bookGroup[0]?.joinRequestFromUsers.map((x, idx) => (
                          <List key={idx} id={idx}>
                            <UsersRequest>
                              <p>{x?.username}</p>
                              {bookGroup[0]?.host === username && (
                                <>
                                  <AcceptButton id={x?.username} className={x?._id} onClick={handleAcceptUser}>
                                    Accept
                                  </AcceptButton>
                                  <DenyButton id={x?.username} className={x?._id} onClick={handleDenyUser}>
                                    Deny
                                  </DenyButton>
                                </>
                              )}
                            </UsersRequest>
                          </List>
                        ))}
                      </SpaceAreas>
                    )}
                    {bookGroup[0]?.bookClubInvites?.length > 0 && (
                      <>
                        <SpaceAreas>
                          <h3>Invites To Join Book Club</h3>
                          {bookClubInvites?.map((x, idx) => {
                            return (
                              <List key={idx}>
                                <p>Book Clubs: {x?.bookClubName}</p>
                              </List>
                            );
                          })}
                        </SpaceAreas>
                      </>
                    )}
                    <ChatArea>
                      <h3>Chat</h3>
                      <Link reloadDocument to={`/BookClubConversation/${bookGroup[0]?._id}`}>
                        <Buttons> Join Chat</Buttons>
                      </Link>
                    </ChatArea>
                  </>
                )}
                <div>
                  {bookClubs !== null &&
                    bookClubsToJoinPending !== null &&
                    (isAMember === false ? (
                      <SpaceAreas>
                        <JoinBookClubButton
                          disabled={bookGroup[0]?.host === username || bookClubAlreadyPending || pending}
                          onClick={handleJoinRequest}
                        >
                          {pending || bookClubAlreadyPending ? <p>Awaiting host response...</p> : <p>Join Book Club</p>}
                        </JoinBookClubButton>
                      </SpaceAreas>
                    ) : (
                      <SpaceAreas>
                        <button disabled={bookGroup[0]?.host === username} onClick={handleLeaveGroup}>
                          Leave Book Club
                        </button>
                      </SpaceAreas>
                    ))}
                </div>
              </>
            )}
          </BookClubInfo>
          {bookGroup[0]?.readingList.length > 1 && <BookList />}
        </Wrapper>
      ) : (
        <Loading>
          <p>Loading...</p>
        </Loading>
      )}
    </>
  );
};

export default BookClubPage;

const Wrapper = styled.div`
  display: grid;
  /* border: 10px solid red; */
  grid-template-columns: 0.6fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: "BookClubDetails Books";
  gap: 30px;
  height: 100vh;

  h3 {
    text-align: left;
  }
`;

const List = styled.li`
  list-style: none;
`;

const DenyButton = styled.button`
  list-style: none;
  text-align: center;
  box-shadow: 0px -4px 7px #b01818 inset;
  border-radius: 5px;
  background-color: #de5151;
  height: 30px;
  width: 100px;
  margin: 0 5px;
  border: none;
  color: white;
  font-weight: bolder;

  &:hover {
    cursor: pointer;
  }
`;

const AcceptButton = styled.button`
  list-style: none;
  text-align: center;
  box-shadow: 0px -4px 7px #68a033 inset;
  border-radius: 5px;
  background-color: #a1cf8b;
  height: 30px;
  width: 100px;
  margin: 0 5px;
  border: none;
  font-weight: bolder;

  &:hover {
    cursor: pointer;
  }
`;

const MembersArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  line-height: 40px;
`;

const RemoveMemberButton = styled.button`
  margin-left: 20px;
  box-shadow: 0px -4px 7px #b01818 inset;
  border-radius: 5px;
  background-color: #de5151;
  height: 30px;
  align-self: center;
  width: fit-content;
  padding: 0 10px;
  margin: 0 5px;
  border: none;
  color: white;
  font-weight: bolder;

  &:hover {
    cursor: pointer;
  }
`;

const UsersRequest = styled.div`
  display: flex;
  align-items: center;

  p {
    line-height: 40px;
  }
`;

const MemberList = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const ChatArea = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  padding: 20px 0;
`;

const JoinBookClubButton = styled.button`
  box-shadow: ${(props) => (props.disabled ? "#dcdcdc" : "0px -4px 7px #001d6e inset")};

  border-radius: 5px;
  background-color: #1e3880;
  background-color: ${(props) => (props.disabled ? "#dcdcdc" : "#1e3880")};

  height: 30px;
  align-self: center;
  width: fit-content;
  padding: 0 20px;
  font-size: 1rem;
  border: none;
  font-weight: bolder;

  p {
    color: white;
  }
  &:hover {
    cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  }
`;

const Buttons = styled.button`
  margin: 0 10px 0px 10px;
  padding: 0 20px;
  background-color: #77dd77;
  border-radius: 5px;
  border: none;
  height: 30px;
  align-items: center;
  color: white;
  box-shadow: 0px -4px 7px #188818 inset;
  font-size: 1rem;
  font-weight: 700;

  &:hover {
    cursor: pointer;
  }
`;

const SpaceAreas = styled.div`
  margin: 10px 0;
  /* text-align: left; */
`;

const BookClubInfo = styled.div`
  grid-area: BookClubDetails;
  margin: 0 auto;
`;
