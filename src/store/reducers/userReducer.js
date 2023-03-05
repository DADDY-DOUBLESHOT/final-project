import { LOGIN, LOGOUT, SIGNUP, SIGNUP_PRE, UPDATE_USER } from "../types";

const initialState = {
  logged: false,
  token: null,
  user: null,
};

export const userReducer = (state = initialState, action) => {
  console.log(action);
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
    case  UPDATE_USER:
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return state;
  }
};
