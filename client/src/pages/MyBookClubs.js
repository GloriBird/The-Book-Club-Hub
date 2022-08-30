import React, { useEffect, useState, useContext } from "react";
import { Container, CreateClubButton } from "./pageStyles/MyBookClubs.styled";
import { useAuth0 } from "@auth0/auth0-react";
import Modal from "../components/Modal";
import { GlobalContext } from "../context/GlobalContext";

const MyBookClubs = () => {
  const { user } = useAuth0();
  const { allUsers, allBookClub } = useContext(GlobalContext);

  const [toggleModal, setToggleModal] = useState(false);

  console.log(`user:`, user);
  console.log(`allBookClub:`, allBookClub);
  const userInData = allUsers?.filter((existingUser) => existingUser?.email.includes(user?.username));

  return (
    <Container>
      <p>My Book Clubs</p>
      <CreateClubButton onClick={() => setToggleModal(true)}>Create Book Club</CreateClubButton>
      <Modal modalStatus={toggleModal} setmodalStatus={setToggleModal} />
      {}
    </Container>
  );
};

export default MyBookClubs;
