import React from "react";
import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [trendingBooks, setTrendingBooks] = useState();
  const [allUsers, setAllUsers] = useState();

  useEffect(() => {
    fetch("/weeklyTrendingBooks")
      .then((res) => res.json())
      .then((weeksTrendingBooks) => {
        setTrendingBooks(weeksTrendingBooks?.data);
      });
  }, []);

  useEffect(() => {
    fetch(`/users`)
      .then((res) => res.json())
      .then((listOfUser) => {
        setAllUsers(listOfUser.account);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        trendingBooks,
        allUsers,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
