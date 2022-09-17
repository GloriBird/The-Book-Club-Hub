import React, { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";

export const UsersBookClubs = () => {
  const navigate = useNavigate();
  const {
    state: { _id, username, bookClubs, bookClubInvites, hostingBookClubs, bookClubsToJoinPending },
  } = useContext(CurrentUserContext);

  const handleAccept = (e) => {
    bookClubInvites.splice(e.target.id, 1);
    fetch("/accept-reject-invite", {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ _id, username, bookClubName: e.target.id, accept: true, reject: false }),
    });
    navigate(0);
  };

  const handleDeny = (e) => {
    fetch("/accept-reject-invite", {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ _id, username, bookClubName: e.target.id, accept: false, reject: true }),
    });
    bookClubInvites.splice(e.target.id, 1);
    navigate(0);
  };

  return (
    <>
      {username !== null ? (
        <WholeWrap>
          {hostingBookClubs !== undefined && (
            <>
              <Title>Hosting</Title>
              <Wrapper>
                {hostingBookClubs !== undefined &&
                  hostingBookClubs?.map((group, idx) => (
                    <Container key={idx} id={group?._id}>
                      <Link style={{ textDecoration: "none" }} reloadDocument to={`/BookClub/${group?._id}`}>
                        <BookClubImg
                          src={`https://avatars.dicebear.com/api/initials/${group?.bookClubName}.svg`}
                          alt=""
                        />
                        <p> {group?.bookClubName}</p>
                      </Link>
                    </Container>
                  ))}
              </Wrapper>
            </>
          )}
          {bookClubs?.length > 0 && (
            <>
              <Title>My Book Clubs</Title>
              <Wrapper>
                {bookClubs?.map((group, idx) => (
                  <Container key={idx} id={group?._id}>
                    <Link style={{ textDecoration: "none" }} reloadDocument to={`/BookClub/${group?._id}`}>
                      <BookClubImg
                        src={`https://avatars.dicebear.com/api/initials/${group?.bookClubName}.svg`}
                        alt=""
                      />
                      <p>{group?.bookClubName}</p>
                    </Link>
                  </Container>
                ))}
              </Wrapper>
            </>
          )}
          {bookClubInvites?.length > 0 && (
            <>
              <Title>Book Club Invites</Title>
              <Wrapper>
                {bookClubInvites?.map((group, idx) => (
                  <Container key={idx} id={idx}>
                    <div style={{ margin: 0, padding: 0 }}>
                      <p> {group?.bookClubName}</p>

                      <Link style={{ textDecoration: "none" }} reloadDocument to={`/BookClub/${group?._id}`}>
                        <BookClubImg
                          src={`https://avatars.dicebear.com/api/initials/${group?.bookClubName}.svg`}
                          alt=""
                        />
                      </Link>
                    </div>
                    <ButtonArea>
                      <AcceptButton id={group?.bookClubName} onClick={handleAccept}>
                        Accept
                      </AcceptButton>
                      <DenyButton id={group?.bookClubName} onClick={handleDeny}>
                        Deny
                      </DenyButton>
                    </ButtonArea>
                  </Container>
                ))}
              </Wrapper>
            </>
          )}

          {bookClubsToJoinPending.length > 0 && (
            <>
              <MyBookClubRequest>My Book Club Requests</MyBookClubRequest>
              <Wrapper style={{ marginBottom: 50 }}>
                {bookClubsToJoinPending?.map((group, idx) => (
                  <Container key={idx} id={group?._id}>
                    <Link style={{ textDecoration: "none" }} reloadDocument to={`/BookClub/${group?._id}`}>
                      <BookClubImg
                        src={`https://avatars.dicebear.com/api/initials/${group?.bookClubName}.svg`}
                        alt=""
                      />
                      <p>{group?.bookClubName}</p>
                    </Link>
                  </Container>
                ))}
              </Wrapper>
            </>
          )}
        </WholeWrap>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

const WholeWrap = styled.div`
  display: flex;
  width: 100vw;
  height: auto;
  flex-direction: column;
  border: 10px solid green;
`;

const Title = styled.h3`
  padding-top: 2%;
  margin: auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  border: 1px solid blue;
`;

const Container = styled.div`
  list-style: none;
  padding: 0.5% 1%;
  height: 100%;
  border: 10px solid red;
  display: flex;
  flex-direction: column;

  div {
    text-align: center;
  }
`;

const BookClubImg = styled.img`
  border-radius: 5px;
  height: 60%;
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
  padding-top: 1%;
  text-align: center;
`;

const ButtonArea = styled.div`
  display: flex;
`;
