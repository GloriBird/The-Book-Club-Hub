import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import styled from "styled-components";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return !isAuthenticated && <Title onClick={() => loginWithRedirect()}>Login</Title>;
};

export default LoginButton;

const Title = styled.h2`
  cursor: pointer;
  border-bottom: 4px solid transparent;

  &:hover {
    border-bottom: 4px solid #444444;
  }
`;
