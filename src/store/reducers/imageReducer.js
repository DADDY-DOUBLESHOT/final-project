import {SET_DEFAULT_IMAGE} from "../types"; 

const initialState = {
    image: "https://www.seekpng.com/png/detail/41-410093_circled-user-icon-user-profile-icon-png.png", // replace with the URL of your default image
};
  
export const imageReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_DEFAULT_IMAGE:
        return {
          ...state,
          image: action.payload.image,
        };
      default:
        return state;
    }
  };
  
  // default imageReducer;