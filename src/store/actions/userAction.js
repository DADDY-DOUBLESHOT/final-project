import { LOADER_STOP, LOADUSER, LOADUSERTOKEN, LOGIN, LOGOUT, SIGNUP, SIGNUP_PRE } from "../types";
import axios from "axios";
import store from "../../../store";
import { BASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loaderStop } from "./loaderAction";
export const userLogin = async (email, password) => async (dispatch) => {
  var data = JSON.stringify({
    email: email,
    password: password,
  });

  var config = {
    method: "post",
    url: `${BASE_URL}/login`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios(config);
    if (response.status === 200) {
      dispatch({
        type: LOGIN,
        payload: {
          logged: true,
          token: response.data.token,
          user: response.data.user,
        },
      });
      AsyncStorage.setItem("@user", JSON.stringify(response.data.user));
      AsyncStorage.setItem("@token", response.data.token);
      dispatch({ type: LOADER_STOP });
      return true;
    } else {
      dispatch({ type: LOADER_STOP });
      return false;
    }
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
export const userMe = async (token) => async (dispatch) => {
  console.log("token is ", token);
  var config = {
    method: "get",
    url: `${BASE_URL}me`,
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token}`,
    },
  };

  try {
    const response = await axios(config);
    if (response.status === 200) {
      dispatch({
        type: LOGIN,
        payload: {
          logged: true,
          token: response.data.token,
          user: response.data.user,
        },
      });
      AsyncStorage.setItem("@user", JSON.stringify(response.data.user));
      // AsyncStorage.setItem("@token", token);
      dispatch(loadUser(response.data.user));
      dispatch({ type: LOADER_STOP });
      return true;
    } else {
      dispatch({ type: LOADER_STOP });
      return false;
    }
  } catch (error) {
    console.log("error in get me ", error);

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
export const userRegisterPre = async (email, password, name) => async (dispatch) => {
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
export const userRegister = async (genres) => async (dispatch) => {
  const { email, password, name } = store.getState().USER.user;
  var data = JSON.stringify({
    email: email,
    password: password,
    name: name,
    role: "user",
    genres: genres,
  });

  var config = {
    method: "post",
    url: `${BASE_URL}/register`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    return await axios(config)
      .then(function (response) {
        dispatch({
          type: SIGNUP,
          payload: {
            logged: true,
            token: response.data.token,
            user: response.data.user,
          },
        });
        dispatch(loaderStop());
        return true;
      })
      .catch(function (error) {
        console.log("Error in register", error.response.data);
        dispatch(loaderStop());
        return false;
      });
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

    dispatch(loaderStop());
    return false;
  }
};
export const userLogout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

export const loadUserToken = (user, token) => async (dispatch) => {
  dispatch({
    type: LOADUSERTOKEN,
    payload: {
      token: token,
      user: user,
    },
  });
};
export const loadUser = (user) => async (dispatch) => {
  dispatch({
    type: LOADUSER,
    payload: {
      user: user,
    },
  });
};
