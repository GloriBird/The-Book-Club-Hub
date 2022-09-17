import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import styled from "styled-components";

const SignOutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return isAuthenticated && <Title onClick={() => logout()}>Sign Out</Title>;
};

export default SignOutButton;

const Title = styled.h2`
  cursor: pointer;
  border-bottom: 4px solid transparent;

  &:hover {
    border-bottom: 4px solid #444444;
  }
`;
