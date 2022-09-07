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

  const {
    state: { _id, username, email, hostingBookClubs },
  } = userData;

  // console.log(`hostingBookClubs:`, hostingBookClubs[0]?.bookClubName);

  // const handleAddRequest = (e) => {
  //   e.preventDefault();
  //   fetch("/add-member", {
  //     method: "PATCH",
  //     headers: { "Content-type": "application/json" },
  //     body: JSON.stringify({ _id: _id, joinedDate: joinedDate, username: username, email: email, sub:sub }),
  //   }).then((response) => {
  //     receiveNewUserName(randomUsername);
  //     return response.json();
  //   });
  // };

  // const { username, email, _id, joinedDate, bookClubName, sub } = req.body;

  const handleAddRequest = (e) => {
    e.preventDefault();
    setToggleModal(true);
    const bookGroup = allUsers !== undefined && allUsers?.filter((x) => x?.username.includes(e.target.id));
    setSelectedUser({
      username: bookGroup[0]?.username,
      email: bookGroup[0]?.email,
      _id: bookGroup[0]?._id,
      joinedDate: bookGroup[0]?.joinedDate,
      sub: bookGroup[0]?.sub,
    });
  };

  console.log(`selectedUser:`, selectedUser);

  const handleRemoveRequest = (e) => {
    e.preventDefault();
    setToggleModal(true);

    console.log(`e:`, e.target.id);
  };

  const handleSelection = (e) => {
    console.log(`all:`, { ...selectedUser, bookClubName: e.target.innerHTML });
    // e.preventDefault();
    fetch("/add-member", {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ ...selectedUser, bookClubName: e.target.innerHTML }),
    }).then((response) => {
      return response.json();
    });
  };
  // console.log(`hostingBookClubs:`, hostingBookClubs[0]?.bookClubName);

  return (
    <Container>
      {allUsers?.map((x, idx) => (
        <List key={idx}>
          <img src={`https://robohash.org/${x?.username}`} alt="" />
          <Wrapper>
            {/* <Minus id={x?.username} onClick={handleRemoveRequest} /> */}
            <button id={x?.username} onClick={handleRemoveRequest}>
              -
            </button>
            <p>{x?.username}</p>
            <button id={x?.username} onClick={handleAddRequest}>
              +
            </button>
            {/* <Add id={x?.username} onClick={handleAddRequest} /> */}
          </Wrapper>
        </List>
      ))}

      <PopUpModal trigger={toggleModal} setTrigger={setToggleModal}>
        {hostingBookClubs.map((x) => (
          <button onClick={handleSelection}>{x?.bookClubName}</button>
        ))}
      </PopUpModal>
    </Container>
  );
};

export default SearchForMembers;
