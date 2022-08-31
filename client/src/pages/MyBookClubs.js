import React, { useState } from "react";
import { Container, CreateClubButton } from "./pageStyles/MyBookClubs.styled";
import Modal from "../components/Modal";
// import { CurrentUserContext } from "../context/CurrentUserContext";
// import { useAuth0 } from "@auth0/auth0-react";

const MyBookClubs = () => {
  const [toggleModal, setToggleModal] = useState(false);
  // const userData = useContext(CurrentUserContext);
  // const { user, allUsers } = useAuth0();

  // const {
  //   actions: { receiveCurrentUser },
  // } = userData;

  // const data = allUsers?.filter((existingUser) => existingUser?.email.includes(user?.username));
  // console.log(`userData from My Book Club:`, data);

  // useEffect(() => {
  //   const userInData = allUsers?.filter((existingUser) => existingUser?.email.includes(user?.username));
  //   console.log(`userInData:`, userInData);
  //   receiveCurrentUser(userInData);
  // }, [user]);

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
      <Modal modalStatus={toggleModal} setmodalStatus={setToggleModal} />
      {}
    </Container>
  );
};

export default MyBookClubs;
