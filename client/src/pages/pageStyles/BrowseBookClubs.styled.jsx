import styled from "styled-components";

export const Container = styled.div`
  /* border: 2px solid green; */
  height: auto;
  display: grid;
  align-items: center;
  text-align: center;
  justify-content: center;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 1fr 1fr 1fr;
  /* gap: 10px 10px; */
  background-color: #fefbe7;
  grid-template-areas:
    ". . . ."
    ". . . ."
    ". . . .";

  img {
    margin: 0 auto;
    border-radius: 5px;
    height: 200px;
    width: fit-content;
  }
`;

export const List = styled.li`
  list-style: none;
  /* border: 2px solid blue; */
  text-align: center;
  margin-top: 50px;
  /* width: 250px; */
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 15px 15px 0 15px; */
`;

export const BookClubInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;

export const AddRemoveButtons = styled.button`
  list-style: none;
  text-align: center;
  background-color: #dae5d0;
  box-shadow: 0px -4px 7px #afc39e inset;
  border: none;
  border-radius: 5px;
  height: 30px;
  width: 30px;

  &:hover {
    cursor: pointer;
  }
`;
