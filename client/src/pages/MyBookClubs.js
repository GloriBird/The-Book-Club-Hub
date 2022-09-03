import React, { useState, useContext } from "react";
import { Container, CreateClubButton } from "./pageStyles/MyBookClubs.styled";
import { useAuth0 } from "@auth0/auth0-react";
import PopUpModal from "../components/PopUpModal";
import { GlobalContext } from "../context/GlobalContext";
import styled from "styled-components";

import { CurrentUserContext } from "../context/CurrentUserContext";

const MyBookClubs = () => {
  const userData = useContext(CurrentUserContext);
  const { allUsers } = useContext(GlobalContext);
  const { user } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);
  const [bookClubName, setBookClubName] = useState("");

  const {
    state: { username },
    actions: { receiveCurrentUser },
  } = userData;
  const [toggleModal, setToggleModal] = useState(false);

  const userInData = allUsers?.filter((existingUser) => existingUser?.email.includes(user?.email));

  console.log(`username:`, username);

  const createBookClub = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let host = await userInData[0]?.username;
    const members = await userInData;
    receiveCurrentUser(members[0]);
    await fetch("/create-book-club", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookClubName, host, members }),
    }).then(() => {
      setIsLoading(false);
    });
  };

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
              placeholder="Enter at least 2 characters"
              value={bookClubName}
              onChange={(e) => setBookClubName(e.target.value)}
              required
            />
          </label>
          <CreateButton
            type="submit"
            value="Create"
            changeOpacity={bookClubName.replace(/\s+/g, "").trim().length > 1}
            onClick={() =>
              setTimeout(() => {
                setToggleModal(false);
              }, 1000)
            }
            disabled={bookClubName.replace(/\s+/g, "").trim().length < 2}
          >
            {isLoading ? "Loading..." : "Create"}
          </CreateButton>
        </BookForm>
      </PopUpModal>
      {}
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
  cursor: ${(props) => (props.changeOpacity ? "pointer" : "default")};
`;
