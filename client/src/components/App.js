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
import Footer from "../components/Footer";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <NavMenu />
        <Routes>
          <Route reloadDocument path="/" element={<Homepage />}></Route>

          <Route exact path="/BrowseBooks" element={<BrowseBooks />}></Route>
          <Route exact path="/BrowseBookClubs" element={<BrowseBookClubs />}></Route>
          <Route exact path="/MyBookClubs" element={<MyBookClubs />}></Route>
          <Route exact path="/Chat" element={<Chat />}></Route>

          {/* <Route exact path="/Chat" element={hasLoaded ? <Chat /> : <Navigate to="/" />}></Route> */}

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
