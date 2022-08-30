import React, { useEffect, useState, useContext } from "react";
import { Container, CreateClubButton } from "./pageStyles/MyBookClubs.styled";
import { useAuth0 } from "@auth0/auth0-react";
import Modal from "../components/Modal";

const MyBookClubs = () => {
  const { user } = useAuth0();
  const [toggleModal, setToggleModal] = useState(false);

  return (
    <Container>
      <p>My Book Clubs</p>
      <CreateClubButton onClick={() => setToggleModal(true)}>Create Book Club</CreateClubButton>
      <Modal modalStatus={toggleModal} setmodalStatus={setToggleModal} />
    </Container>
  );
};

export default MyBookClubs;
