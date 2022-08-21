import React, { useEffect, useState, useContext } from "react";

import { GlobalContext } from "./context/GlobalContext";

const App = () => {
  const { trendingBooks } = useContext(GlobalContext);

  console.log(`trendingBooks:`, trendingBooks);
  return (
    <div>
      <p>hello</p>
    </div>
  );
};

export default App;
