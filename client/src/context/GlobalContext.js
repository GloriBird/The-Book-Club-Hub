import React, { createContext, useState, useEffect, useContext } from "react";
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
  const { user } = useAuth0();

  useEffect(() => {
    const getWeeklyBooks = async () => {
      const thisWeeksBooks = await fetch("https://openlibrary.org/trending/weekly.json");
      const listOfUser = await thisWeeksBooks.json();
      const currentWeeksBooks = await listOfUser?.works?.map((x) => {
        const weeklyBooks = {
          title: x?.title,
          first_published: x?.first_publish_year,
          cover: x?.cover_edition_key,
          author: x?.author_name,
          author_key: x?.author_key,
        };
        return weeklyBooks;
      });
      setWeeklyTrendingBooks(currentWeeksBooks);
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
  console.log(`onlineUsers:`, onlineUsers);

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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
