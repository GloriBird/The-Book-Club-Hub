import React from "react";
import { PopUp } from "./styles/PopUpModal.styled";
import { InsidePopUp } from "./styles/PopUpModal.styled";
import { CloseButton } from "./styles/PopUpModal.styled";

const PopUpModal = (props) => {
  return props.trigger ? (
    <PopUp>
      <InsidePopUp>
        <CloseButton onClick={() => props.setTrigger(false)}>close</CloseButton>
        {props.children}
      </InsidePopUp>
    </PopUp>
  ) : (
    ""
  );
};

export default PopUpModal;

// const Container = styled.div`
//   position: fixed;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100vw;
//   height: 100vh;
//   background-color: rgba(0, 0, 0, 0.5);
// `;

// const Wrapper = styled.div`
//   width: 500px;
//   height: 500px;
//   border-radius: 12px;
//   background-color: white;
//   box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
//   display: flex;
//   flex-direction: column;
//   padding: 25px;
//   display: inline-block;
//   justify-content: space-evenly;
//   text-align: center;
//   margin-top: 10px;
//   z-index: 10;
//   position: fixed;
// `;

// const ModalContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-evenly;
//   align-items: center;

//   height: 100%;
// `;

// const CloseModal = styled(IoClose)`
//   cursor: pointer;
//   position: relative;
//   left: 210px;
//   bottom: 360px;
//   width: 30px;
//   height: auto;
//   padding: 0;
//   z-index: 100;
// `;

// const BookForm = styled.form`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   width: 100%;

//   input[type="text"] {
//     margin: 10px 0;
//     width: 300px;
//     text-align: center;
//   }
// `;

// const CreateButton = styled.button`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   background-color: green;
//   border: none;
//   padding: 2% 7%;
//   margin-top: 40px;
//   width: 100px;
//   background-color: var(--color-pale-forest-green);
//   opacity: ${(props) => (props.changeOpacity ? 1 : 0.3)};
//   cursor: ${(props) => (props.changeOpacity ? "pointer" : "default")};
// `;
