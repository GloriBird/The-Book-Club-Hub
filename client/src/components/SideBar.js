import React, { useEffect, useRef, useState, useContext } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "../context/CurrentUserContext";

export const SideBar = () => {
  const userData = useContext(CurrentUserContext);

  const {
    state: { _id, username, email },
  } = userData;

  console.log(`username:`, username);
  return (
    <Wrapper>
      <h3>Contacts</h3>
      <MemberArea>
        {username !== undefined ? (
          <p>
            {username} <span>Online</span>
          </p>
        ) : (
          <p>
            {" "}
            {username}
            <span>Offline</span>
          </p>
        )}
      </MemberArea>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 2px solid green;
  margin-right: 30%;
`;

const MemberArea = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  span {
    font-style: italic;
    color: green;
  }
`;
