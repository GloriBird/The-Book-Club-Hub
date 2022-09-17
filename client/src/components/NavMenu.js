import { StyledNavLink } from "./styles/NavMenu.styled";
import { Menu, Dropdown, DropdownOptions } from "./styles/NavMenu.styled";
import LoginButton from "./LoginButton";
import SignOutButton from "./SignOutButton";
import SignUpButton from "./SignUpButton";
import { useAuth0 } from "@auth0/auth0-react";

const NavMenu = () => {
  const { isAuthenticated, isLoading, error } = useAuth0();

  return (
    <Menu>
      <ol>
        <li>
          <StyledNavLink reloadDocument to="/">
            <h2>Book Club Hub</h2>
          </StyledNavLink>
        </li>
        <li>
          <Dropdown>
            <h2>Browse Books</h2>
            <DropdownOptions>
              <StyledNavLink reloadDocument to="/SearchBooks">
                <h4>Search Books</h4>
              </StyledNavLink>
              <StyledNavLink reloadDocument to="/WeeklyTrendingBooks">
                <h4>Weekly Trending Books</h4>
              </StyledNavLink>
            </DropdownOptions>
          </Dropdown>
        </li>
        <li>
          <div>
            <StyledNavLink reloadDocument to="/BrowseBookClubs">
              <h2>Browse Clubs</h2>
            </StyledNavLink>
          </div>
        </li>
        {isAuthenticated && (
          <>
            <li>
              <StyledNavLink reloadDocument to="/SearchForMembers">
                <h2>Search New Members</h2>
              </StyledNavLink>
            </li>
            <li>
              <StyledNavLink reloadDocument to="/MyBookClubs">
                <h2>My Book Club(s)</h2>
              </StyledNavLink>
            </li>
            <li>
              <StyledNavLink reloadDocument to="/Profile">
                <h2>Profile</h2>
              </StyledNavLink>
            </li>
          </>
        )}
        {error && <p>Login Error</p>}
        {!error && isLoading && <p>Loading...</p>}
        {!error && !isLoading && (
          <>
            <SignUpButton />
            <LoginButton />
            <SignOutButton />
          </>
        )}
      </ol>
    </Menu>
  );
};

export default NavMenu;
