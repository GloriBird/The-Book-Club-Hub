import React, { useEffect, useState, useContext } from "react";

import { GlobalContext } from "./context/GlobalContext";

const App = () => {
  const { trendingBooks } = useContext(GlobalContext);

  return (
    <div>
      <ol>
        {trendingBooks?.map((x, idx) => {
          return <li key={idx}>{x?.title}</li>;
        })}
      </ol>
    </div>
  );
};

export default App;
