import axios from "axios";
import { LOADER_STOP, TRENDING_BOOKS } from "../types";
import { BASE_URL } from "@env";

export const getTrendingBooks = async () => async (dispatch) => {
  var config = {
    method: "get",
    url: `${BASE_URL}popular-books`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios(config);
    if (response.status === 200) {
      console.log("got books");
      dispatch({
        type: TRENDING_BOOKS,
        payload: {
          trendingBooks: response.data.popular_books,
        },
      });
      dispatch({ type: LOADER_STOP });
      return true;
    } else {
      dispatch({ type: LOADER_STOP });
      return false;
    }
  } catch (error) {
    console.log("error in fetching trending books ", error);
    dispatch({ type: LOADER_STOP });
  }
};
