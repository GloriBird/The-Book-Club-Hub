import GlobalStyles from "./styles/GlobalStyled";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavMenu from "./NavMenu";
import Homepage from "../pages/Homepage";
import MyBookClubs from "../pages/MyBookClubs";
import WeeklyTrendingBooks from "../pages/WeeklyTrendingBooks";
import BrowseBookClubs from "../pages/BrowseBookClubs";
import Profile from "../pages/Profile";
import BookClub from "../pages/BookClub";
import BookClubConversation from "../pages/BookClubConversation";
import Footer from "../components/Footer";
import SearchForMembers from "../pages/SearchForMembers";
import BookDetails from "../pages/BookDetails";
import SearchBooks from "../pages/SearchBooks";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import JoinBookClub from "../pages/JoinBookClub";
const App = () => {
  const { isLoading, isAuthenticated } = useAuth0();

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
                  path="/BookDetails/:author/:bookId/:details"
                  element={<BookDetails />}
                ></Route>
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
                  element={isAuthenticated ? <BookClub /> : <JoinBookClub />}
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
                  path="/Profile"
                  element={isAuthenticated ? <Profile /> : <Navigate to="/" />}
                ></Route>
              </Routes>
              <Footer />
            </Wrapper>
          </BrowserRouter>
        </>
      ) : (
        <Container>
          <GlobalStyles />

          <Loading>
            <p>Loading...</p>
          </Loading>
        </Container>
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

const Container = styled.div`
  height: 100vh;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: var(--main-background-color);
`;

const Loading = styled.div`
  margin: auto;

  p {
    font-size: 2rem;
    font-weight: bold;
  }
`;
