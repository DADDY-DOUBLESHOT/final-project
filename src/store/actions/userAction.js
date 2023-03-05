import { LOADER_STOP, LOGIN, LOGOUT, SIGNUP, SIGNUP_PRE} from "../types";
import axios from "axios";
import store from "../../../store";
import { APP_IP } from "@env";
export const userLogin = (email, password) => async (dispatch) => {
  var data = JSON.stringify({
    email: email,
    password: password,
  });

  var config = {
    method: "post",
    url: `http://${APP_IP}:5000/api/v1/login`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios(config);
    dispatch({
      type: LOGIN,
      payload: {
        logged: true,
        token: response.data.token,
        user: response.data.user,
      },
    });

    dispatch({ type: LOADER_STOP });
  } catch (error) {
    console.log("error in backend ", error);

    dispatch({
      type: LOGIN,
      payload: {
        logged: false,
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
    url: `http://${APP_IP}:5000/api/v1/register`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    await axios(config)
      .then(function (response) {
        dispatch({
          type: SIGNUP,
          payload: {
            logged: true,
            token: response.data.token,
            user: response.data.user,
          },
        });
      })
      .catch(function (error) {
        console.log("Error in register", error);
        return dispatch({ type: LOADER_STOP });
      });
    dispatch({ type: LOADER_STOP });
  } catch (error) {
    console.log("error in backend ", error);
    dispatch({
      type: SIGNUP,
      payload: {
        logged: false,
        token: null,
        user: null,
      },
    });

    return dispatch({ type: LOADER_STOP });
  }
};
export const userLogout = (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

