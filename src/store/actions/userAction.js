import { LOADER_STOP, LOGIN, LOGOUT, SIGNUP, SIGNUP_PRE } from "../types";
import axios from "axios";
import store from "../../../store";
export const userLogin = (email, password) => async (dispatch) => {
  var data = JSON.stringify({
    email: email,
    password: password,
  });

  var config = {
    method: "post",
    url: "http://localhost:5000/api/v1/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios(config);
    console.log(JSON.stringify(response.data));

    dispatch({
      type: LOGIN,
      payload: {
        logged: true,
        token: response.data.token,
        user: email,
      },
    });

    dispatch({ type: LOADER_STOP });
  } catch (error) {
    console.log("error in backend ", error);

    dispatch({
      type: LOGIN,
      payload: {
        logged: true,
        token: null,
        user: null,
      },
    });

    dispatch({ type: LOADER_STOP });
  }
};
export const userRegisterPre = (email, password, name) => (dispatch) => {
  dispatch({
    type: SIGNUP_PRE,
    payload: {
      user: {
        email: email,
        password: password,
        name: name,
      },
    },
  });
  dispatch({ type: LOADER_STOP });
};
export const userRegister = (genres) => async (dispatch) => {
  const { email, password, name } = store.getState().USER.user;
  var data = JSON.stringify({
    email: email,
    password: password,
    name: name,
    genres: genres,
  });

  var config = {
    method: "post",
    url: "http://localhost:5000/api/v1/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios(config);
    console.log(JSON.stringify(response.data));

    dispatch({
      type: LOGIN,
      payload: {
        logged: true,
        token: response.data.token,
        user: email,
      },
    });

    dispatch({ type: LOADER_STOP });
  } catch (error) {
    console.log("error in backend ", error);

    dispatch({
      type: LOGIN,
      payload: {
        logged: true,
        token: null,
        user: null,
      },
    });

    dispatch({ type: LOADER_STOP });
  }
};
export const userLogout = async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
