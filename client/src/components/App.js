import GlobalStyles from "./styles/GlobalStyled";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <p>Hello</p>
      </BrowserRouter>
    </>
  );
};

export default App;
