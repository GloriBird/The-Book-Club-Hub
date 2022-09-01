import React, { useEffect, useRef } from "react";

import { Container, Wrapper, ModalContent, CloseModal } from "./styles/PopUpModal.styled";

const PopUpModal = (props) => {
  const modalRef = useRef();

  useEffect(() => {
    if (props.trigger === true) {
      document.body.style.overflow = "hidden";
      return () => (document.body.style.overflow = "unset");
    }
  }, [props.trigger]);

  const closePopUp = (e) => {
    if (modalRef.current === e.target) {
      props.setTrigger(false);
    }
  };

  return (
    <>
      {props.trigger && (
        <Container ref={modalRef} onClick={closePopUp}>
          <Wrapper>
            <ModalContent>
              <CloseModal onClick={() => props.setTrigger(false)} />
            </ModalContent>
            {props.children}
          </Wrapper>
        </Container>
      )}
    </>
  );
};

export default PopUpModal;
