import React, { createContext, useReducer } from "react";

export const CurrentUserContext = createContext();

const initialState = {
  hasLoaded: false,
  _id: null,
  joinedDate: null,
  username: null,
  sub: null,
  email: null,
  error: null,
};

const currentUserReducer = (state, action) => {
  switch (action.type) {
    case "receive-current-user": {
      return {
        ...state,
        _id: action._id,
        joinedDate: action.joinedDate,
        username: action.username,
        email: action.email,
        sub: action.sub,
      };
    }
    case "receive-new-username": {
      return {
        ...state,
        username: action.username,
      };
    }
    case "catch-error": {
      return {
        ...state,
        hasLoaded: false,
        error: true,
      };
    }
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
};

export const CurrentUserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(currentUserReducer, initialState);

  const receiveCurrentUser = (data) => {
    console.log(`data from user Context:`, data);
    dispatch({
      type: "receive-current-user",
      ...data,
      _id: data?._id,
      joinedDate: data?.joinedDate,
      username: data?.username,
      email: data?.email,
      sub: data?.sub,
    });
  };

  const receiveNewUserName = (newUsername) => {
    console.log(`newUsername from user Context:`, newUsername);
    dispatch({
      type: "receive-new-username",
      username: newUsername,
    });
  };

  const catchError = (error) => {
    dispatch({
      type: "catch-error",
      error: error,
    });
  };
  return (
    <CurrentUserContext.Provider value={{ state, actions: { receiveCurrentUser, receiveNewUserName, catchError } }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
