import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #2a1710;

  h4:hover {
    background-color: #dae5d0;
    border-radius: 5px;
    margin: 0;
  }
`;

export const Menu = styled.nav`
  z-index: 10;
  width: 100%;
  background-color: #f9ebc8;
  padding: 7px 0;
  box-shadow: 0px -6px 7px #eed493 inset;

  ol {
    list-style-type: none;
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: space-evenly;

    li {
      color: #2a1710;
      border-bottom: 4px solid transparent;
      height: 100%;

      &:hover {
        border-bottom: 4px solid #444444;
        cursor: pointer;
      }
    }

    li:nth-child(2) {
      border-bottom: 4px solid transparent;
      cursor: pointer;
    }
  }
`;

export const DropdownOptions = styled.div`
  display: none;
  position: absolute;
  width: 130%;
  /* top: calc(100% + 0.15rem); */
  background-color: #f9ebc8;
  padding: 1rem;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: -6px 4px 10px -1px rgba(0, 0, 0, 0.31);
  line-height: 2rem;

  &:hover {
    display: block;
  }
`;

export const Dropdown = styled.div`
  position: relative;

  &:hover {
    ${DropdownOptions} {
      display: block;
    }
  }
`;
