import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #2a1710;
  /* font-size: 2rem; */
`;

export const Menu = styled.nav`
  z-index: 10;
  width: 100%;

  ol {
    list-style-type: none;
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: space-evenly;

    li {
      color: #2a1710;
      padding: 0.5% 1%;
      border-radius: 5px;

      &:hover {
        background-color: #f9ebc8;
        /* padding: 3% 5%; */
      }
    }
  }
`;
