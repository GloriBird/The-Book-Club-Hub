import React, { useEffect, useState, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Container } from "./pageStyles/Homepage.styled";
import { GlobalContext } from "../context/GlobalContext";
import { useLocation } from "react-router-dom";
import { CurrentUserContext } from "../context/CurrentUserContext";

import Carousel from "react-elastic-carousel";
import styled from "styled-components";
import PopUpModal from "../components/PopUpModal";

const Homepage = () => {
  const { trendingBooks, allUsers, isAllUsersLoading } = useContext(GlobalContext);
  const { user, isAuthenticated } = useAuth0();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const userData = useContext(CurrentUserContext);

  const [toggleModal, setToggleModal] = useState(false);
  const [newUsername, setNewUsername] = useState("");

  const [timedModalPopUp, setTimedModalPopUp] = useState(false);

  const {
    state: { _id, username, email },
    actions: { receiveCurrentUser, receiveNewUserName },
  } = userData;

  useEffect(() => {
    if (user !== undefined) {
      const { email, nickname } = user;
      let username = nickname;
      const newData = { username, email };
      fetch("/create-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      }).then(() => {
        fetch(`/user/${username}`)
          .then((res) => {
            if (!res.ok) {
              throw Error(`Not a new user`);
            }
            return res.json();
          })
          .then((data) => {
            // console.log(`data.account.username === nickname:`, data.account.username === nickname);
            setTimeout(() => {
              data.account.username === nickname && setTimedModalPopUp(true);
            }, 200);
            receiveCurrentUser(data.account);
          });
      });
    }
  }, [user]);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 200, itemsToShow: 2 },
    { width: 300, itemsToShow: 3 },
    { width: 400, itemsToShow: 4 },
    { width: 500, itemsToShow: 5 },
  ];

  console.log(`user:`, user);

  if (user !== undefined && username === user.nickname) {
    const randomUsername = Math.random().toString(36).substring(2, 13);
    fetch("/update-profile", {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ _id: _id, username: randomUsername, email: email }),
    }).then((response) => {
      console.log(response);
      receiveNewUserName(randomUsername);
      return response.json();
    });
  }

  const handleUsername = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (newUsername.length >= 2) {
      fetch("/update-profile", {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ _id: _id, username: newUsername, email: email }),
      }).then((response) => {
        console.log(response);
        setIsLoading(false);
        receiveNewUserName(newUsername.trim());

        return response.json();
      });
    }
  };

  console.log(`username:`, username);
  const maxCharacters = 30;

  const containsSpace = /\s/.test(newUsername.trim());

  return (
    <Wrapper>
      <main>
        <button
          onClick={() => {
            setToggleModal(true);
          }}
        >
          Open PopUp
        </button>
      </main>
      <PopUpModal trigger={timedModalPopUp} setTrigger={setTimedModalPopUp}>
        <h1>Assign Username</h1>
        <NewUserForm onSubmit={handleUsername}>
          <label>
            <p>Let us know your username, if you decide to skip we'll assign you one.</p>
            <em>Make sure there are no space in between the characters</em>
            <input
              type="text"
              name="ClubName"
              maxlength="30"
              placeholder="Enter at least 2 characters"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              required
            />
            <p>Characters left: {maxCharacters - newUsername.length}</p>
          </label>
          <ConfirmButton
            type="submit"
            value="Create"
            changeOpacity={newUsername.trim().length > 1 || newUsername.trim().length <= 30 || containsSpace === true}
            disabled={newUsername.trim().length < 2 || newUsername.trim().length > 30 || containsSpace === true}
            onClick={() =>
              setTimeout(() => {
                setTimedModalPopUp(false);
              }, 1000)
            }
          >
            {isLoading ? "Loading..." : "Submit Username"}
          </ConfirmButton>
        </NewUserForm>
      </PopUpModal>
      <CarouselStyle breakPoints={breakPoints}>
        {trendingBooks?.map((x, idx) => (
          <List key={idx}>
            <img src={`https://covers.openlibrary.org/b/olid/${x.cover_edition_key}-M.jpg`} alt={"book Covers"} />
            <p>{x?.title}</p>
            <p>{x.author_name}</p>
          </List>
        ))}
        <></>
      </CarouselStyle>
    </Wrapper>
  );
};

export default Homepage;

const CarouselStyle = styled(Carousel)`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  border: 10px solid green;

  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${CarouselStyle} {
    border: 10px solid red;
  }
`;

const List = styled.li`
  margin-bottom: 2000;
  list-style: none;
  z-index: -1000;
`;

const NewUserForm = styled.form`
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

const ConfirmButton = styled.button`
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
