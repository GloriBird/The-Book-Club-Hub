import React from "react";
import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [trendingBooks, setTrendingBooks] = useState();

  useEffect(() => {
    fetch("/weeklyTrendingBooks")
      .then((res) => res.json())
      .then((weeksTrendingBooks) => {
        setTrendingBooks(weeksTrendingBooks.data);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        trendingBooks,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
