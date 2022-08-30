import React, { useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";

const Modal = ({ modalStatus, setmodalStatus }) => {
  const modalRef = useRef();

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

  return (
    <>
      {modalStatus && (
        <Container ref={modalRef} onClick={closeModal}>
          <Wrapper>
            <ModalContent>
              <h2>Create Your Book Club</h2>
              <p>Book Club Name here</p>
              <button>Create</button>
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
  text-align: center;
  margin-top: 10px;
  z-index: 10;
  position: fixed;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    margin: 1rem;
  }

  button {
    padding: 10px 24px;
    background-color: green;
    border: none;
  }
`;

const CloseModal = styled(IoClose)`
  cursor: pointer;
  position: relative;
  left: 210px;
  bottom: 140px;
  width: 30px;
  height: auto;
  padding: 0;
  z-index: 100;
`;
// const Title = styled.div`
//   display: inline-block;
//   text-align: center;
//   margin-top: 10px;
// `;
