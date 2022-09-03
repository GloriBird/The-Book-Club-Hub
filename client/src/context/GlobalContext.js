import React, { createContext, useState, useEffect, useContext } from "react";
// import { useAuth0 } from "@auth0/auth0-react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [trendingBooks, setTrendingBooks] = useState();
  const [allUsers, setAllUsers] = useState();
  const [allUsernames, setAllUsernames] = useState();
  const [allBookClub, setAllBookClubs] = useState();
  const [isAllUsersLoading, setIsAllUsersLoading] = useState(true);
  // const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    fetch("/weeklyTrendingBooks")
      .then((res) => res.json())
      .then((weeksTrendingBooks) => {
        setTrendingBooks(weeksTrendingBooks?.data);
      });
  }, []);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     setIsAllUsersLoading(true);
  //     fetch(`/users`)
  //       .then((res) => res.json())
  //       .then((listOfUser) => {
  //         setAllUsers(listOfUser.account);
  //         const getAllUsernames = listOfUser?.account.map(({ username }) => username);
  //         setAllUsernames(getAllUsernames);
  //         setIsAllUsersLoading(false);
  //       });
  //   }
  // }, []);

  useEffect(() => {
    setIsAllUsersLoading(true);
    const test = async () => {
      const getData = await fetch(`/users`);
      const listOfUser = await getData.json();
      const allProfiles = await listOfUser.account;
      setAllUsers(allProfiles);
      const getAllUsernames = await allProfiles.map(({ username }) => username);
      setAllUsernames(getAllUsernames);
    };
    test();
  }, []);

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
