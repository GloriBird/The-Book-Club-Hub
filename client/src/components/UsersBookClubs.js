import React, { useState, useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import { Loading } from "./styles/Loading.styled";

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
    setIsAccepted(true);
    bookClubInvites.splice(e.target.id, 1);
    console.log(`e.target.id:`, e.target.id);
    fetch("/accept-reject-invite", {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ _id, username, bookClubName: e.target.id, accept: true, reject: false }),
    });
    navigate(0);
  };

  const handleDeny = (e) => {
    setIsAccepted(false);
    fetch("/accept-reject-invite", {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ _id, username, bookClubName: e.target.id, accept: false, reject: true }),
    });
    bookClubInvites.splice(e.target.id, 1);
    navigate(0);
  };

  return (
    <WrapAll>
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
          {bookClubs?.length > 0 && (
            <>
              <MyBookClubs>My Book Clubs</MyBookClubs>
              <Wrapper>
                {bookClubs?.map((group, idx) => (
                  <List key={idx} id={group?._id}>
                    <Link style={{ textDecoration: "none" }} reloadDocument to={`/BookClub/${group?._id}`}>
                      <BookClubImg
                        src={`https://avatars.dicebear.com/api/initials/${group?.bookClubName}.svg`}
                        alt=""
                      />
                      <p>{group?.bookClubName}</p>
                    </Link>
                  </List>
                ))}
              </Wrapper>
            </>
          )}
          <>
            {bookClubInvites?.length > 0 && (
              <>
                <BookClubInvites>Book Club Invites</BookClubInvites>
                <Wrapper>
                  <>
                    {bookClubInvites?.map((group, idx) => (
                      <List key={idx} id={idx}>
                        <BookClubImg
                          src={`https://avatars.dicebear.com/api/initials/${group?.bookClubName}.svg`}
                          alt=""
                        />
                        <WrapInvite>
                          <p> {group?.bookClubName}</p>
                          <AcceptButton id={group?.bookClubName} onClick={handleAccept}>
                            Accept
                          </AcceptButton>
                          <DenyButton id={group?.bookClubName} onClick={handleDeny}>
                            Deny
                          </DenyButton>
                        </WrapInvite>
                      </List>
                    ))}
                  </>
                </Wrapper>
              </>
            )}
          </>

          {bookClubsToJoinPending.length > 0 && (
            <>
              <MyBookClubRequest>My Book Club Requests</MyBookClubRequest>
              <Wrapper style={{ marginBottom: 50 }}>
                {bookClubsToJoinPending?.map((group, idx) => (
                  <List key={idx} id={group?._id}>
                    <Link style={{ textDecoration: "none" }} reloadDocument to={`/BookClub/${group?._id}`}>
                      <BookClubImg
                        src={`https://avatars.dicebear.com/api/initials/${group?.bookClubName}.svg`}
                        alt=""
                      />
                      <p>{group?.bookClubName}</p>
                    </Link>
                  </List>
                ))}
              </Wrapper>
            </>
          )}
        </>
      ) : (
        <Loading>
          <p>Loading...</p>
        </Loading>
      )}
    </WrapAll>
  );
};

const WrapAll = styled.div`
  width: 100vw;
`;

const Title = styled.h3`
  padding-top: 1%;
  text-align: center;
  text-decoration: underline;
`;

const BookClubInvites = styled.h3`
  padding-top: 3%;
  text-align: center;
  text-decoration: underline;
`;

const MyBookClubs = styled.h3`
  padding-top: 3%;
  text-align: center;
  text-decoration: underline;
`;

const WrapInvite = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  justify-content: space-evenly;
`;

const Wrapper = styled.ol`
  width: 100vw;
  height: 20vh;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

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
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  margin-right: 2%;

  span {
    display: inline;
    flex-direction: row;
    justify-content: center;
    padding-right: 20px;
  }
  div {
    text-align: center;
  }
`;

const BookClubImg = styled.img`
  border-radius: 5px;
  height: 100%;
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

const MyBookClubRequest = styled.h3`
  padding-top: 3%;
  text-align: center;
  text-decoration: underline;
`;
