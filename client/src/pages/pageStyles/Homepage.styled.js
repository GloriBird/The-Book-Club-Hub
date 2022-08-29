import styled from "styled-components";

export const Container = styled.div`
  color: blue;
  border: 2px solid red;

  ol {
    list-style: none;
    display: flex;
  }

  li {
    display: flex;
    flex-direction: column;
    border: 2px solid green;
    width: 500px;
  }
`;
