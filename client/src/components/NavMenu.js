import { NavLink } from "react-router-dom";
import { StyledNavLink } from "./styles/NavMenu.styled";
import { Menu } from "./styles/NavMenu.styled";

const NavMenu = () => {
  // const handleClick = () => {

  //   if (location.pathname === "/confirmed") {
  // localStorage.clear();
  // window.location.href = "/signin";
  // };

  return (
    <Menu>
      <ol>
        <li>
          <StyledNavLink to="/">
            <h3>Book Club Hub</h3>
          </StyledNavLink>
        </li>
        {/* searchbar */}

        <li>
          <StyledNavLink to="/BrowseBooks">
            <h3>Browse Books</h3>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/MyBookClubs">
            <h3>My Book Club(s)</h3>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/Login">
            <h3>Login</h3>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/SignUp">
            <h3>Sign Up</h3>
          </StyledNavLink>
        </li>
        {/* {isSignedIn ? (
        <>
          <p>Heu {user}!</p>
          <styledNavLink to="/signin" onClick={handleClick}>
            Sign Out
          </styledNavLink>
        </>
      ) : (
        <NavigationLink to="/signin">Sign In</NavigationLink>
      )} */}
      </ol>
    </Menu>
  );
};

export default NavMenu;
