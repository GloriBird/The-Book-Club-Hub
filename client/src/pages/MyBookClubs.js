import React, { useState, useContext, useEffect } from "react";
import { Container, CreateClubButton } from "./pageStyles/MyBookClubs.styled";
import Modal from "../components/Modal";
import { useAuth0 } from "@auth0/auth0-react";

const MyBookClubs = () => {
  const [toggleModal, setToggleModal] = useState(false);
  // const { user, allUsers } = useAuth0();

  // console.log(`userData from My Book Club:`, data);

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
