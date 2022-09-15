import GlobalStyles from "./styles/GlobalStyled";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import NavMenu from "./NavMenu";
import Homepage from "../pages/Homepage";
import MyBookClubs from "../pages/MyBookClubs";
import WeeklyTrendingBooks from "../pages/WeeklyTrendingBooks";
import Login from "../pages/Login";
import BrowseBookClubs from "../pages/BrowseBookClubs";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import BookClub from "../pages/BookClub";
import BookClubConversation from "../pages/BookClubConversation";
import Footer from "../components/Footer";
import SearchForMembers from "../pages/SearchForMembers";
import SearchBooks from "../pages/SearchBooks";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const { user, isLoading, isAuthenticated } = useAuth0();
  console.log(`isLoading:`, isLoading);

  console.log(`isAuthenticated:`, isAuthenticated);
  return (
    <>
      {isLoading === false ? (
        <>
          <GlobalStyles />
          <BrowserRouter>
            <Wrapper>
              <NavMenu />
              <Routes>
                <Route reloadDocument path="/" element={<Homepage />}></Route>
                <Route exact reloadDocument path="/WeeklyTrendingBooks" element={<WeeklyTrendingBooks />}></Route>
                <Route exact reloadDocument path="/BrowseBookClubs" element={<BrowseBookClubs />}></Route>
                <Route
                  exact
                  reloadDocument
                  path="/SearchForMembers"
                  element={isAuthenticated ? <SearchForMembers /> : <Navigate to="/" />}
                ></Route>
                <Route
                  exact
                  reloadDocument
                  path="/MyBookClubs"
                  element={isAuthenticated ? <MyBookClubs /> : <Navigate to="/" />}
                ></Route>
                <Route
                  exact
                  reloadDocument
                  path="/BookClub/:bookClubID"
                  element={isAuthenticated ? <BookClub /> : <Navigate to="/" />}
                ></Route>
                <Route exact reloadDocument path="/SearchBooks" element={<SearchBooks />}></Route>a
                <Route
                  exact
                  reloadDocument
                  path="/BookClubConversation/:bookClubID"
                  element={isAuthenticated ? <BookClubConversation /> : <Navigate to="/" />}
                ></Route>
                <Route
                  exact
                  reloadDocument
                  path="/Login"
                  element={isAuthenticated ? <Navigate to="/" /> : <Login />}
                ></Route>
                <Route
                  exact
                  reloadDocument
                  path="/SignUp"
                  element={isAuthenticated ? <Navigate to="/" /> : <SignUp />}
                ></Route>
                <Route
                  exact
                  reloadDocument
                  path="/Profile"
                  element={isAuthenticated ? <Profile /> : <Navigate to="/" />}
                ></Route>
              </Routes>
              <Footer />
            </Wrapper>
          </BrowserRouter>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default App;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--main-background-color);
`;
