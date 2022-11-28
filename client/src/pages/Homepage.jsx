import React, { useEffect, useState, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { GlobalContext } from "../context/GlobalContext";
import { CurrentUserContext } from "../context/CurrentUserContext";
import PopUpModal from "../components/PopUpModal";
import { Wrapper, NewUserForm, ConfirmButton, BookImg, LandingPage } from "./pageStyles/Homepage.styled";
import bookAndTea from "../assets/bookAndTea.png";
import { Container } from "./pageStyles/MyBookClubs.styled";

const Homepage = () => {
  const { allUsernames } = useContext(GlobalContext);
  const { user } = useAuth0();
  const [hasLoaded, setHasLoaded] = useState(false);
  const userData = useContext(CurrentUserContext);

  const [newUsername, setNewUsername] = useState("");

  const [timedModalPopUp, setTimedModalPopUp] = useState(false);

  const {
    state: { _id, username, email },
    actions: { receiveCurrentUser, receiveNewUserName },
  } = userData;

  if (user !== undefined && username === user.nickname) {
    const randomUsername = Math.random().toString(36).substring(2, 13);
    fetch("/update-profile", {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ _id: _id, username: randomUsername, email: email }),
    }).then((response) => {
      receiveNewUserName(randomUsername);
      return response.json();
    });
  }

  useEffect(() => {
    if (user !== undefined) {
      const { email, nickname, sub } = user;
      let username = nickname;
      const newData = { username, email, sub };
      fetch("/create-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      }).then(() => {
        fetch(`/user/${sub}`)
          .then((res) => {
            if (!res.ok) {
              throw Error(`Not a new user`);
            }
            return res.json();
          })
          .then((data) => {
            if (data.account.username === nickname) {
              setTimedModalPopUp(true);
            } else {
              setTimedModalPopUp(false);
            }
            receiveCurrentUser(data.account);
          });
      });
    } else {
      <></>;
    }
  }, [user]);

  const handleUsername = async (e) => {
    e.preventDefault();
    setHasLoaded(true);
    if (newUsername.length >= 2) {
      fetch("/update-profile", {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ _id: _id, username: newUsername, email: email }),
      }).then((response) => {
        setHasLoaded(false);
        receiveNewUserName(newUsername.trim());
        return response.json();
      });
    }
  };

  const maxCharacters = 30;

  const containsSpace = /\s/.test(newUsername.trim());

  const allUsernamesLowerCased = allUsernames?.map((accountUsername) => accountUsername?.toLowerCase());
  const typedUsernameLowerCased = newUsername?.toLowerCase();

  return (
    <Container>
      <Wrapper>
        <LandingPage>
          <div>
            <h1>giNot sure where to start?</h1>
            <p>
              <strong>1.</strong> Check out some books and book clubs that might interest you.
            </p>
            <p>
              <strong>2.</strong> Ask a few friends nicely (or not) to join your book club.
            </p>
            <p>
              <strong>3.</strong> Make new friends while reading, or not, I can’t tell you what to do.
            </p>
          </div>
          <BookImg src={bookAndTea} alt="" />
        </LandingPage>
        <PopUpModal trigger={timedModalPopUp} setTrigger={setTimedModalPopUp} style={{ backgroundColor: "blue" }}>
          <h1>Assign Username</h1>
          <NewUserForm onSubmit={handleUsername}>
            <label>
              <p>Pick your username below.</p>
              <p>Ensure no spaces are between the characters.</p>
              <input
                type="text"
                name="ClubName"
                maxLength="30"
                placeholder="Enter at least 2 characters"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                required
              />
              {allUsernamesLowerCased?.includes(typedUsernameLowerCased) && (
                <p>This username has already been taken.</p>
              )}
              <p>Characters left: {maxCharacters - newUsername.length}</p>
            </label>
            <ConfirmButton
              type="submit"
              value="Create"
              changeOpacity={newUsername.trim().length > 1 || newUsername.trim().length <= 30 || containsSpace === true}
              disabled={
                newUsername.trim().length < 2 ||
                newUsername.trim().length > 30 ||
                containsSpace === true ||
                allUsernamesLowerCased?.includes(typedUsernameLowerCased)
              }
              onClick={() =>
                setTimeout(() => {
                  setTimedModalPopUp(false);
                }, 1000)
              }
            >
              {hasLoaded ? "Loading..." : "Submit Username"}
            </ConfirmButton>
          </NewUserForm>
        </PopUpModal>
      </Wrapper>
    </Container>
  );
};

export default Homepage;
