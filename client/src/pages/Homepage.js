import React, { useEffect, useState, useContext } from "react";
import { Container } from "./pageStyles/Homepage.styled";
import { GlobalContext } from "../context/GlobalContext";

const App = () => {
  const { trendingBooks } = useContext(GlobalContext);

  console.log(`trendingBooks:`, trendingBooks);
  return (
    <Container>
      <p>This is the landing page</p>
    </Container>
  );
};

export default App;
