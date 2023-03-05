import React, { useState,useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput,  ScrollView,  Button, TouchableOpacity,  Dimensions, ImageBackground} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import bookcover from "../../assets/bookcover.jpg";
import profile from "../images/profile.png";
import photo from "../images/photo.jpg";
import backarrow from "../images/backarrow.png";
import { Ionicons } from "@expo/vector-icons";
import { Rating, AirbnbRating } from "react-native-ratings";
import Stars from "react-native-stars";

import bookmark from "../images/bookmark.png";
import axios from 'axios';
// import Animated, {
//   interpolate, withTiming, runOnJS,
//   useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, useAnimatedScrollHandler,
// } from 'react-native-reanimated';
// import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const BookDetailPage = () => {
  // const { book } = route.params;

  const [books, setBooks] = useState([]);
  const[text,setText]=useState('');
  const book = useSelector((state) => state);
  const dispatch = useDispatch();

  const [data,setData]=useState("");
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const [search,setSearch]=useState("");
  const [searchResults, setSearchResults]=useState([]);

  // useEffect(() => {
  //   // Make an API call or retrieve the book details from a database
  //   // and dispatch the action to set the book details in the store
    const bookDetails = {
    "book_id": 1,
    "goodreads_book_id": 2767052,
    "best_book_id": 2767052,
    "work_id": 2792775,
    "books_count": 272,
    "isbn": 9780439023480,
    "authors": "Suzanne Collins",
    "original_publication_year": 2008,
    "original_title": "The Hunger Games",
    "title": "The Hunger Games (The Hunger Games, #1)",
    "language_code": "eng",
    "average_rating": 4.34,
    "ratings_count": 4780653,
    "work_ratings_count": 4942365,
    "work_text_reviews_count": 155254,
    "ratings_1": 66715,
    "ratings_2": 127936,
    "ratings_3": 560092,
    "ratings_4": 1481305,
    "ratings_5": 2706317,
    "image_url": "https://images.gr-assets.com/books/1447303603m/2767052.jpg",
    "small_image_url": "https://images.gr-assets.com/books/1447303603s/2767052.jpg"
    };


  const user={
    "username":"John Doe",
    "review":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    "image_url":"https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg"
  }

  const user2={
    "username":"Mary Doe",
    "review":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    "image_url":"https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg"
  }
 

  const goBack = () => {
    navigation.goBack();
  };

  
  

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

  

  useEffect(()=>{
    fetch("https://openlibrary.org/works/OL45804W.json")
    .then((response)=>response.json())
    .then((data)=>setData(data))
    .then(()=>setLoading)
    .catch(setError);

  },[]);

      // console.log(data);
    
    if(loading){
      return <h1 style={{textAlign:"center"}}>Loading...</h1>;
    }

    if(error){
      return <pre>{JSON.stringify(error,null,2)}</pre>;
    }

    if(!data){
      return null;
    }

  return (
    <ScrollView>
      <View style={styles.container}>
      <View onPress={goBack} style={styles.closeIcon}>
         <TouchableOpacity onPress={goBack}>
            <Image source={backarrow} style={styles.closeIcon} />
          </TouchableOpacity>
      </View>
        <View  style={styles.bookmarkIcon}>
          <TouchableOpacity>
              <Image source={bookmark} style={styles.bookmarkIcon} />
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
        <Text style={styles.title}>{bookDetails.original_title}</Text>
        <Text style={styles.author}>{bookDetails.authors}</Text>
        <View style={{display:"flex",flexDirection:"row",marginHorizontal:25}}>
        <Stars
          style={stars_style.rating}
          // default={parseInt(item.rating)}
          spacing={5}
          starSize={25}
          count={5}
          fullStar={<Ionicons name="star" size={20} color="rgb(255, 204, 0)" />}
          emptyStar={<Ionicons name="star" size={20} color="rgba(0,0,0,0.9)" />}
        />
          {/* <Text style={styles.rating}>{bookDetails.average_rating}</Text> */}
          <Text style={{marginHorizontal:screenWidth-280, color:"white",marginBottom:5}}>(100 views)</Text>
        </View>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 2,
            paddingVertical:5
          }}
        />
        {/* <View > */}
          <ScrollView style={{height:300,borderColor:"#2196F3"}} horizontal={false}><Text style={styles.synopsis}>Synopsis:{'\n'}{data.description}</Text>
          </ScrollView>
        {/* </View> */}
        <View style={{width:"100%",alignItems:'center',justifyContent:'center',textAlign:'center',}}><Text style={styles.start}>Start Reading</Text></View>
        <View style={styles.review}>
          <Text style={{color:"white",padding:15,fontSize:16}}>User Reviews:</Text> 
           <View style={styles.usercontainer}>
            <Image source={photo} style={styles.profileImg}/>
            <View style={{display:'flex', flexDirection:"column",
             borderColor:'black',width:screenWidth-130}}>
               <Text style={{marginStart:10,marginTop:10,color:'white'}}>{user.username}</Text>
               <Text style={{height:40,marginStart:10,paddingVertical:5}}>{user.review}</Text>
            </View>
           </View>
           <View style={styles.usercontainer}>
            <Image source={photo} style={styles.profileImg}/>
            <View style={{display:'flex', flexDirection:"column",
             borderColor:'black',width:screenWidth-130}}>
               <Text style={{marginStart:10,marginTop:10,color:'white'}}>{user.username}</Text>
               <Text style={{height:40,marginStart:10,paddingVertical:5}}>{user.review}</Text>
            </View>
           </View>
        </View>
        <View style={styles.reviewConatiner}>
        <TextInput 
              placeholder="Text"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              color='white'
              useAnimatedScrollView='true'
              style={styles.TextInput}>Write a Review</TextInput>
        <Button title="Send" width="200" style={styles.button}/>
        </View>
      </View>
    </ScrollView>
  );
}

const stars_style = StyleSheet.create({
  rating: {
    width: "100%",
    marginHorizontal:10,
    marginStart:10,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor:'#0A2647',
    color:'white',
    // #FFFBEB,#495579,#263159
  },
  image: {
    width: screenWidth-200,
    height: screenHeight-500,
    marginBottom: 20,
    marginTop:90,
    zIndex:1,
    marginHorizontal:20,
    alignSelf:'center',
    zIndex:1,
    opacity:1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    marginHorizontal:25,
    marginTop:20,
    color:'white'
  },
  author: {
    fontSize: 16,
    marginBottom: 10,
    marginHorizontal:28,
    marginTop:1,
    color:'white'
  },
  rating: {
    fontSize: 16,
    marginBottom: 10,
    marginHorizontal:25,
    marginRight:60,
  },
  review: {
    fontSize: 16,
    marginBottom: 10,
    borderWidth:0.2,
    borderColor:'#2196F3',
    marginHorizontal:22,
    height:230,
    width:screenWidth-40,
    borderRadius:5,
    color:'white',
    backgroundColor:'#144272'
  },
  synopsis: {
    fontSize: 14,
    marginBottom: 10,
    borderColor:'#2196F3',
    borderWidth:1,
    width:screenWidth-40,
    marginHorizontal:20,
    height:300,
    borderRadius:5,
    color:'white',
    paddingVertical:5,
    paddingHorizontal:10,
    backgroundColor:'#144272'
  },
  bookmarkIcon: {
    top:5,
    marginTop:25,
    marginRight:8,
    right:10,
    width:30,
    height:40,
    position:'absolute',    
  },
  TextInput:{
    width:screenWidth-110,
    borderWidth:1,
    borderColor:'#2196F3',
    marginHorizontal:21,
    color:'white',
    padding:10,
  },
  reviewConatiner:{
    display:"flex",
    flexDirection:"row",
    marginHorizontal:4,
    marginBottom:15,
    borderRadius:5
  },
  button:{
   paddingHorizontal:8,
   paddingVertical:20,
   textAlignVertical:'center',
  },
  start:{
    marginTop:20,
    alignItems:'center',
    justifyContent:'center',
    width:"90%",
    height:50,
    paddingVertical:11,
    color:'white',
    marginHorizontal:20,
    textAlign:'center',
    marginBottom:20,
    backgroundColor:"#2196F3",
    borderRadius:5,
    fontSize:20,
  },
  profileImg:{
    width:50,
    height:50,
    borderRadius:100,
    alignItems: 'center',
    marginStart:12,
    borderColor:'black',
    marginTop:10,
  },
  usercontainer:{
    display:"flex",
    flexDirection:"row",
    // borderColor:'black',
    // borderWidth:1,0
    margin:10,
    backgroundColor:'#205295',
    borderRadius:10,
    color:'white',
  },
  closeIcon:{
    top:5,
    marginTop:28,
    left:10,
    width:50,
    height:25,
    position:'absolute',
  }

});

export default BookDetailPage;