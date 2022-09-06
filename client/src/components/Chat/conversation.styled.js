import styled from "styled-components";

export const Conversation = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: lightgray;
  }
`;

export const ConversationImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
`;

export const ConversationName = styled.span`
  font-weight: 500;

  @media (max-width: 768px) {
    flex: 1;
  }
`;
