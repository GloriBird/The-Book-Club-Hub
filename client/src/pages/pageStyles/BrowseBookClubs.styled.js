import styled from "styled-components";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";

export const Container = styled.div`
  border: 2px solid green;
  height: auto;
  display: grid;
  align-items: center;
  text-align: center;
  justify-content: center;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr 1fr 1fr 1fr;
  /* gap: 10px 10px; */
  grid-template-areas:
    ". . . ."
    ". . . ."
    ". . . ."
    ". . . .";

  img {
    margin: 0 auto;
    width: 35%;
  }
`;

export const List = styled.li`
  margin-bottom: 2000;
  list-style: none;
  border: 2px solid blue;
  /* width: 90%; */
  text-align: center;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 15px 0 15px;
  border: 2px solid red;
`;

export const BookClubInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;
