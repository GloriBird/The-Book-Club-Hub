import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: #f9ebc8;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

export const NewUserForm = styled.form`
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

export const ConfirmButton = styled.button`
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
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
`;

export const BookImg = styled.img`
  border-radius: 8px;
  width: 55%;
  filter: drop-shadow(-10px 20px 5px #f1d591);
`;

export const LandingPage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
