import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import styled from "styled-components";

const SignUpButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return !isAuthenticated && <Title onClick={() => loginWithRedirect({ screen_hint: "signup" })}>Sign Up</Title>;
};

export default SignUpButton;

const Title = styled.h2`
  cursor: pointer;
  border-bottom: 4px solid #f9ebc8;

  &:hover {
    border-bottom: 4px solid #444444;
  }
`;
