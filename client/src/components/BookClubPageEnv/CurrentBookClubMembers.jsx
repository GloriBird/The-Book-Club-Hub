import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";

const CurrentBookClubMembers = ({ bookGroup, username }) => {
  const navigate = useNavigate();

  const handleRemove = (e) => {
    if (e?.target?.id?.length > 0) {
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
    }
  };

  return (
    <SpaceAreas>
      <div>
        <MemberList>
          <h3>Members:</h3>
          {bookGroup[0]?.members.map((x, idx) => {
            return (
              <div key={idx}>
                <MembersArea>
                  <p>• {x?.username}</p>
                  {bookGroup[0]?.host === username && bookGroup[0]?.host !== x?.username && (
                    <RemoveMemberButton
                      id={x?.username}
                      className={x?._id}
                      onClick={(e) => {
                        handleRemove(e);
                      }}
                    >
                      Remove Member
                    </RemoveMemberButton>
                  )}
                </MembersArea>
              </div>
            );
          })}
        </MemberList>
      </div>
    </SpaceAreas>
  );
};

export default CurrentBookClubMembers;

const SpaceAreas = styled.div`
  margin: 10px 0;
`;

const MemberList = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
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
