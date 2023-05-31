import axios from "axios";
import {
  GENRE_BOOKS,
  LOADER_STOP,
  POPULAR_BOOKS,
  RECOM_BOOKS,
  TRENDING_BOOKS,
  WISHLIST,
  UPLOADED_BOOKS,
  AUTHOR_BOOKS,
  CONTINUE_BOOK,
} from "../types";
import { BASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getTrendingBooks = async () => async (dispatch) => {
  var config = {
    method: "get",
    url: `${BASE_URL}trending-books`,
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
          trendingBooks: response.data.trendingBooks,
        },
      });
      // dispatch({ type: LOADER_STOP });
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
      // dispatch({ type: LOADER_STOP });
      return true;
    } else {
      dispatch({ type: LOADER_STOP });
      return false;
    }
  } catch (error) {
    console.log("error in fetching popular books ", error);
    // dispatch({ type: LOADER_STOP });
  }
};
export const getGenreBooks = async (genre) => async (dispatch) => {
  var config = {
    method: "get",
    url: `${BASE_URL}popular-books/${genre}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      genre: "Romance",
    },
  };

  try {
    const response = await axios(config);
    if (response.status === 200) {
      // console.log("got books");
      dispatch({
        type: GENRE_BOOKS,
        payload: {
          genreBooks: response.data.popular_books,
        },
      });
      // dispatch({ type: LOADER_STOP });
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
export const getRecommendedBooks = async (genres) => async (dispatch) => {
  var data = JSON.stringify({
    userFavGenres: genres,
  });
  var config = {
    method: "get",
    url: `${BASE_URL}get-recommendations`,
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };

  try {
    const response = await axios(config);
    if (response.status === 200) {
      dispatch({
        type: RECOM_BOOKS,
        payload: {
          recomBooks: response.data.matchedBooks,
        },
      });
      dispatch({ type: LOADER_STOP });
      return true;
    } else {
      dispatch({ type: LOADER_STOP });
      return false;
    }
  } catch (error) {
    console.log("error in fetching recommended books ", error);
    dispatch({ type: LOADER_STOP });
  }
};
export const getTopAuthorBooks = async (author) => async (dispatch) => {
  var data = JSON.stringify({
    author,
  });
  var config = {
    method: "get",
    url: `${BASE_URL}get-recommendations`,
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };

  try {
    const response = await axios(config);
    if (response.status === 200) {
      dispatch({
        type: AUTHOR_BOOKS,
        payload: {
          authorBooks: response.data.authorBooks,
        },
      });
      dispatch({ type: LOADER_STOP });
      return true;
    } else {
      dispatch({ type: LOADER_STOP });
      return false;
    }
  } catch (error) {
    console.log("error in fetching recommended books ", error);
    dispatch({ type: LOADER_STOP });
  }
};

export const wishlistBooks = async () => async (dispatch) => {
  // console.log("api called");
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
      // console.log("got wishlist books", response.data);
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
export const continueBook = async (id) => async (dispatch) => {
  // console.log("api called");
  AsyncStorage.setItem("@continue", id);
  var config = {
    method: "get",
    url: `${BASE_URL}book/${id}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios(config);
    if (response.status === 200) {
      console.log("got book", response.data.book.title);
      dispatch({
        type: CONTINUE_BOOK,
        payload: {
          continueBook: response.data.book,
        },
      });
    }
  } catch (error) {
    console.log("error in fetching continue book ", error);
  }
};
