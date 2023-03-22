import axios from "axios";
import {
  GENRE_BOOKS,
  LOADER_STOP,
  POPULAR_BOOKS,
  TRENDING_BOOKS,
  WISHLIST,
} from "../types";
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
export const getPopularBooks = async () => async (dispatch) => {
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
        type: POPULAR_BOOKS,
        payload: {
          popularBooks: response.data.popular_books,
        },
      });
      dispatch({ type: LOADER_STOP });
      return true;
    } else {
      dispatch({ type: LOADER_STOP });
      return false;
    }
  } catch (error) {
    console.log("error in fetching popular books ", error);
    dispatch({ type: LOADER_STOP });
  }
};
export const getGenreBooks = async (genre) => async (dispatch) => {
  console.log("from api", genre);
  var data = {
    genre: "Romance",
  };
  var config = {
    method: "get",
    url: `${BASE_URL}popular-books`,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      genre: "Romance",
    },
  };

  try {
    const response = await axios.get(`${BASE_URL}popular-books`, data);
    if (response.status === 200) {
      // console.log("got books");
      dispatch({
        type: GENRE_BOOKS,
        payload: {
          genreBooks: response.data.popular_books,
        },
      });
      dispatch({ type: LOADER_STOP });
      return true;
    } else {
      dispatch({ type: LOADER_STOP });
      return false;
    }
  } catch (error) {
    console.log("error in fetching genre books ", error);
    dispatch({ type: LOADER_STOP });
  }
};

export const wishlistBooks = async () => async (dispatch) => {
  var config = {
    method: "get",
    url: `${BASE_URL}whishlist`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios(config);
    if (response.status === 200) {
      console.log("got books");
      dispatch({
        type: WISHLIST,
        payload: {
          wishlist: response.data,
        },
      });
      dispatch({ type: LOADER_STOP });
      return true;
    } else {
      dispatch({ type: LOADER_STOP });
      return false;
    }
  } catch (error) {
    console.log("error in fetching wishlist ", error);
    dispatch({ type: LOADER_STOP });
  }
};
