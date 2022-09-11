import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #2a1710;
`;

export const Menu = styled.nav`
  z-index: 10;
  width: 100%;
  background-color: #f9ebc8;
  padding: 7px 0;
  box-shadow: 0px -6px 15px #f2deac inset;

  ol {
    list-style-type: none;
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: space-evenly;

    li {
      color: #2a1710;
      border-bottom: 4px solid transparent;

      &:hover {
        border-bottom: 4px solid #444444;
      }
    }
  }
`;
