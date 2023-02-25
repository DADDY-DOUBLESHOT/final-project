import {  SET_DEFAULT_IMAGE } from "../types";
import axios from "axios";
import store from "../../../store";
import { APP_IP } from "@env";


export const setDefaultImage = (image) => async (dispatch)=>{
    dispatch({
    type: SET_DEFAULT_IMAGE,
    payload: {
        image:"https://www.seekpng.com/png/detail/41-410093_circled-user-icon-user-profile-icon-png.png", // replace with the URL of your default image
    }
    });
    dispatch({ type: LOADER_STOP });
  };