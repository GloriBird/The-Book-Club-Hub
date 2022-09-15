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
  display: flex;
  flex-direction: column;
  width: 100%;
  grid-area: ChatArea;
  overflow: auto;
  height: 80vh;
  border: ${(props) => (props.joined ? "5px solid #f9ebc8" : "#FEFBE7")};
  background-color: ${(props) => (props.joined ? "white" : "#FEFBE7")};
  border-radius: 10px;
`;

export const InputAndButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  height: 12%;
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
  border-radius: 5px;
  width: 10%;
  padding: 7px 0;
  background-color: ${(props) => (props.disabled ? "#dcdcdc" : "#90c8ac")};
  box-shadow: ${(props) => (props.disabled ? "0px -4px 7px #dcdcdc inset" : "0px -6px 7px #73a9ad inset")};

  p {
    font-weight: bold;
    color: white;
  }

  &:hover {
    cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  }
`;

export const CurrentUser = styled.div`
  border-radius: 5px;
  text-align: right;

  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const OtherUser = styled.div`
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
  width: 80px;
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

export const BookArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const JoinButton = styled.button`
  border: none;
  font-size: 2rem;
  border-radius: 5px;
  font-weight: bold;
  color: white;

  margin: auto;
  padding: 10px 25px;
  background-color: ${(props) => (props.disabled ? "#dcdcdc" : "#a1cf8b")};
  box-shadow: ${(props) => (props.disabled ? "0px -4px 7px #dcdcdc inset" : "0px -4px 7px #68a033 inset")};

  &:hover {
    cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  }
`;
