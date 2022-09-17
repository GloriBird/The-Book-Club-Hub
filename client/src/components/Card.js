import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";

const Card = ({ featuredBook }) => {
  return (
    <Container>
      {featuredBook.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </Container>
  );
};

export default Card;

const Container = styled.div`
  width: 100%;
  height: 200px;
  background-color: #ccc;
  font-size: 1rem;
  margin: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
