import React, { createContext, useState, useEffect, useContext } from "react";
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [trendingBooks, setTrendingBooks] = useState();
  const [allUsers, setAllUsers] = useState();
  const [allBookClub, setAllBookClubs] = useState();

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

  useEffect(() => {
    fetch(`/browse-book-clubs`)
      .then((res) => res.json())
      .then((data) => {
        console.log(`browse-book-clubs:`, data);
        return setAllBookClubs(data.BookClubs);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        trendingBooks,
        allUsers,
        allBookClub,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
