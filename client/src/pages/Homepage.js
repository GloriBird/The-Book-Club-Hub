import React, { useEffect, useState, useContext } from "react";
import { Container } from "./pageStyles/Homepage.styled";
import { GlobalContext } from "../context/GlobalContext";
import Carousel from "react-elastic-carousel";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import PopUpModal from "../components/PopUpModal";

const App = () => {
  const { trendingBooks, allUsers } = useContext(GlobalContext);
  const [currentUser, setCurrentUser] = useState();
  const [toggleModal, setToggleModal] = useState(false);
  const [timedModalPopUp, setTimedModalPopUp] = useState(false);

  const { user } = useAuth0();
  useEffect(() => {
    setTimeout(() => {
      setTimedModalPopUp(true);
    }, 3000);
  }, []);

  useEffect(() => {
    if (user !== undefined) {
      const { email, nickname } = user;
      let username = nickname;
      const newData = { username, email };
      fetch("/create-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      }).then(() => {
        setCurrentUser(newData);
      });
    }
  }, [user]);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 200, itemsToShow: 2 },
    { width: 300, itemsToShow: 3 },
    { width: 400, itemsToShow: 4 },
    { width: 500, itemsToShow: 5 },
  ];

  return (
    <Wrapper>
      <main>
        <button
          onClick={() => {
            setToggleModal(true);
          }}
        >
          Open PopUp
        </button>
      </main>
      <PopUpModal trigger={toggleModal} setTrigger={setToggleModal}>
        <h1>My pop up</h1>
        <p>This is triggered popup</p>
      </PopUpModal>
      <PopUpModal trigger={timedModalPopUp} setTrigger={setTimedModalPopUp}>
        <h1>My timed pop up</h1>
        <p>This is time triggered popup</p>
      </PopUpModal>
      <CarouselStyle breakPoints={breakPoints}>
        {trendingBooks?.map((x, idx) => (
          <List key={idx}>
            <img src={`https://covers.openlibrary.org/b/olid/${x.cover_edition_key}-M.jpg`} alt={"book Covers"} />
            <p>{x?.title}</p>
            <p>{x.author_name}</p>
          </List>
        ))}
        <></>
      </CarouselStyle>
    </Wrapper>
  );
};

export default App;
const CarouselStyle = styled(Carousel)`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  border: 10px solid green;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${CarouselStyle} {
    border: 10px solid red;
  }
`;

const List = styled.li`
  margin-bottom: 2000;
  list-style: none;
  z-index: -1000;
`;
