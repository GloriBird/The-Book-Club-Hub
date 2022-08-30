import React, { useContext, useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import { useAuth0 } from "@auth0/auth0-react";
import { GlobalContext } from "../context/GlobalContext";

const Modal = ({ modalStatus, setmodalStatus }) => {
  const [bookClubName, setBookClubName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { allUsers } = useContext(GlobalContext);

  const modalRef = useRef();
  const { user } = useAuth0();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setmodalStatus(false);
    }
  };

  useEffect(() => {
    if (modalStatus === true) {
      document.body.style.overflow = "hidden";
      return () => (document.body.style.overflow = "unset");
    }
  }, [modalStatus]);

  console.log(`user:`, user);
  const createBookClub = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const userInData = allUsers?.filter((existingUser) => existingUser?.email.includes(user?.email));
    let host = user.nickname;

    // let host = userInData[0]?.username;
    let members = userInData;
    const bookClubCreated = { bookClubName, host, members };
    fetch("/create-book-club", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookClubCreated),
    }).then(() => {
      setIsLoading(false);
    });
  };

  return (
    <>
      {modalStatus && (
        <Container ref={modalRef} onClick={closeModal}>
          <Wrapper>
            <ModalContent>
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
                      setmodalStatus(false);
                    }, 1000)
                  }
                  disabled={bookClubName.replace(/\s+/g, "").trim().length < 2}
                >
                  {isLoading ? "Loading..." : "Create"}
                </CreateButton>
              </BookForm>

              <CloseModal onClick={() => setmodalStatus(false)} />
            </ModalContent>
          </Wrapper>
        </Container>
      )}
    </>
  );
};

export default Modal;

const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Wrapper = styled.div`
  width: 500px;
  height: 500px;
  border-radius: 12px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  padding: 25px;
  display: inline-block;
  justify-content: space-evenly;
  text-align: center;
  margin-top: 10px;
  z-index: 10;
  position: fixed;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  height: 100%;
`;

const CloseModal = styled(IoClose)`
  cursor: pointer;
  position: relative;
  left: 210px;
  bottom: 360px;
  width: 30px;
  height: auto;
  padding: 0;
  z-index: 100;
`;

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
