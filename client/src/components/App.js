import GlobalStyles from "./styles/GlobalStyled";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavMenu from "./NavMenu";
import Homepage from "../pages/Homepage";
import MyBookClubs from "../pages/MyBookClubs";
import BrowseBooks from "../pages/BrowseBooks";
import Footer from "../components/Footer";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <NavMenu />
        <Routes>
          <Route exact path="/" element={<Homepage />}></Route>
          <Route exact path="/BrowseBooks" element={<BrowseBooks />}></Route>
          <Route exact path="/MyBookClubs" element={<MyBookClubs />}></Route>
          {/* <Route exact path="/" element={<UserLogin />}></Route> */}
          {/* <Route exact path="/" element={<SignUp />}></Route> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
