import React, { useEffect, useState, useContext } from "react";

import { GlobalContext } from "./context/GlobalContext";

const App = () => {
  const { trendingBooks } = useContext(GlobalContext);

  return (
    <div>
      <p>hello</p>
    </div>
  );
};

export default App;
