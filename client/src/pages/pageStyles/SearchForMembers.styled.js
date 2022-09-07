import styled from "styled-components";

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
  z-index: -1000;
`;
