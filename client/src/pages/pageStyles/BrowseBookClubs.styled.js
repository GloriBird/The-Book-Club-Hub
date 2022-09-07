import styled from "styled-components";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";

export const Container = styled.div`
  border: 2px solid green;
  height: 85vh;
  display: grid;
  align-items: center;
  text-align: center;
  justify-content: center;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr 1fr 1fr 1fr;
  gap: 10px 10px;
  grid-template-areas:
    ". . . ."
    ". . . ."
    ". . . ."
    ". . . .";

  img {
    margin: 0 auto;
  }
`;

export const List = styled.li`
  margin-bottom: 2000;
  list-style: none;
  /* border: 2px solid green; */

  /* p {
    padding: 5px 15px 0 15px;
  } */
`;

export const Add = styled(AiOutlinePlusCircle)`
  cursor: pointer;
  width: 9%;
  height: auto;
`;

export const Minus = styled(AiOutlineMinusCircle)`
  cursor: pointer;
  width: 9%;
  height: auto;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 15px 0 15px;
`;
