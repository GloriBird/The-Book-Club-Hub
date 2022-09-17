import styled from "styled-components";
import { IoClose } from "react-icons/io5";

export const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Wrapper = styled.div`
  width: 500px;
  height: 500px;
  border-radius: 12px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  display: inline-block;
  text-align: center;
  margin-top: 30px;
  padding: 10px;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  width: 100%;
`;

export const CloseModal = styled(IoClose)`
  cursor: pointer;
  width: 7%;
  height: auto;
`;
