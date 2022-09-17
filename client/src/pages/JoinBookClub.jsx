import React, { useContext } from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import BookList from "../components/BookList";
import SignUpButton from "../components/SignUpButton";

import { Loading } from "./pageStyles/BrowseBookClubs.styled";

const JoinBookClub = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  const { allBookClub } = useContext(GlobalContext);

  const { bookClubID } = useParams();

  const bookGroup = allBookClub !== undefined && allBookClub?.filter((x) => x?._id === bookClubID);
  console.log(`bookGroup:`, bookGroup);
  return (
    <div>
      <>
        {isAuthenticated === false && isLoading === false ? (
          <Wrapper>
            <BookClubInfo>
              {bookGroup !== false && (
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
                              </MembersArea>
                            </List>
                          );
                        })}
                      </MemberList>
                    </div>
                  </SpaceAreas>
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
                  </>

                  <div>
                    <SpaceAreas>
                      {isAuthenticated === false && (
                        <ButtonSignUp onClick={() => loginWithRedirect({ screen_hint: "signup" })}>
                          Sign Up
                        </ButtonSignUp>
                      )}
                      {/* <JoinBookClubButton>
                          <p>Join Book Club</p>
                        </JoinBookClubButton> */}
                    </SpaceAreas>
                  </div>
                </>
              )}
            </BookClubInfo>
            <CurrentBookList>
              <h1>To TBD</h1>
            </CurrentBookList>
            {/* <BookList /> */}
          </Wrapper>
        ) : (
          <Loading>
            <p>Loading...</p>
          </Loading>
        )}
      </>
    </div>
  );
};

export default JoinBookClub;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: "BookClubDetails Books";
  gap: 30px;
  height: 100vh;
  background-color: #fefbe7;
  border: 10px solid red;
`;

const List = styled.li`
  list-style: none;
`;

const MembersArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  line-height: 40px;
`;

const MemberList = styled.li`
  display: flex;
  flex-direction: column;
`;

const JoinBookClubButton = styled.button`
  box-shadow: ${(props) => (props.disabled ? "#dcdcdc" : "0px -4px 7px #001d6e inset")};

  border-radius: 5px;
  background-color: #1e3880;
  background-color: ${(props) => (props.disabled ? "#dcdcdc" : "#1e3880")};

  height: 30px;

  width: fit-content;
  /* padding: 0 20px; */
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
  text-align: center;
  margin: 10px 0;

  h1 {
    padding-bottom: 10%;
  }
  /* border: 10px solid green; */
`;

const BookClubInfo = styled.div`
  grid-area: BookClubDetails;
  margin: 3% 0 0 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 10px solid blue;
`;

const CurrentBookList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 10px solid yellow;
`;

const ButtonSignUp = styled.button`
  box-shadow: 0px -4px 7px #68a033 inset;
  border-radius: 5px;
  background-color: #a1cf8b;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bolder;
  color: white;

  &:hover {
    cursor: pointer;
  }
`;
