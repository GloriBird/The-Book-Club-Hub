import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const UsersToAcceptInvite = ({ isAMember, isAHost, bookGroup, username }) => {
  const navigate = useNavigate();

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
    navigate(0);
  };

  const handleDenyUser = (e) => {
    const idxToRemove = e.target.className.lastIndexOf(" ");
    const finalUserId = e.target.className.substring(idxToRemove + 1);
    if (bookGroup[0]?.host === username) {
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
    }
    navigate(0);
  };
  return (
    <div>
      {(isAMember === true || isAHost === true) && (
        <>
          <SpaceAreas>
            {bookGroup[0]?.pendingMembers.length > 0 && (
              <>
                <div>
                  <h3>Users To Accept Invite</h3>
                  {bookGroup[0]?.pendingMembers.map((x, idx) => {
                    return (
                      <div key={idx}>
                        <p>• {x?.username}</p>
                      </div>
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
                <div key={idx} id={idx}>
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
                </div>
              ))}
            </SpaceAreas>
          )}

          <ChatArea>
            <h3>Chat</h3>
            <Link reloadDocument to={`/BookClubConversation/${bookGroup[0]?._id}`}>
              <Buttons> Join Chat</Buttons>
            </Link>
          </ChatArea>
        </>
      )}
    </div>
  );
};

export default UsersToAcceptInvite;

const SpaceAreas = styled.div`
  margin: 10px 0;
`;

const UsersRequest = styled.div`
  display: flex;
  align-items: center;

  p {
    line-height: 40px;
  }
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

const ChatArea = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 0;
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
