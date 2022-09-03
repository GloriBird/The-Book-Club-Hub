import React, { createContext, useState, useEffect, useContext } from "react";
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [trendingBooks, setTrendingBooks] = useState();
  const [allUsers, setAllUsers] = useState();
  const [allUsernames, setAllUsernames] = useState();
  const [allBookClub, setAllBookClubs] = useState();
  const [isAllUsersLoading, setIsAllUsersLoading] = useState(true);

  useEffect(() => {
    fetch("/weeklyTrendingBooks")
      .then((res) => res.json())
      .then((weeksTrendingBooks) => {
        setTrendingBooks(weeksTrendingBooks?.data);
      });
  }, []);

  useEffect(() => {
    setIsAllUsersLoading(true);
    fetch(`/users`)
      .then((res) => res.json())
      .then((listOfUser) => {
        setAllUsers(listOfUser.account);
        const getAllUsernames = listOfUser?.account.map(({ username }) => username);
        setAllUsernames(getAllUsernames);
        setIsAllUsersLoading(false);
      });
  }, []);

  console.log(`allUsernames:`, allUsernames);

  useEffect(() => {
    fetch(`/browse-book-clubs`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(`browse-book-clubs:`, data);
        return setAllBookClubs(data.BookClubs);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        trendingBooks,
        allUsers,
        allBookClub,
        isAllUsersLoading,
        allUsernames,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
