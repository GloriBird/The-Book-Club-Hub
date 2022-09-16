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
    console.log(`hello`);
    bookClubInvites.splice(e.target.id, 1);
    // console.log(`e.target.id:`, e.target.id);
    fetch("/accept-reject-invite", {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ _id, username, bookClubName: e.target.id, accept: true, reject: false }),
    });
    // window.location.reload();
  };

  const handleDeny = (e) => {
    setIsAccepted(false);
    fetch("/accept-reject-invite", {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ _id, username, bookClubName: e.target.id, accept: false, reject: true }),
    });
    bookClubInvites.splice(e.target.id, 1);
  };

  console.log(`bookClubInvites:`, bookClubInvites);
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
          {bookClubs?.length > 0 && (
            <>
              <Title>My Book Clubs</Title>
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
          {bookClubInvites?.length > 0 && (
            <>
              <Title>Book Club Invites</Title>
              <Wrapper>
                {bookClubInvites?.map((group, idx) => (
                  <List key={idx} id={idx}>
                    <div>
                      <Link style={{ textDecoration: "none" }} reloadDocument to={`/BookClub/${group?._id}`}>
                        <BookClubImg
                          src={`https://avatars.dicebear.com/api/initials/${group?.bookClubName}.svg`}
                          alt=""
                        />
                      </Link>
                      <p> {group?.bookClubName}</p>
                      <AcceptButton id={group?.bookClubName} onClick={handleAccept}>
                        Accept
                      </AcceptButton>
                      <DenyButton id={group?.bookClubName} onClick={handleDeny}>
                        Deny
                      </DenyButton>
                    </div>
                  </List>
                ))}
              </Wrapper>
            </>
          )}

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
        <p>Loading...</p>
      )}
    </>
  );
};

const Title = styled.h3`
  padding-top: 3%;
`;

const Wrapper = styled.ol`
  /* border: 2px dotted red; */
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
  display: flex;

  span {
    display: inline;
    flex-direction: row;
    justify-content: space-evenly;
    padding-right: 20px;
  }

  div {
    text-align: center;
  }
`;

const BookClubImg = styled.img`
  border-radius: 5px;
  height: 100%;
  margin: auto;
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
  padding-top: 6%;
`;
