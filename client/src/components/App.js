import GlobalStyles from "./styles/GlobalStyled";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import NavMenu from "./NavMenu";
import Homepage from "../pages/Homepage";
import MyBookClubs from "../pages/MyBookClubs";
import BrowseBooks from "../pages/BrowseBooks";
import Login from "../pages/Login";
import BrowseBookClubs from "../pages/BrowseBookClubs";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import Chat from "../pages/chat";
import BookClub from "../pages/BookClub";
import BookClubConversation from "../pages/BookClubConversation";
import Footer from "../components/Footer";
import SearchForMembers from "../pages/SearchForMembers";
// import { CurrentUserContext } from "../context/CurrentUserContext";

const App = () => {
  // const userData = useContext(CurrentUserContext);

  // const {
  //   state: { _id, username, email },
  // } = userData;

  // console.log(`_id:`, _id, `username:`, username, `email:`, email);
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <NavMenu />
        <Routes>
          <Route reloadDocument path="/" element={<Homepage />}></Route>

          <Route exact path="/BrowseBooks" element={<BrowseBooks />}></Route>
          <Route exact path="/BrowseBookClubs" element={<BrowseBookClubs />}></Route>
          <Route exact path="/SearchForMembers" element={<SearchForMembers />}></Route>
          <Route exact path="/MyBookClubs" element={<MyBookClubs />}></Route>
          <Route exact path="/Chat" element={<Chat />}></Route>

          {/* <Route exact path="/Chat" element={hasLoaded ? <Chat /> : <Navigate to="/" />}></Route> */}
          <Route exact path="/BookClub/:bookClubID" element={<BookClub />}></Route>

          <Route exact path="/BookClubConversation/:bookClubID" element={<BookClubConversation />}></Route>

          <Route exact path="/Login" element={<Login />}></Route>
          <Route exact path="/SignUp" element={<SignUp />}></Route>
          <Route exact path="/Profile" element={<Profile />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
