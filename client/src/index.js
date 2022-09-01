import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { GlobalProvider } from "./context/GlobalContext";
import { Auth0Provider } from "@auth0/auth0-react";
import { CurrentUserProvider } from "./context/CurrentUserContext";
const root = ReactDOM.createRoot(document.getElementById("root"));

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

root.render(
  <GlobalProvider>
    <CurrentUserProvider>
      <Auth0Provider domain={domain} clientId={clientId} redirectUri={"http://localhost:3000/"}>
        <App />
      </Auth0Provider>
    </CurrentUserProvider>
  </GlobalProvider>
);
