import React, { useState, useContext } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { Container, CreateClubButton, ChatButton } from "./pageStyles/MyBookClubs.styled";
import { useAuth0 } from "@auth0/auth0-react";
import PopUpModal from "../components/PopUpModal";
import { GlobalContext } from "../context/GlobalContext";
import styled from "styled-components";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { UsersBookClubs } from "../components/UsersBookClubs";
const MyBookClubs = () => {
  const userData = useContext(CurrentUserContext);
  const { allBookClubNames } = useContext(GlobalContext);
  const [newBookClubLoading, setNewBookClubLoading] = useState(false);
  const [currentBookClubName, setCurrentBookClubName] = useState("");
  const [toggleModal, setToggleModal] = useState(false);
  const { isLoading } = useAuth0();

  const {
    state: { _id, joinedDate, username, email, sub, hostingBookClubs, bookClubsToJoinPending, bookClubInvites },
  } = userData;

  const members = [
    {
      _id,
      joinedDate,
      username,
      email,
      sub,
    },
  ];

  const allBookClubNamesLowerCased = allBookClubNames?.map((BC_Name) => BC_Name?.replace(/\s+/g, "").toLowerCase());
  const typedBookClubNamesLowerCased = currentBookClubName?.replace(/\s+/g, "").toLowerCase();

  const maxCharacters = 50;

  const createBookClub = () => {
    setNewBookClubLoading(true);
    setCurrentBookClubName("");
    fetch("/create-book-club", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookClubName: currentBookClubName, host: username, members }),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(`It's broken`);
        }
        return response.json();
      })
      .then(() => {
        setNewBookClubLoading(false);
      });
  };

  return (
    <>
      {isLoading === false ? (
        <Container>
          <CreateClubButton
            onClick={() => {
              setToggleModal(true);
            }}
          >
            Create Book Club
          </CreateClubButton>
          <PopUpModal trigger={toggleModal} setTrigger={setToggleModal}>
            <h2>Create Your Book Club</h2>
            <BookForm onSubmit={createBookClub}>
              <label>
                <p>Enter your book club Name:</p>
                <input
                  type="text"
                  name="ClubName"
                  maxLength="50"
                  placeholder="Enter at least 2 characters"
                  value={currentBookClubName}
                  onChange={(e) => setCurrentBookClubName(e.target.value)}
                  required
                />
                {allBookClubNamesLowerCased?.includes(typedBookClubNamesLowerCased) && (
                  <p>This username has already been taken.</p>
                )}
              </label>
              <p>Characters left: {maxCharacters - currentBookClubName.length}</p>
              <CreateButton
                type="submit"
                value="Create"
                changeOpacity={
                  currentBookClubName.replace(/\s+/g, "").trim().length < 2 ||
                  allBookClubNamesLowerCased?.includes(typedBookClubNamesLowerCased)
                }
                onClick={() =>
                  setTimeout(() => {
                    setToggleModal(false);
                  }, 1000)
                }
                disabled={
                  currentBookClubName.replace(/\s+/g, "").trim().length < 2 ||
                  allBookClubNamesLowerCased?.includes(typedBookClubNamesLowerCased)
                }
              >
                {newBookClubLoading ? "Loading..." : "Create"}
              </CreateButton>
            </BookForm>
          </PopUpModal>
          <UsersBookClubs />
        </Container>
      ) : (
        <Loading>
          <p>Loading...</p>
        </Loading>
      )}
    </>
  );
};

export default MyBookClubs;

const BookForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  input[type="text"] {
    margin: 10px 0;
    width: 300px;
    border-radius: 5px;
    height: 40px;
    text-align: center;
  }
`;

const CreateButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: green;
  border: none;
  padding: 2% 7%;
  margin-top: 40px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
  width: 100px;
  background-color: var(--color-pale-forest-green);
  opacity: ${(props) => (props.changeOpacity ? 0.3 : 1)};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;

  p {
    font-size: 2rem;
    font-weight: bold;
  }
`;
