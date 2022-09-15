import styled from "styled-components";
import ScrollToBottom from "react-scroll-to-bottom";

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.1fr 0.8fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: "Book ChatArea Members";
  gap: 30px;
`;

export const ChatForm = styled.div`
  border: 5px solid #f9ebc8;
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  grid-area: ChatArea;
  overflow: auto;
  height: 80vh;
  background-color: white;
  border-radius: 10px;
`;

export const InputAndButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  height: 10%;
  margin-bottom: 10px;
`;

export const MessageBox = styled.textarea`
  background-color: #f4f4f4;
  width: 85%;
  resize: none;
  outline: none;
  border-radius: 5px;
  overflow: hidden;
`;

export const SendButton = styled.button`
  border: none;
  background-color: lightgreen;
  border-radius: 5px;
  width: 10%;
`;

export const CurrentUser = styled.div`
  border-radius: 5px;
  text-align: right;
  /* width: 200px; */
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const OtherUser = styled.div`
  /* background-color: green; */
  width: fit-content;
  margin-right: 17%;
  text-align: left;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export const Wrapper = styled.div`
  text-align: left;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
`;

export const Scrolling = styled(ScrollToBottom)`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
`;

export const ProfileImg = styled.img`
  /* height: 60px; */
  width: 80px;
  /* height: 80px; */
  background-color: #abd9ff;
  border: 3px solid #abd9ff;
  border-radius: 50px;
`;

export const ProfileTime = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;

  p {
    font-size: 0.6rem;
    text-align: center;
    margin-right: 20px;
  }
`;

export const MsgArea = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 5px solid #abd9ff; */
  height: fit-content;
  border-radius: 5px;
  padding: 10px 10px;
  background-color: #abd9ff;
  width: fit-content;

  justify-content: center;
  margin: auto 0 auto 120px;

  p {
    /* width: 420px; */
    text-align: left;
  }
`;

export const OtherMemberMsgArea = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  border-radius: 5px;
  padding: 10px 10px;
  background-color: #c2ded1;
  width: fit-content;
  justify-content: center;
  margin: auto 0;
`;

export const FriendMsg = styled.p`
  background-color: #c2ded1;
`;

export const OtherProfileImg = styled.img`
  width: 80px;
  background-color: #c2ded1;
  border: 4px solid #c2ded1;
  border-radius: 50px;
`;

export const OtherProfileTime = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;

  p {
    font-size: 0.6rem;
    text-align: center;
    margin-right: 20px;
  }
`;
