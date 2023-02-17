import React, { useState,useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput,  ScrollView,  Button, TouchableOpacity,  Dimensions, ImageBackground} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import bookcover from "../../assets/bookcover.jpg";
import bookmark from "../images/bookmark.png";
import axios from 'axios';
// import Animated, {
//   interpolate, withTiming, runOnJS,
//   useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, useAnimatedScrollHandler,
// } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const BookDetailPage = () => {
  // const { book } = route.params;

  const [books, setBooks] = useState([]);
  const[text,setText]=useState('');
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

  // axios.get(`https://www.goodreads.com/book/show/${book.bookId}.xml?key=Bi8vh08utrMY3HAqM9rkWA`)
  //     .then((resp) => {
  //       const data = parser.parse(resp.data);
  //       setFullBook(data?.GoodreadsResponse?.book);
  //     })
  //     .catch((error) => {
  //       Console.log('Failed to get book details:', error);
  // });

  const handleSubmit=()=>{
    //
  }
  // useEffect(() => {
  //   if (query.length > 0) {
  //     axios.get(`https://www.goodreads.com/book/auto_complete?format=json&q=${query}`)
  //       .then((resp) => {
  //         const bks = resp.data.map((book) => ({
  //           ...book,
  //           imageUrl: book.imageUrl.replace(/_..../, '_SY475_'),
  //         }));
  //         setBooks(bks);
  //       })
  //       .catch((error) => {
  //         Alert.alert('Failed to get books', error);
  //       });
  //   }
  // }, [query]);


  // const anims = {
  //   screen: useAnimatedStyle(() => ({
  //     flex: 1,
  //     opacity: withTiming(closing.value < 0.9 ? 0 : 1),
  //     overflow: 'hidden',
  //     transform: [
  //       { translateX: x.value },
  //       { translateY: y.value },
  //       { scale: closing.value < 0.9 ? closing.value : interpolate(moved.value, [0, 75], [1, 0.9], 'clamp') },
  //     ],
  //     borderRadius: interpolate(moved.value, [0, 10], [0, 30], 'clamp'),
  //   })),
  //   scrollView: {
  //     flex: 1,
  //     backgroundColor: colors.background,
  //   },
  //   details: useAnimatedStyle(() => ({
  //     opacity: loaded.value,
  //     transform: [
  //       { translateY: interpolate(loaded.value, [0, 1], [20, 0], 'clamp') },
  //     ],
  //   })),
  // };


  return (
    <ScrollView>
      <View style={styles.container}>
        <View  style={styles.closeIcon}>
          <TouchableOpacity>
              <Image source={bookmark} style={styles.closeIcon} />
            </TouchableOpacity>
        </View>
        <ImageBackground
                  style={[
                    {
                      width: screenWidth,
                      height:screenHeight-300 ,
                      justifyContent: "center",
                      alignItems: "flex-end",
                      borderRadius: 10,
                      zIndex:-1,
                      // opacity:0.5,
                    },
                  ]}
                  resizeMode="cover"
                  blurRadius={15}
                  source={bookcover}
                > 
        <Image source={bookcover} style={styles.image} /></ImageBackground>
        <Text style={styles.title}>Book Title{book.title}</Text>
        <Text style={styles.author}>Book Author{book.author}</Text>
        <Text style={styles.rating}>Rating: {book.rating}</Text>
        <Text style={styles.synopsis}>Synopsis: {book.synopsis}</Text>
        <Text style={styles.review}>Review: {book.review}</Text>
        <View style={styles.reviewConatiner}>
        <TextInput 
              placeholder="Text"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              color='white'
              style={styles.TextInput}>Write a Review</TextInput>
        <Button title="Send" style={styles.button}/>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  image: {
    width: screenWidth-200,
    height: screenHeight-500,
    marginBottom: 20,
    marginTop:20,
    zIndex:1,
    marginHorizontal:20,
    alignSelf:'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginHorizontal:25
  },
  author: {
    fontSize: 16,
    marginBottom: 10,
    marginHorizontal:25,
  },
  rating: {
    fontSize: 16,
    marginBottom: 10,
    marginHorizontal:25
  },
  review: {
    fontSize: 16,
    marginBottom: 10,
    borderWidth:1,
    borderColor:'white',
    marginHorizontal:25
  },
  synopsis: {
    fontSize: 16,
    marginBottom: 10,
    borderColor:'white',
    borderWidth:1,
    width:screenWidth-40,
    marginHorizontal:20,
    height:300
  },
  closeIcon: {
    top:5,
    marginTop:25,
    marginRight:8,
    right:10,
    width:30,
    height:30,
    position:'absolute',    
  },
  TextInput:{
    width:screenWidth-125,
    borderWidth:1,
    borderColor:'white',
    marginHorizontal:21,
  },
  reviewConatiner:{
    display:"flex",
    flexDirection:"row",
    marginHorizontal:5,
    marginBottom:15,
  },
  button:{
   paddingHorizontal:10,
   paddingVertical:20,
   textAlignVertical:'center'
  }
});

export default BookDetailPage;