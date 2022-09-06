import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  border: 2px solid green;
`;

export const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MessageTop = styled.div`
  display: flex;
`;

export const MessageImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;
export const MessageText = styled.p`
  padding: 10px;
  border-radius: 20px;
  background-color: #1877f2;
  color: white;
  max-width: 300px;
`;
export const MessageBottom = styled.div`
  font-size: 12px;
  margin-top: 10px;
  /* background-color: blue; */
`;

export const CurrentUser = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  align-items: flex-end;
  padding-top: 1100px;
  /* background-color: blue; */
`;
export const MessageFromFriend = styled.p`
  padding: 10px;
  border-radius: 20px;
  background-color: lightcoral;
  color: white;
  max-width: 300px;
`;

export const OtherText = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  align-items: flex-start;
`;
