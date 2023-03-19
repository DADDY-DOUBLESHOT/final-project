import {
  LOADUSER,
  LOADUSERTOKEN,
  LOGIN,
  LOGOUT,
  SIGNUP,
  SIGNUP_PRE,
} from "../types";

const initialState = {
  logged: false,
  token: null,
  user: null,
};

export const userReducer = (state = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        logged: action.payload.logged,
        token: action.payload.token,
        user: action.payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        logged: false,
        token: null,
        user: null,
      };
    case SIGNUP:
      return {
        ...state,
        logged: action.payload.logged,
        token: action.payload.token,
        user: action.payload.user,
      };
    case SIGNUP_PRE:
      return {
        ...state,
        user: action.payload.user,
      };
    case LOADUSER:
      return {
        ...state,
        logged: true,
        user: action.payload.user,
      };
    case LOADUSERTOKEN:
      return {
        ...state,
        logged: true,
        token: action.payload.token,
        user: action.payload.user,
      };
    default:
      return state;
  }
};
