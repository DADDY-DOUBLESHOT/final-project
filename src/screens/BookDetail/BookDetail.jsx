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
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { Rating, AirbnbRating } from "react-native-ratings";
import Stars from "react-native-stars";
import * as Haptics from "expo-haptics";
import photo from "../../images/photo.jpg";
import bookmark from "../../images/bookmark.png";
import ReadMore from "react-native-read-more-text";
import { useSelector, useDispatch } from "react-redux";
import { loaderStart, loaderStop } from "../../store/actions/loaderAction";
import { BASE_URL } from "@env";

import Animated, {
  interpolate,
  withTiming,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const BookDetails = ({ route, navigation }) => {
  // const id = navigation;

  const opacity = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const [data, setData] = useState({
    title: "",
    author: "",
    coverImg: null,
    description: "",
    pdf_url: null,
  });

  useEffect(() => {
    fetchBookdetails(route.params.id);
  }, []);

  const fetchBookdetails = async (id) => {
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
          });
        })
        .catch(function (error) {
          console.log("Unable to show Book", error);
        });
    } catch (error) {
      console.log("Unable to show Book", error);
    }
  };

  const bookDetails = {
    _id: "63f504f55012860157ab8c99",
    book_id: 1,
    goodreads_book_id: 2767052,
    best_book_id: 2767052,
    work_id: 2792775,
    books_count: 272,
    isbn: 9780439023480,
    authors: "Suzanne Collins",
    original_publication_year: 2008,
    original_title: "The Hunger Games",
    title: "The Hunger Games (The Hunger Games, #1)",
    language_code: "eng",
    average_rating: 4.34,
    description:
      "WINNING MEANS FAME AND FORTUNE.LOSING MEANS CERTAIN DEATH.THE HUNGER GAMES HAVE BEGUN. . . .In the ruins of a place once known as North America lies the nation of Panem, a shining Capitol surrounded by twelve outlying districts. The Capitol is harsh and cruel and keeps the districts in line by forcing them all to send one boy and once girl between the ages of twelve and eighteen to participate in the annual Hunger Games, a fight to the death on live TV.Sixteen-year-old Katniss Everdeen regards it as a death sentence when she steps forward to take her sister's place in the Games. But Katniss has been close to dead before—and survival, for her, is second nature. Without really meaning to, she becomes a contender. But if she is to win, she will have to start making choices that weight survival against humanity and life against love.",
    ratings_count: 4780653,
    work_ratings_count: 4942365,
    work_text_reviews_count: 155254,
    ratings_1: 66715,
    ratings_2: 127936,
    ratings_3: 560092,
    ratings_4: 1481305,
    ratings_5: 2706317,
    image_url: "https://images.gr-assets.com/books/1447303603m/2767052.jpg",
    small_image_url:
      "https://images.gr-assets.com/books/1447303603s/2767052.jpg",
    ratings: 3.5,
    numOfReviews: 2,
    user: "63f4fe97cbf3c8a2d53d6421",
    reviews: [
      {
        user: "640a0b6de1cf3e3898724a84",
        name: "Pratham",
        rating: 4,
        comment: "Great product",
        _id: "6415ede25980c3120df7108f",
      },
      {
        user: "63ebc185554480c3e6135c4d",
        name: "Pratham",
        rating: 3,
        comment: "Best book ever",
        _id: "6415ee685980c3120df71099",
      },
      {
        user: "63ebc185554480c3e6135c4d",
        name: "Pratham",
        rating: 3,
        comment: "Best book ever",
        _id: "6415ee685980c3120df71099",
      },
      {
        user: "63ebc185554480c3e6135c4d",
        name: "Pratham",
        rating: 3,
        comment: "Best book ever",
        _id: "6415ee685980c3120df71099",
      },
      {
        user: "63ebc185554480c3e6135c4d",
        name: "Pratham",
        rating: 3,
        comment: "Best book ever",
        _id: "6415ee685980c3120df71099",
      },
    ],
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
          onPress={() => console.log("Bookmark", { pdf_url })}
        >
          <Image
            source={bookmark}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              tintColor: "white",
            }}
          />
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

  // useEffect(() => {
  //     axios.get('http://localhost:5000/api/v1/book/63f504f55012860157ab8c99')
  //       .then(response => {
  //         setBookDetails(response.data);
  //         console.log(response.data);
  //       })
  //       .catch(error => {
  //         console.error(error.message);
  //       });
  // }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={{ zIndex: -1 }}>
        {/* <View onPress={goBack} style={styles.closeIcon}>
          <TouchableOpacity onPress={goBack}>
              <Image source={backarrow} style={styles.closeIcon} />
            </TouchableOpacity>
        </View> */}
        {/* <View  style={styles.bookmarkIcon}>
            <TouchableOpacity>
                <Image source={bookmark} style={styles.bookmarkIcon} />
              </TouchableOpacity>
          </View> */}
        <ImageBackground
          style={[
            {
              width: screenWidth,
              height: screenHeight - 180,
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
              marginTop: 20,
              borderRadius: 10,
              backgroundColor: "rgba(0,0,0,0.3)",
            }}
          >
            {/* Rating */}
            <View style={{ flex: 1, alignItems: "center", color: "white" }}>
              <Text style={{ color: "white" }}>
                {bookDetails.average_rating}
              </Text>
              <Text style={{ color: "white" }}>Rating</Text>
            </View>

            <LineDivider />

            {/* Pages */}
            <View style={{ flex: 1, alignItems: "center", color: "white" }}>
              <Text style={{ color: "white" }}>{bookDetails.books_count}</Text>
              <Text style={{ color: "white" }}>Pages</Text>
            </View>

            <LineDivider />

            {/* ratngs count */}
            <View style={{ flex: 1, alignItems: "center", color: "white" }}>
              <Text style={{ color: "white" }}>
                {bookDetails.ratings_count}
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

        <View>
          <ScrollView
            style={{
              borderColor: "#554994",
              marginHorizontal: 20,
              marginVertical: 20,
            }}
            horizontal={false}
          >
            <ReadMore
              ReadMore
              numberOfLines={7}
              renderTruncatedFooter={(handlePress) => {
                return (
                  <Text
                    onPress={handlePress}
                    style={{
                      color: "grey",
                      marginHorizontal: "12",
                      backgroundColor: "black",
                    }}
                  >
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
                {data.description}
              </Text>
            </ReadMore>
          </ScrollView>
        </View>

        {/* <View  style={{width:"100%",alignItems:'center',justifyContent:'center',textAlign:'center'}}><Text style={styles.start}>Start Reading</Text></View> */}

        <View style={styles.review}>
          <Text style={{ color: "black", padding: 15, fontSize: 16 }}>
            User Reviews:
          </Text>
          <ScrollView>
            <View>
              <View style={styles.usercontainer}>
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
                    style={{ marginStart: 10, marginTop: 10, color: "white" }}
                  >
                    {bookDetails.reviews[0].name}
                  </Text>
                  <Text
                    style={{
                      height: 40,
                      marginStart: 10,
                      paddingVertical: 5,
                      color: "white",
                    }}
                  >
                    {bookDetails.reviews[0].comment}
                  </Text>
                </View>
              </View>
              <View style={styles.usercontainer}>
                <Image source={photo} style={styles.profileImg} />
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    borderColor: "black",
                    width: screenWidth - 130,
                  }}
                >
                  <Text
                    style={{ marginStart: 10, marginTop: 10, color: "white" }}
                  >
                    {bookDetails.reviews[1].name}
                  </Text>
                  <Text
                    style={{
                      height: 40,
                      marginStart: 10,
                      paddingVertical: 5,
                      color: "white",
                    }}
                  >
                    {bookDetails.reviews[1].comment}
                  </Text>
                </View>
              </View>
              <View style={styles.usercontainer}>
                <Image source={photo} style={styles.profileImg} />
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    borderColor: "black",
                    width: screenWidth - 130,
                  }}
                >
                  <Text
                    style={{ marginStart: 10, marginTop: 10, color: "white" }}
                  >
                    {bookDetails.reviews[2].name}
                  </Text>
                  <Text
                    style={{
                      height: 40,
                      marginStart: 10,
                      paddingVertical: 5,
                      color: "white",
                    }}
                  >
                    {bookDetails.reviews[1].comment}
                  </Text>
                </View>
              </View>
              <View style={styles.usercontainer}>
                <Image source={photo} style={styles.profileImg} />
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    borderColor: "black",
                    width: screenWidth - 130,
                  }}
                >
                  <Text
                    style={{ marginStart: 10, marginTop: 10, color: "white" }}
                  >
                    {bookDetails.reviews[3].name}
                  </Text>
                  <Text
                    style={{
                      height: 40,
                      marginStart: 10,
                      paddingVertical: 5,
                      color: "white",
                    }}
                  >
                    {bookDetails.reviews[1].comment}
                  </Text>
                </View>
              </View>
              <Text
                onPress={() => navigation.navigate("ReviewList")}
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
            </View>
          </ScrollView>
        </View>

        {/* Write a review */}
        <View style={styles.reviewConatiner}>
          <TextInput
            placeholder="Text"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            color="black"
            useAnimatedScrollView="true"
            style={styles.TextInput}
          >
            Write a Review
          </TextInput>
          <Button
            title="Send"
            width="200"
            style={styles.button}
            color="#554994"
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

{
  /* <View style={{flex:1, justifyContent:'flex-start', alignItems:'center'}}> */
}
{
  /* <Pdf  trustAllCerts={false}
          source={{
            uri: 'https://api.printnode.com/static/test/pdf/multipage.pdf',
          }}
          page={1}
          minScale={0.5}
          maxScale={3.0}
          renderActivityIndicator={() => (
            <ActivityIndicator color="black" size="large" />
          )}
          enablePaging={true}
        onLoadProgress={(percentage) => console.log(`Loading :${percentage}`)}
        onLoadComplete={() => console.log('Loading Complete')}
        onPageChanged={(page, totalPages) => console.log(`${page}/${totalPages}`)}
        onError={(error) => console.log(error)}
        onPageSingleTap={(page) => alert(page)}
        onPressLink={(link) => Linking.openURL(link)}
        onScaleChanged={(scale) => console.log(scale)}
        // singlePage={true}
        spacing={10}
        // horizontal
        style={{flex: 1, width: Dimensions.get('window').width}}
        /> */
}
{
  /* </View> */
}

{
  /* <View style={styles.pdfstyle}> */
}
{
  /* <PdfReader url="http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf"/> */
}
{
  /* <PDFReader
          source={{ uri:"https://api.printnode.com/static/test/pdf/multipage.pdf"
         }}
         style={{flex: 1, width: Dimensions.get('window').width}}
        />
        </View> */
}
//  </View>

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
    width: screenWidth - 100,
    height: screenHeight - 450,
    marginBottom: 10,
    marginTop: 30,
    zIndex: 1,
    marginHorizontal: 10,
    alignSelf: "center",
    zIndex: 1,
    opacity: 1,
    resizeMode: "cover",
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
    marginTop: 25,
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
    // marginBottom: 25,
    // marginVertical: 25,
    borderColor: "#554994",
    borderWidth: 1,
    width: screenWidth - 40,
    marginHorizontal: 20,
    height: "100%",
    borderRadius: 5,
    color: "black",
    paddingVertical: 5,
    paddingHorizontal: 10,
    overflow: "scroll",
  },
  bookmarkIcon: {
    top: 5,
    marginTop: 25,
    marginRight: 8,
    right: 10,
    width: 20,
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
    top: 5,
    marginTop: 28,
    left: 10,
    width: 50,
    height: 25,
    position: "absolute",
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
