import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const UserPendingRequest = ({
  bookClubs,
  bookClubsToJoinPending,
  isAMember,
  bookGroup,
  bookClubAlreadyPending,
  username,
  userAlreadyInvited,
  joinedDate,
  email,
  sub,
  _id,
  currentUser,
}) => {
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();

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
    navigate(0);
  };

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

  return (
    <div>
      {bookClubs !== null &&
        bookClubsToJoinPending !== null &&
        (isAMember === false ? (
          <SpaceAreas>
            <JoinBookClubButton
              disabled={bookGroup[0]?.host === username || bookClubAlreadyPending || pending || userAlreadyInvited}
              onClick={handleJoinRequest}
            >
              {pending || bookClubAlreadyPending || userAlreadyInvited ? (
                <p>Awaiting response...</p>
              ) : (
                <p>Join Book Club</p>
              )}
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
  );
};

export default UserPendingRequest;

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

const SpaceAreas = styled.div`
  margin: 10px 0;
`;
