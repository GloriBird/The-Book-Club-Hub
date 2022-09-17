import styled from "styled-components";

export const Container = styled.div`
  height: auto;
  display: grid;
  align-items: center;
  text-align: center;
  justify-content: center;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 1fr 1fr 1fr;
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
  text-align: center;
  margin-top: 50px;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BookClubInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;

export const AddButton = styled.button`
  list-style: none;
  text-align: center;
  background-color: ${(props) => (props.disabled ? "#dcdcdc" : "#a1cf8b")};
  box-shadow: ${(props) => (props.disabled ? "0px -4px 7px #dcdcdc inset" : "0px -4px 7px #68a033 inset")};

  border: none;
  border-radius: 5px;
  height: 30px;
  width: 30px;
  color: white;
  font-weight: bolder;
  font-size: 1rem;

  &:hover {
    cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  }

  &:focus {
    background-color: green;
  }
`;

export const RemoveButton = styled.button`
  list-style: none;
  text-align: center;
  background-color: ${(props) => (props.disabled ? "#dcdcdc" : "#de5151")};
  box-shadow: ${(props) => (props.disabled ? "0px -4px 7px #dcdcdc inset" : "0px -4px 7px #b01818 inset")};
  border: none;
  border-radius: 5px;
  height: 30px;
  width: 30px;
  color: white;
  font-weight: bolder;
  font-size: 1rem;

  &:hover {
    cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  }

  &:focus {
    background-color: darkred;
  }
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;

  p {
    font-size: 2rem;
    font-weight: bold;
  }
`;

export const SearchedMembers = styled.p`
  padding: 0 2%;
`;
