import React, { createContext, useReducer, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import usePersistedState from "../components/usePersistedState";
export const CurrentUserContext = createContext();

const initialState = {
  hasLoaded: false,
  error: null,
  _id: null,
  joinedDate: null,
  username: null,
  sub: null,
  email: null,
  bookClubInvites: null,
  numberOfClubInvites: null,
  bookClubs: null,
  numberOfBookClubs: null,
  bookClubsToJoinPending: null,
  numberOfRequests: null,
  hostingBookClubs: null,
  hostingBookClubsCount: null,
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
        hasLoaded: true,
        bookClubInvites: action.bookClubInvites,
        numberOfClubInvites: action.numberOfClubInvites,
        bookClubs: action.bookClubs,
        numberOfBookClubs: action.numberOfBookClubs,
        bookClubsToJoinPending: action.bookClubsToJoinPending,
        numberOfRequests: action.numberOfRequests,
        hostingBookClubs: action.hostingBookClubs,
        hostingBookClubsCount: action.hostingBookClubsCount,
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
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [signedInUser, setSignedInUser] = usePersistedState("Signed In User", []);

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
      bookClubInvites: data?.bookClubInvites,
      numberOfClubInvites: data?.numberOfClubInvites,
      bookClubs: data?.bookClubs,
      numberOfBookClubs: data?.numberOfBookClubs,
      bookClubsToJoinPending: data?.bookClubsToJoinPending,
      numberOfRequests: data?.numberOfRequests,
      hostingBookClubs: data?.hostingBookClubs,
      hostingBookClubsCount: data?.hostingBookClubsCount,
    });
  };

  useEffect(() => {
    const test = async () => {
      if (user !== undefined) {
        const getData = await fetch(`/signedInProfile/${user?.sub}`);
        const listOfUser = await getData.json();
        const signedInProfile = await listOfUser.account;
        console.log(`signedInProfile:`, signedInProfile);
        return receiveCurrentUser(signedInProfile);
      } else {
        <></>;
      }
    };
    test();
  }, [user]);

  const receiveNewUserName = (newUsername) => {
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
    <CurrentUserContext.Provider
      value={{ state, signedInUser, setSignedInUser, actions: { receiveCurrentUser, receiveNewUserName, catchError } }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
