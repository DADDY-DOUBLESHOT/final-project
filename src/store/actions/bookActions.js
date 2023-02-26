import React, { useEffect } from 'react';
import axios from "axios";
import store from "../../../store";
import { APP_IP } from "@env";
import { useDispatch } from 'react-redux';
import bookImg from "../../../assets/bookcover.jpg"

const BookDetailPage = () => {
    const book = useSelector((state) => state);
    const dispatch = useDispatch();
  
    useEffect(() => {
      // Make an API call or retrieve the book details from a database
      // and dispatch the action to set the book details in the store
      const bookDetails = {
        title: 'Book Title',
        author: 'Book Author',
        rating: 4.5,
        review: 'This is a great book!',
        synopsis: 'This is a synopsis of the book.',
        bookImage: 'https://unsplash.com/photos/xG5VJW-7Bio',
      };
  
      dispatch({ type: 'SET_BOOK_DETAILS', payload: bookDetails });
    }, [dispatch]);
  
    return (
        <View>
        <Image source={{ uri: bookDetails.bookImage }}  />
        <Text>{book.title}</Text>
        <Text>{book.author}</Text>
        <Text>Rating: {book.rating}</Text>
        <Text>Review: {book.review}</Text>
        <Text>Synopsis: {book.synopsis}</Text>
      </View>
    );
  };
  
  export default BookDetailPage;