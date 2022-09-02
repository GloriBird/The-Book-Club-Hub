import React, { createContext, useReducer } from "react";

export const CurrentUserContext = createContext();

const initialState = {
  hasLoaded: false,
  _id: null,
  joinedDate: null,
  username: null,
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
        username: action.null,
        email: action.email,
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
    console.log(`data from Current User Context:`, data);

    dispatch({
      type: "receive-current-user",
      ...data,
      _id: data._id,
      joinedDate: data.joinedDate,
      username: data.username,
      email: data.email,
    });
  };

  const catchError = (error) => {
    dispatch({
      type: "catch-error",
      error: error,
    });
  };
  return (
    <CurrentUserContext.Provider value={{ state, actions: { receiveCurrentUser, catchError } }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
