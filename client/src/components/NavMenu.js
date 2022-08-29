import { StyledNavLink } from "./styles/NavMenu.styled";
import { Menu } from "./styles/NavMenu.styled";
import LoginButton from "./LoginButton";
import SignOutButton from "./SignOutButton";
import { useAuth0 } from "@auth0/auth0-react";

const NavMenu = () => {
  const { user, isAuthenticated } = useAuth0();
  const { isLoading, error } = useAuth0();

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
          <StyledNavLink to="/BrowseBookClubs">
            <h3>Browse Clubs</h3>
          </StyledNavLink>
        </li>
        {isAuthenticated && (
          <>
            <li>
              <StyledNavLink to="/MyBookClubs">
                <h3>My Book Club(s)</h3>
              </StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="/Profile">
                <h3>Profile</h3>
              </StyledNavLink>
            </li>
          </>
        )}
        {error && <p>Login Error</p>}
        {!error && isLoading && <p>Loading...</p>}
        {!error && !isLoading && (
          <>
            <LoginButton />
            <SignOutButton />
          </>
        )}
      </ol>
    </Menu>
  );
};

export default NavMenu;