import styled from "styled-components";

export const Messenger = styled.div`
  height: calc(100vh - 70px);
  display: flex;
`;

export const MainMenu = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 5vh;
  background-color: lightblue;
  align-items: center;
`;

export const ChatMenu = styled.div`
  flex: 3.5;

  @media (max-width: 768px) {
    .chatMenu {
      flex: 1;
    }
  }
`;

export const ChatMenuInput = styled.input`
  width: 100%;
  margin-top: 150%;
  padding: 10px 0;
  border: none;
  border-bottom: 1px solid lightgray;
  /* display: none; */
`;

export const ChatBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  padding: 10px;
  height: 80%;
  border: 2px solid green;
`;

export const ChatBoxTop = styled.div`
  /* margin-top: 90%; */
  height: 100%;
  overflow-y: scroll;
  padding-right: 10px;
`;

export const ChatBoxBottom = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ChatMessageInput = styled.textarea`
  width: 90%;
  height: 90px;
  padding: 10px;
`;

export const ChatSubmitButton = styled.button`
  width: 70px;
  height: 40px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: teal;
  color: white;
`;

export const ChatOnlineWrapper = styled.div`
  flex: 3;
  /* flex: 1px; */
`;

//   .chatMenuWrapper,
//   .chatBoxWrapper,
//   .chatOnlineWrapper {
//     padding: 10px;
//     height: 100%;
//   }

export const ChatMenuWrapper = styled.div`
  padding: 10px;
  height: 100%;
`;

export const NoConversationText = styled.div`
  position: absolute;
  top: 10%;
  font-size: 50px;
  color: rgb(224, 220, 220);
  cursor: default;
`;

export const ChatBox = styled.div`
  /* flex: 5.5; */
  flex: 10;
`;

export const ChatOnline = styled.div`
  flex: 3;
`;

/* @media screen and (max-width: 768px) {
    .chatMenu {
      flex: 1;
    }
  
    .chatMenuInput {
      display: none;
    }
  
    .chatBox{
      flex: 10;
    }
  
    .chatOnline{
      flex: 1px;
    }
} */
