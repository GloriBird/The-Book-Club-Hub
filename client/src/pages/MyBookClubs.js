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
  const { allUsers, allBookClubNames } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [bookClubName, setBookClubName] = useState("");
  const [toggleModal, setToggleModal] = useState(false);
  // const { bookClubID } = useParams();

  // const navigate = useNavigate();

  const { state } = userData;

  const host = state.username;

  const members = [
    {
      _id: state._id,
      joinedDate: state.joinedDate,
      username: state.username,
      email: state.email,
      sub: state.sub,
    },
  ];

  const allBookClubNamesLowerCased = allBookClubNames?.map((BC_Name) => BC_Name?.replace(/\s+/g, "").toLowerCase());
  const typedBookClubNamesLowerCased = bookClubName?.replace(/\s+/g, "").toLowerCase();

  const maxCharacters = 50;

  const createBookClub = (e) => {
    // e.preventDefault();
    setIsLoading(true);
    setBookClubName("");
    fetch("/create-book-club", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookClubName: bookClubName, host: host, members: members }),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(`It's broken`);
        }
        return response.json();
      })
      .then(() => {
        setIsLoading(false);
      });
  };

  // const navigateToChat = () => {
  //   navigate("/BookClubConversation");
  // };

  return (
    <Container>
      <p>My Book Clubs</p>
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
              value={bookClubName}
              onChange={(e) => setBookClubName(e.target.value)}
              required
            />
            {allBookClubNamesLowerCased?.includes(typedBookClubNamesLowerCased) && (
              <p>This username has already been taken.</p>
            )}
          </label>
          <p>Characters left: {maxCharacters - bookClubName.length}</p>
          <CreateButton
            type="submit"
            value="Create"
            changeOpacity={bookClubName.replace(/\s+/g, "").trim().length > 1}
            onClick={() =>
              setTimeout(() => {
                setToggleModal(false);
              }, 1000)
            }
            disabled={
              bookClubName.replace(/\s+/g, "").trim().length < 2 ||
              allBookClubNamesLowerCased?.includes(typedBookClubNamesLowerCased)
            }
          >
            {isLoading ? "Loading..." : "Create"}
          </CreateButton>
        </BookForm>
      </PopUpModal>
      {/* <ChatButton onClick={navigateToChat}>Go to Chat</ChatButton> */}
      <UsersBookClubs />
    </Container>
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
  width: 100px;
  background-color: var(--color-pale-forest-green);
  opacity: ${(props) => (props.changeOpacity ? 1 : 0.3)};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
`;
