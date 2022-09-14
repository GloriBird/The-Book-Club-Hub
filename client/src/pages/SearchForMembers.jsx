import { Container, List, Add, Minus, Wrapper } from "./pageStyles/BrowseBookClubs.styled";
import React, { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { GlobalContext } from "../context/GlobalContext";
import PopUpModal from "../components/PopUpModal";

const SearchForMembers = () => {
  const { allUsers, allBookClub } = useContext(GlobalContext);
  const userData = useContext(CurrentUserContext);
  const [selectedUser, setSelectedUser] = useState();
  const [toggleModal, setToggleModal] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const {
    state: { _id, username, email, hostingBookClubs },
  } = userData;

  const handleAddRequest = (e) => {
    e.preventDefault();
    setToggleModal(true);
    const bookGroup = allUsers !== undefined && allUsers?.filter((x) => x?.username.includes(e.target.id));
    setIsAdded(true);
    setSelectedUser({
      username: bookGroup[0]?.username,
      email: bookGroup[0]?.email,
      _id: bookGroup[0]?._id,
      joinedDate: bookGroup[0]?.joinedDate,
      sub: bookGroup[0]?.sub,
    });
  };

  console.log(`hostingBookClubs:`, hostingBookClubs);
  console.log(`isAdded:`, isAdded);

  const handleRemoveRequest = (e) => {
    e.preventDefault();
    setToggleModal(true);
    const bookGroup = allUsers !== undefined && allUsers?.filter((x) => x?.username.includes(e.target.id));
    setIsAdded(false);
    setSelectedUser({
      username: bookGroup[0]?.username,
      email: bookGroup[0]?.email,
      _id: bookGroup[0]?._id,
      joinedDate: bookGroup[0]?.joinedDate,
      sub: bookGroup[0]?.sub,
    });
  };

  const handleSelection = (e) => {
    if (isAdded === true) {
      fetch("/add-member", {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ ...selectedUser, bookClubName: e.target.innerHTML }),
      }).then((response) => {
        setTimeout(() => {
          setToggleModal(false);
        }, 200);
        return response.json();
      });
    } else if (isAdded === false) {
      fetch("/remove-request", {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ ...selectedUser, bookClubName: e.target.innerHTML }),
      }).then((response) => {
        setTimeout(() => {
          setToggleModal(false);
        }, 200);
        return response.json();
      });
    }
  };

  return (
    <Container>
      {allUsers?.map((x, idx) => (
        <List key={idx}>
          <img src={`https://avatars.dicebear.com/api/avataaars/${x?.username}.svg`} alt="" />
          <Wrapper>
            <button disabled={hostingBookClubs === undefined} id={x?.username} onClick={handleRemoveRequest}>
              -
            </button>
            <p>{x?.username}</p>
            <button disabled={hostingBookClubs === undefined} id={x?.username} onClick={handleAddRequest}>
              +
            </button>
          </Wrapper>
        </List>
      ))}

      <PopUpModal trigger={toggleModal} setTrigger={setToggleModal}>
        {hostingBookClubs?.map((x) => (
          <button onClick={handleSelection}>{x?.bookClubName}</button>
        ))}
      </PopUpModal>
    </Container>
  );
};

export default SearchForMembers;
