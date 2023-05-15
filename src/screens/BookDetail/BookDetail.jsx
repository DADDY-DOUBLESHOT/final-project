import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  ToastAndroid,
} from "react-native";
import axios from "axios";
import { Icon } from "@expo/vector-icons";
import { Rating, AirbnbRating } from "react-native-ratings";
import Icon from 'react-native-vector-icons/Ionicons';
import Stars from "react-native-stars";
import * as Haptics from "expo-haptics";
import photo from "../../images/photo.jpg";
import bookmark from "../../images/bookmark.png";
// import ReadMore from "react-native-read-more-text";
import discussion from "../../images/discussion-forum.png";
import ReadMore from "react-native-read-more-text";
import { useSelector, useDispatch } from "react-redux";
import { loaderStart, loaderStop } from "../../store/actions/loaderAction";
import { BASE_URL } from "@env";
import backarrow from "../../images/backarrow.png"

import Animated, {
  interpolate,
  withTiming,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import { FlatList } from "react-native-gesture-handler";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;


const MAX_LINES = 3; // Maximum number of lines to show before "read more"

const ReadMore = ({ text }) => {
  const [showFullText, setShowFullText] = useState(false);

  const toggleShowFullText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <View style={styles.synopsis}>
      <Text numberOfLines={showFullText ? undefined : MAX_LINES}>
        {text}
      </Text>
      {text.length > MAX_LINES && (
        <TouchableOpacity onPress={toggleShowFullText}>
          <Text style={{color:"grey",alignSelf:"flex-end"}}>{showFullText ? 'Read less' : 'Read more'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const BookDetails = ({ route, navigation }) => {
  // const id=route.params.id;
  const dispatch = useDispatch();
  const [data, setData] = useState({
    title: "",
    author: "",
    coverImg: null,
    description: "",
    pdf_url: null,
    rating:0,
    pages:'',
    readCount:0,
    id:route.params.id,
  });
  const [reviewData,setreviewData]=useState({
    bookId:route.params.id,
    comment:"",
    rating:null
  })
  const [reviews,getReviews]=useState([]
  //   ,{
  //   name:'',
  //   comment:'',
  //   id:route.params.id,
  // }
  )
  const [wishlist,setWishlist]=useState([]);
  const [isBookmarked,setIsBookmarked]=useState(false);
  

  useEffect(() => {
    fetchBookdetails(route.params.id);
    bookReviews(route.params.id);
    // handleAddToWishlist(route.params.id);
  }, []);

  const fetchBookdetails = async (id) => {

    dispatch(loaderStart());

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}book/${id}`,
      headers: {},
    };

    try {
      await axios(config)
        .then(function (response) {
          console.log("response is", response.data);
          setData({
            title: response.data.book.title,
            author: response.data.book.author,
            coverImg: response.data.book.coverImg,
            description: response.data.book.description,
            pdf_url: response.data.book.pdfUrl,
            reviews:response.data.book.reviews,
            rating:response.data.book.rating,
            pages:response.data.book.pages,
            readCount:response.data.book.readCount,
          });
          console.log(data.rating);
          console.log(data.pages);
          console.log(data.reviews)
        })
        .catch(function (error) {
          ToastAndroid.show(
            `Unable to fecth book ${error.message}`,
            ToastAndroid.SHORT
            );
            dispatch(loaderStop());
            console.log("Unable to show Book", error);
            navigation.replace("homenavi");
        });
    } catch (error) {
      ToastAndroid.show(
      `Unable to fecth book ${error.message}`,
      ToastAndroid.SHORT
      );
      dispatch(loaderStop());
      console.log("Unable to show Book", error);
      navigation.replace("homenavi")
    }
  };

  
  const handleReviewDataChange = (name, value) => {
    try{
      setreviewData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }catch(error){
    console.log("unsuccessful",error);
  }
    
  }
  
  const submitReview = async () => {
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/review/`,
      headers: {
        "Content-Type": "application/json",
      },
      data:reviewData,
    };

    try {
        const response=await axios.put(config.url, reviewData);
        console.log(response.data);
        ToastAndroid.show(
          `Review sent`,
          ToastAndroid.SHORT
          );
        console.log("review sent");
    } catch (error) {
      console.error("unsuccesful",error);
    }
  }

  const bookReviews=async(id)=>{
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BASE_URL}reviews/?id=${id}`,
        headers: {},
      };

    try {
      await axios(config)
        .then(function (response) {  
          getReviews(
          //   {
          //   name:response.data.name,
          //   comment:response.data.comment,
          //   rating:response.data.rating,
          // }
            response.data.reviews
          );
          console.log("review response is:",response.data.reviews);
          console.log(response.data.reviews[0].name);
          console.log(response.data.reviews[0].comment);
          console.log(reviews.length);
          })
          .catch(function (error) {
            console.log("Unable to fetch reviews", error);
          });
      } catch (error) {
        console.log("Unsuccessful fetching", error);
      }
  };


  const goBack = () => {
    navigation.goBack();
  };

 
    const handleAddToWishlist = async () => {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}whishlist/add`,
        headers: {},
        // data:{
        //   "bookId":id,
        // }
      };
      await axios.post(config.url,{bookId:route.params.id})
        .then(response => {
          setWishlist(response.data.wishlist);
          console.log(config.data)
          ToastAndroid.show(
            `Book added to wishlist`,
            ToastAndroid.SHORT
            );
          console.log("added to wishlist:",response.data.wishlist)
          console.log(wishlist)
          setIsBookmarked(true);
        })
        .catch(error => console.error("cannot add to wishlist",error));
    };
  
    const handleRemoveFromWishlist = async() => {
      let config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: `${BASE_URL}whishlist/remove`,
        headers: {},
      };
      await axios.patch(config.url,{id:route.params.id})
        .then(response => {
          setWishlist(response.data.wishlist);
          console.log("removed from wishlist:",response.data.wishlist)
          console.log(wishlist)
          setIsBookmarked(false);
          ToastAndroid.show(
            `Book removed from wishlist`,
            ToastAndroid.SHORT
            );
        })
        .catch(error => console.error("cannot remove from wishlist",error));
      // console.log("removed from wishlist");
    };
  
  
    const handleBookmarkPress = () => {
      if (isBookmarked) {
        handleRemoveFromWishlist();
      } else {
        handleAddToWishlist();
      }
      setIsBookmarked(!isBookmarked);
    };
  
    const renderBookmarkIcon = () => {
      if (isBookmarked) {
        return (
          <TouchableOpacity onPress={handleBookmarkPress}>
            <Ionicons name="bookmark" size={24} color="#554994" />
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity onPress={handleBookmarkPress}>
            <Ionicons name="bookmark-outline" size={24} color="#554994" />
          </TouchableOpacity>
        );
      }
    };
    
  const LineDivider = () => {
    return (
      <View style={{ width: 1, paddingVertical: 5 }}>
        <View
          style={{ flex: 1, borderLeftColor: "#d3d3d3", borderLeftWidth: 1 }}
        ></View>
      </View>
    );
  };

  function renderBottomButton(pdf_url) {
    return (
      <View style={{ flex: 1, flexDirection: "row", width: "100%" }}>
        {/* Bookmark */}
        <TouchableOpacity
          style={{
            width: 60,
            backgroundColor: "grey",
            marginLeft: 2,
            marginVertical: 2,
            //  marginHorizontal:12,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={()=> {console.log("wishlisted")}}
        >
          {renderBookmarkIcon()}
          
          {/* <Image
          //   source={bookmark}
          //   resizeMode="contain"
          //   style={{
          //     width: 25,
          //     height: 25,
          //     tintColor: "white",
          //   }}
          // /> */}
        </TouchableOpacity>
       

        {/* Start Reading */}
        <TouchableOpacity
          style={{
            flex: 1,
            width: 100,
            backgroundColor: "#554994",
            marginHorizontal: 2,
            marginVertical: 2,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => navigation.navigate("ReadBook",{id:route.params.id})}
        >
          <Text style={{ color: "white", fontsize: 10 }}>Start Reading</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{ zIndex: -1 }}>
        <View onPress={goBack}>
          <TouchableOpacity onPress={goBack}>
              <Image source={backarrow} style={styles.closeIcon} />
            </TouchableOpacity>
        </View> 
        <View  style={styles.bookmarkIcon}>
            <TouchableOpacity onPress={()=>navigation.navigate("discussionforum",{id:route.params.id})}>
                <Image source={discussion} style={styles.bookmarkIcon} />
            </TouchableOpacity>
          </View>

        <ImageBackground
          style={[
            {
              width: screenWidth,
              height: screenHeight - 150,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 0,
              borderBottomRightRadius: 15,
              borderBottomLeftRadius: 15,
              zIndex: -1,
              tintColor: "#554994",
              backgroundColor: "#554994",
              marginBottom: 20,
              // opacity:0.5,
            },
          ]}
          resizeMode="cover"
          blurRadius={15}
          // source={{ uri: bookDetails.image_url }}
        >
          <Image source={{ uri: data.coverImg }} style={styles.image} />
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.author}>{data.author}</Text>

          <View
            style={{
              flexDirection: "row",
              paddingVertical: 20,
              margin: 10,
              marginTop: 15,
              borderRadius: 10,
              backgroundColor: "rgba(0,0,0,0.3)",
            }}
          >
            {/* Rating */}
            
            <View style={{ flex: 1, alignItems: "center", color: "white" }}>
              <Text style={{ color: "white" }}>
                {data.rating}
              </Text>
              <Text style={{ color: "white" }}>Rating</Text>
            </View>

            <LineDivider />

            {/* Pages */}
            <View style={{ flex: 1, alignItems: "center", color: "white" }}>
              <Text style={{ color: "white" }}>{data.pages}</Text>
              <Text style={{ color: "white" }}>Pages</Text>
            </View>

            <LineDivider />

            {/* ratngs count */}
            <View style={{ flex: 1, alignItems: "center", color: "white" }}>
              <Text style={{ color: "white" }}>
                {data.readCount}
              </Text>
              <Text style={{ color: "white" }}>Views</Text>
            </View>
          </View>
        </ImageBackground>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginHorizontal: 25,
          }}
        >
          {/* <Stars
          style={stars_style.rating}
          // default={parseInt(item.rating)}
          spacing={5}
          starSize={25}
          count={5}
          fullStar={<Ionicons name="star" size={20} color="rgb(255, 204, 0)" />}
          emptyStar={<Ionicons name="star" size={20} color="rgba(0,0,0,0.9)" />}
        /> */}
          {/* <Text style={styles.rating}>{bookDetails.average_rating}</Text> */}
          {/* <Text style={{marginHorizontal:screenWidth-280, color:"white",marginBottom:5}}>(100 views)</Text> */}
        </View>
        {/* <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 2,
            paddingVertical:5
          }}
        /> */}

        {/* <View>
          <ScrollView
            style={{
              borderColor: "#554994",
              marginHorizontal: 20,
              marginVertical: 10,
            }}
            horizontal={false}
          >
            <ReadMore ReadMore
              numberOfLines={3}
              renderTruncatedFooter={(handlePress) => {
                return (
                  <Text
                    onPress={handlePress}
                    style={{
                      color: "grey",
                      marginHorizontal: "12",
                      backgroundColor: "black",
                    }}>
                    show more
                  </Text>
                );
              }}
              renderRevealedFooter={(handlePress) => {
                return (
                  <Text onPress={handlePress} style={{ color: "grey" }}>
                    show less
                  </Text>
                );
              }}
            >
              <Text style={styles.synopsis}>
                Synopsis:{"\n"}
                {bookDetails.description}
              </Text>
            </ReadMore>
          </ScrollView>
        </View> */}

        <ReadMore text={data.description} />

        

        {/* <View  style={{width:"100%",alignItems:'center',justifyContent:'center',textAlign:'center'}}><Text style={styles.start}>Start Reading</Text></View> */}


      
        <View style={styles.review}>
          <Text style={{ color: "black", padding: 15, fontSize: 16 }}>
            User Reviews:
          </Text>
          <ScrollView>
            
         {reviews.map((review,index)=>(
                <View style={styles.usercontainer} key={index} >
                <Image source={photo} style={styles.profileImg} />
             
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    borderColor: "white",
                    width: screenWidth - 130,
                  }}
                >  
                  <Text 
                    style={{ marginStart: 10, marginTop: 10, color: "white" }}>
                    {review.name}
                  </Text>
                  <Text 
                    style={{
                      height: 40,
                      marginStart: 10,
                      paddingVertical: 5,
                      color: "white",
                    }}
                  >
                    {review.comment}
                  </Text>  
                </View>
              </View>
         ))
            }
                    <Text
                onPress={() => navigation.navigate("ReviewList",{id:route.params.id})}
                style={{
                  marginRight: 10,
                  alignSelf: "flex-end",
                  marginHorizontal: 12,
                  marginVertical: 10,
                  fontWeight: "600",
                  paddingHorizontal: 10,
                  color: "grey",
                }}
              >
                View More
              </Text>
          </ScrollView>
        </View>

        {/* Write a review */}
        <View style={styles.reviewConatiner}>
          <TextInput
            placeholder="Write a Review"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            color="black"
            useAnimatedScrollView="true"
            style={styles.TextInput}
            value={reviewData.comment}
            onChangeText={(value)=>handleReviewDataChange('comment',value)}
          >
            {/* Write a Review */}
          </TextInput>
          <Button
            title="Send"
            width="200"
            style={styles.button}
            color="#554994"
            onPress={submitReview}
          />
          
        </View>

        {/* </View> */}
      </ScrollView>

      <View
        style={{
          height: 70,
          marginTop: 10,
          marginBottom: 30,
          zIndex: 1,
          marginHorizontal: 10,
        }}
      >
        {renderBottomButton(data.pdf_url)}
      </View>
    </View>
  );
};


const stars_style = StyleSheet.create({
  rating: {
    width: "100%",
    marginHorizontal: 10,
    marginStart: 10,
    backgroundColor: "white",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "white",
    color: "white",
    // #FFFBEB,#495579,#263159
  },
  image: {
    width: screenWidth - 150,
    height: screenHeight - 450,
    marginBottom: 10,
    marginTop: 50,
    zIndex: 1,
    marginHorizontal: 10,
    alignSelf: "center",
    zIndex: 1,
    opacity: 1,
    flex:0.9,
    resizeMode: "cover",
    borderRadius:5
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    // marginHorizontal:25,
    marginTop: 10,
    color: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  author: {
    fontSize: 16,
    marginBottom: 0,
    // marginHorizontal:28,
    marginTop: 1,
    color: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  rating: {
    fontSize: 16,
    marginBottom: 10,
    marginHorizontal: 25,
    marginRight: 60,
  },
  review: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 20,
    borderWidth: 0.2,
    borderColor: "#554994",
    marginHorizontal: 22,
    marginVertical: 20,
    // height:230,
    width: screenWidth - 40,
    borderRadius: 5,
    color: "black",
    // backgroundColor:'#554994'
  },
  synopsis: {
    fontSize: 14,
    marginBottom: 20,
    marginVertical: 20,
    borderColor: "#554994",
    width: screenWidth - 25,
    marginHorizontal: 10,
    borderRadius: 5,
    color: "black",
    paddingVertical: 5,
    paddingHorizontal: 10,
    textAlign:"center",
  },
  bookmarkIcon: {
    top: 5,
    marginTop: 25,
    marginRight: 8,
    right: 5,
    width: 30,
    height: 30,
    position: "absolute",
  },
  TextInput: {
    width: screenWidth - 110,
    borderWidth: 1,
    borderColor: "#554994",
    marginHorizontal: 21,
    color: "black",
    padding: 10,
  },
  reviewConatiner: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 4,
    marginBottom: 15,
    borderRadius: 5,
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 20,
    textAlignVertical: "center",
  },
  start: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: 50,
    paddingVertical: 11,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
    backgroundColor: "#554994",
    borderRadius: 5,
    fontSize: 20,
  },
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 100,
    alignItems: "center",
    marginStart: 12,
    borderColor: "black",
    marginTop: 10,
  },
  usercontainer: {
    display: "flex",
    flexDirection: "row",
    // borderColor:'black',
    // borderWidth:1,0
    margin: 10,
    backgroundColor: "#554994",
    borderRadius: 10,
    color: "white",
  },
  closeIcon: {
    top: 20,
    // marginTop: 5,
    left: 10,
    width: 30,
    height: 30,
    position: "absolute",
    backgroundColor:'#E6E6FA',
    borderRadius:50,
    zIndex:-1,
    borderWidth:1,
    borderColor:'#E6E6FA',
    tintColor:'#554994'
  },
  pdfstyle: {
    flex: 1,
    height: screenHeight - 350,
    backgroundColor: "white",
    margin: 10,
    width: screenWidth - 100,
  },
});

export default BookDetails;
