import React, { createContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState();
  const [allUsernames, setAllUsernames] = useState();
  const [allBookClub, setAllBookClubs] = useState();
  const [currentBookClubMembers, setCurrentBookClubMembers] = useState();
  const [bookClubChat, setBookClubChat] = useState();
  const [weeklyTrendingBooks, setWeeklyTrendingBooks] = useState();
  const [allBookClubNames, setAllBookClubNames] = useState();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isAllUsersLoading, setIsAllUsersLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const { user } = useAuth0();

  useEffect(() => {
    const getWeeklyBooks = async () => {
      setHasLoaded(false);
      const thisWeeksBooks = await fetch("https://openlibrary.org/trending/weekly.json");
      const listOfBooks = await thisWeeksBooks.json();
      const currentWeeksBooks = await listOfBooks?.works?.map((x) => {
        const weeklyBooks = {
          title: x?.title,
          first_published: x?.first_publish_year,
          cover: x?.cover_edition_key,
          author: x?.author_name,
          author_key: x?.author_key,
          works: x?.key?.split("/works/")[1],
        };
        return weeklyBooks;
      });
      setWeeklyTrendingBooks(currentWeeksBooks);
      setHasLoaded(true);
    };
    getWeeklyBooks();
  }, []);

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
        const getAllBookClubNames = data.BookClubs.map(({ bookClubName }) => bookClubName);
        setAllBookClubNames(getAllBookClubNames);
        setAllBookClubs(data.BookClubs);
      });
  }, []);

  const userInData = allUsers?.some((existingUser) => existingUser?.sub.includes(user?.sub));

  return (
    <GlobalContext.Provider
      value={{
        allUsers,
        weeklyTrendingBooks,
        allBookClub,
        isAllUsersLoading,
        allUsernames,
        userInData,
        allBookClubNames,
        setCurrentBookClubMembers,
        currentBookClubMembers,
        bookClubChat,
        setBookClubChat,
        onlineUsers,
        setOnlineUsers,
        hasLoaded,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
