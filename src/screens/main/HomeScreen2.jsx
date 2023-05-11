import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, ScrollView, TouchableNativeFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Carousel, { ParallaxImage } from "react-native-snap-carousel-expo-46-compatible";
import Stars from "react-native-stars";
import romance from "../../../assets/romance.png";
import adult from "../../../assets/adult.png";
import bio from "../../../assets/bio.png";
import comics from "../../../assets/comics.png";
import fantasy from "../../../assets/fantasy.png";
import history from "../../../assets/history.png";
import horror from "../../../assets/horror.png";
import mystery from "../../../assets/mystery.png";
import science from "../../../assets/science.png";
import short from "../../../assets/short.png";
import study from "../../../assets/study.png";
import young from "../../../assets/young.png";
import cont1 from "../../../assets/continue_read_1.jpg";
import cont2 from "../../../assets/continue_read_2.jpg";
import WelcomeStatus from "./WelcomeStatus";
import { Avatar, IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { getGenreBooks } from "../../store/actions/booksAction";
import { LinearGradient } from "expo-linear-gradient";

const { width: screenWidth } = Dimensions.get("window");

const genre_data = [
  { id: 1, title: "Romance", img: romance },
  { id: 2, title: "Science Fiction", img: science },
  { id: 3, title: "Young Adult", img: young },
  { id: 4, title: "Adult Fiction", img: adult },
  { id: 5, title: "Mystery", img: mystery },
  { id: 6, title: "Fantasy", img: fantasy },
  { id: 7, title: "Short Stories", img: short },
  { id: 8, title: "Biography", img: bio },
  { id: 9, title: "Education", img: study },
  { id: 10, title: "Comics", img: comics },
  { id: 11, title: "Historical", img: history },
  { id: 12, title: "Horror", img: horror },
];

const HomeScreen2 = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const trendingCarosal = React.useRef(null);
  const genreCarousel = React.useRef(null);
  const savedCarousel = React.useRef(null);
  const popularCarousel = React.useRef(null);
  const authorCarousel = React.useRef(null);
  const dispatch = useDispatch();
  const handleSearch = () => {
    navigation.navigate("BookSearch", { searchTerm });
    setSearchTerm("");
  };
  const handlebookdetail = (id) => {
    navigation.navigate("bookdetail", { id });
  };
  const handlenavigation = (ref) => {
    if (ref && ref === trendingCarosal) {
      navigation.navigate("bookdetail", {
        id: trendingBooks(ref.current.currentIndex),
      });
    }
  };
  const handlePopularCarousel = (ref) => {
    if (ref && ref === popularCarousel) {
      navigation.navigate("bookdetail", {
        id: popularBooks(ref.current.currentIndex),
      });
    }
  };

  const dummyAuthors = [
    {
      _id: "6457d3b7ecbd4bd7bcd55121",
      name: "Vikarm Seth",
      profile: "https://i.pravatar.cc/150?img=3",
    },
    {
      _id: "6457d3b7ecbd4bd7bcd55121",
      name: "Anita Desai",
      profile: "https://i.pravatar.cc/150?img=3",
    },
    {
      _id: "6457d3b7ecbd4bd7bcd55121",
      name: "Chetan Bhagat",
      profile: "https://i.pravatar.cc/150?img=3",
    },
    {
      _id: "6457d3b7ecbd4bd7bcd55121",
      name: "Jhumpa Lahiri",
      profile: "https://i.pravatar.cc/150?img=3",
    },
    {
      _id: "6457d3b7ecbd4bd7bcd55121",
      name: "R.K Narayan",
      profile: "https://i.pravatar.cc/150?img=3",
    },
    {
      _id: "6457d3b7ecbd4bd7bcd55121",
      name: "Rabindranath Tagore",
      profile: "https://i.pravatar.cc/150?img=3",
    },
  ];

  const trendingBooks = useSelector((state) => state.BOOKS.trendingBooks);
  const popularBooks = useSelector((state) => state.BOOKS.popularBooks);
  const recommendedBooks = useSelector((state) => state.BOOKS.genreBooks);
  const genreBooks = useSelector((state) => state.BOOKS.genreBooks);
  const wishlist = useSelector((state) => state.BOOKS.wishlist);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
  const handleButtonPress = async (index) => {
    setSelectedButtonIndex(index);
    dispatch(await getGenreBooks(genre_data[index].title));
  };

  const renderButton = (item, index) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => handleButtonPress(index)}
        style={[genre_styles.button, index === selectedButtonIndex && genre_styles.selectedButton]}
      >
        <View style={[genre_styles.backgroundImage]}>
          <Text allowFontScaling={false} style={[genre_styles.buttonText, selectedButtonIndex === index && genre_styles.selectedButtonText]}>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleNavigation = (id) => {
    navigation.navigate("bookdetail", { id });
  };
  const handleAuthorNavigation = (id) => {
    navigation.navigate("author", { id });
  };

  const CarouselCardItem = ({ item, index }, parallaxProps) => {
    if (!item.author) {
      console.log("book with no author", item);
    }
    const isCenter = parallaxProps.index === index;
    const zIndex = isCenter ? 0 : 1;
    const scale = isCenter ? 1 : 0.8;
    const translateY = isCenter ? 0 : -100;
    return (
      <TouchableNativeFeedback
        onPress={() => {
          handleNavigation(item._id);
        }}
      >
        <View
          style={[
            {
              width: screenWidth - 200,
              zIndex,
              alignItems: "center",
              margin: 0,
            },
          ]}
          // onPress={() => navigation.navigate("bookdetail")}
        >
          <Image
            style={{
              width: 200,
              height: 250,
              resizeMode: "contain",
            }}
            source={{ uri: item?.coverImg }}
          />
          <Text
            style={[
              { textAlign: "center", fontSize: 16 },
              {
                color: parallaxProps.index === index ? "#810CA8" : "rgba(0,0,0,0.7)",
              },
            ]}
          >
            {item?.title}
          </Text>
          <Text style={[{ textAlign: "center", fontSize: 14 }, { color: isCenter ? "#2D033B" : "rgba(0,0,0,0.7)" }]}>
            {/* {item?.author.length > 20 ? item?.author.substring(0, 20) + "..." : item?.author} */}
          </Text>
        </View>
      </TouchableNativeFeedback>
    );
  };
  const PopularCardItem = ({ item, index }) => {
    return (
      <TouchableNativeFeedback
        onPress={() => {
          handleNavigation(item._id);
        }}
      >
        <View
          style={[
            {
              width: screenWidth / 3,

              alignItems: "flex-start",
              margin: 0,
            },
          ]}
        >
          <Image
            style={{
              width: screenWidth / 3,
              height: 180,
              resizeMode: "cover",
              borderRadius: 12,
              marginBottom: 5,
            }}
            source={{ uri: item.coverImg }}
          />
          <Text style={[{ textAlign: "left", fontSize: 14 }]}>{item.title}</Text>
          {/* <Text style={[{ textAlign: "center", fontSize: 12 }]}>
          {item.author.length > 20
            ? item.author.substring(0, 20) + "..."
            : item.author}
        </Text> */}
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text>{Number.parseFloat(item.rating).toFixed(1)}</Text>
            <IconButton size={18} style={{ padding: 0, margin: 0 }} icon={"star"} />
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  };
  const AuthorCardItem = ({ item, index }) => {
    return (
      <TouchableNativeFeedback
        onPress={() => {
          handleAuthorNavigation(item._id);
        }}
      >
        <View
          style={[
            {
              width: 100,
              alignItems: "center",
              margin: 0,
            },
          ]}
        >
          <Image
            style={{
              width: 80,
              height: 80,
              resizeMode: "cover",
              borderRadius: screenWidth / 2,
              borderWidth: 5,
              borderColor: "white",
            }}
            source={{ uri: item.profile }}
          />
          <Text style={[{ textAlign: "left", fontSize: 14 }]}>{item.title}</Text>
          <Text style={[{ textAlign: "center", fontSize: 12 }]}>{item.name.length > 20 ? item.name.substring(0, 20) + "..." : item.name}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  };
  const SavedListCardItem = ({ item, index }) => {
    const book = item.book;
    // console.log(item);
    return (
      <TouchableNativeFeedback
        onPress={() => {
          handleNavigation(item._id);
        }}
      >
        <View
          style={[
            {
              width: screenWidth / 3,
              height: 250,
              alignItems: "center",
              margin: 0,
            },
          ]}
        >
          <Image
            style={{
              width: screenWidth / 3,
              height: 180,
              resizeMode: "contain",
            }}
            source={{ uri: book.coverImg }}
          />
          <Text style={[{ textAlign: "left", fontSize: 14 }]}>{book.title}</Text>
          <Text style={[{ textAlign: "center", fontSize: 12 }]}>{book.author.length > 20 ? book.author.substring(0, 20) + "..." : book.author}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  };
  const GenreCardItem = ({ item, index }, parallaxProps) => {
    // console.log(item);
    return (
      <TouchableNativeFeedback
        onPress={() => {
          handleNavigation(item._id);
        }}
      >
        <View style={genre_card_styles.item}>
          <Image style={genre_card_styles.image} source={{ uri: item.coverImg }} />
          <View style={genre_card_styles.header_container}>
            <View>
              <Text allowFontScaling={false} style={genre_card_styles.title}>
                {item.title}
              </Text>
              <Text allowFontScaling={false} style={genre_card_styles.author}>
                {/* {item.author.length > 20
                  ? item.author.substring(0, 20) + "..."
                  : item.author} */}
              </Text>
            </View>
            <Stars
              style={genre_card_styles.rating}
              default={parseInt(item.rating)}
              spacing={5}
              starSize={25}
              count={5}
              fullStar={<Ionicons name="star" size={20} color="rgb(255, 204, 0)" />}
              emptyStar={<Ionicons name="star" size={20} color="rgba(0,0,0,0.9)" />}
              disabled={true}
            />
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1 }}>
        <WelcomeStatus navigation={navigation} />
      </View>
      <View style={styles.header}>
        <TouchableOpacity style={styles.searchBar} onPress={() => navigation.navigate("search")}>
          <Ionicons name="search" size={24} color="black" style={styles.searchIcon} />
          <Text style={styles.searchText}>Search any book</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.trendingText}>Top Trending</Text>
      <View style={styles.trendingContainer}>
        <IconButton
          onPress={() => {
            trendingCarosal.current.snapToPrev();
          }}
          style={{
            height: "100%",
            width: 50,
            padding: 0,
            margin: 0,
          }}
          icon={"chevron-left"}
        />
        {trendingBooks && (
          <Carousel
            ref={trendingCarosal}
            data={trendingBooks}
            renderItem={CarouselCardItem}
            sliderWidth={screenWidth - 100}
            itemWidth={screenWidth - 200}
            loop={true}
            activeSlideAlignment={"center"}
            hasParallaxImages={true}
            inactiveSlideScale={0.8}
            useScrollView={false}
            enableMomentum={false}
            slideStyle={{
              margin: 0,
              padding: 0,
            }}
          />
        )}
        <IconButton
          onPress={() => {
            trendingCarosal.current.snapToNext();
          }}
          style={{
            height: "100%",
            width: 50,
            padding: 0,
            margin: 0,
          }}
          icon={"chevron-right"}
        />
      </View>
      <View style={{ flex: 1, marginHorizontal: 10, marginBottom: 10 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            margin: 0,
            padding: 0,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              margin: 0,
              padding: 0,
            }}
          >
            Popular Books
          </Text>
          <IconButton
            onPress={() => {
              navigation.navigate("popular");
            }}
            icon="arrow-right"
            size={20}
          />
        </View>
        <Text style={{ color: "rgba(0,0,0,0.5)", marginBottom: 15 }}>All time popular books you wanna read</Text>
        {popularBooks && (
          <Carousel
            layout="default"
            ref={popularCarousel}
            data={popularBooks.slice(0, 10)}
            renderItem={PopularCardItem}
            sliderWidth={screenWidth - 20}
            itemWidth={screenWidth / 2.5}
            activeSlideAlignment={"start"}
            useScrollView={false}
            shouldOptimizeUpdates={true}
            enableSnap={true}
            enableMomentum={true}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
          />
        )}
      </View>
      <View style={{ flex: 1, marginHorizontal: 10, marginBottom: 10 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            margin: 0,
            padding: 0,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              margin: 0,
              padding: 0,
            }}
          >
            Recommended for you
          </Text>
          <IconButton
            style={{ margin: 0, padding: 0 }}
            icon="arrow-right"
            size={20}
            onPress={() => {
              navigation.navigate("recommend");
            }}
          />
        </View>
        <Text style={{ color: "rgba(0,0,0,0.5)", marginBottom: 15 }}>Based on your intrests</Text>
        {recommendedBooks && (
          <Carousel
            layout="default"
            ref={popularCarousel}
            data={recommendedBooks.slice(0, 10)}
            renderItem={PopularCardItem}
            sliderWidth={screenWidth - 20}
            itemWidth={screenWidth / 2.5}
            activeSlideAlignment={"start"}
            useScrollView={false}
            shouldOptimizeUpdates={true}
            enableSnap={true}
            enableMomentum={true}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
          />
        )}
      </View>
      <View style={{ flex: 1, marginHorizontal: 10, marginBottom: 10 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            margin: 0,
            padding: 0,
            marginBottom: 5,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              margin: 0,
              padding: 0,
            }}
          >
            Top Author
          </Text>
          <IconButton
            style={{ margin: 0, padding: 0 }}
            icon="arrow-right"
            size={20}
            onPress={() => {
              navigation.navigate("recommend");
            }}
          />
        </View>
        {dummyAuthors && (
          <Carousel
            layout="default"
            ref={authorCarousel}
            data={dummyAuthors}
            renderItem={AuthorCardItem}
            sliderWidth={screenWidth - 20}
            itemWidth={100}
            activeSlideAlignment={"start"}
            useScrollView={false}
            shouldOptimizeUpdates={true}
            enableSnap={true}
            enableMomentum={true}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
          />
        )}
      </View>
      <View style={genre_styles.container}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {genre_data.map((item, index) => renderButton(item, index))}
        </ScrollView>
        <View style={genre_styles.contentContainer}>
          {genreBooks && (
            <Carousel
              layout={"default"}
              ref={genreCarousel}
              data={genreBooks}
              renderItem={GenreCardItem}
              sliderWidth={screenWidth - 30}
              sliderHeight={screenWidth - 200}
              itemWidth={screenWidth - 100}
              useScrollView={false}
              enableMomentum={false}
              activeSlideAlignment={"start"}
              slideStyle={{
                margin: 0,
                padding: 0,
              }}
              loop={true}
              enableSnap={true}
              autoplay={true}
              autoplayDelay={1500}
              autoplayInterval={3000}
            />
          )}
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          margin: 10,
        }}
      >
        <LinearGradient
          style={{ flex: 1, padding: 10, borderRadius: 20 }}
          colors={["#6867AC", "#A267AC"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          angle={60}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "white",
              paddingHorizontal: 20,
            }}
          >
            Continue Reading
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("ReadBook")}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "white",
                marginHorizontal: 10,
                marginVertical: 10,
                borderRadius: 30,
                padding: 10,
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar.Image source={{ uri: wishlist[0]?.book?.coverImg }} />
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    padding: 7,
                    justifyContent: "center",
                    alignItems: "flex-start",
                  }}
                >
                  {wishlist && <Text style={{ flex: 1, fontSize: 14, paddingHorizontal: 5 }}>{wishlist[0]?.book?.title}</Text>}
                  {wishlist && (
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 12,
                        color: "rgba(0,0,0,0.5)",
                        paddingBottom: 10,
                        paddingHorizontal: 5,
                      }}
                    >
                      {wishlist[0]?.book?.author}
                    </Text>
                  )}
                  {wishlist && (
                    <Stars
                      default={parseInt(wishlist[0]?.book?.rating)}
                      spacing={5}
                      starSize={25}
                      count={5}
                      fullStar={<Ionicons name="star" size={20} color="rgb(255, 204, 0)" />}
                      emptyStar={<Ionicons name="star" size={20} color="rgba(0,0,0,0.9)" />}
                      disabled={true}
                    />
                  )}
                </View>
              </View>
              <IconButton icon="chevron-right" size={35} />
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <View style={{ flex: 1, marginHorizontal: 10, marginBottom: 20 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            margin: 0,
            padding: 0,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              margin: 0,
              padding: 0,
            }}
          >
            Wishlist
          </Text>
          <IconButton
            style={{ margin: 0, padding: 0 }}
            icon="arrow-right"
            size={20}
            onPress={() => {
              navigation.navigate("wishlist");
            }}
          />
        </View>
        <Text style={{ color: "rgba(0,0,0,0.5)", marginBottom: 10 }}>Save you favourites for later</Text>
        {popularBooks && (
          <Carousel
            layout="default"
            ref={popularCarousel}
            onPress={() => {
              handlePopularCarousel;
            }}
            data={wishlist.slice(0, 10)}
            renderItem={SavedListCardItem}
            sliderWidth={screenWidth - 20}
            itemWidth={screenWidth / 2.5}
            activeSlideAlignment={"start"}
            useScrollView={false}
            shouldOptimizeUpdates={true}
            enableSnap={true}
            enableMomentum={true}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginBottom: 50,
    paddingBottom: 20,
    backgroundColor: "white",
  },
  header: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  trendingContainer: {
    marginTop: 10,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  trendingText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  trendingItem: {
    marginHorizontal: 5,
    width: 120,
    height: 120,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.06)",
    borderRadius: 15,
    width: "90%",
    height: 40,
    paddingLeft: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchText: {
    fontSize: 16,
    color: "#aaa",
  },
  bodyText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 30,
    backgroundColor: "red",
  },
});

const genre_styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    width: "100%",
    paddingBottom: 20,
  },
  button: {
    marginHorizontal: 5,
    borderRadius: 20,
  },
  selectedButton: {
    backgroundColor: "#554994",
  },
  buttonText: {
    fontSize: 15,
    color: "rgba(0,0,0,0.6)",
  },
  selectedButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  backgroundImage: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 23,
    paddingVertical: 13,
  },
  selectedCard: {
    opacity: 0.2,
  },
  viewAll: {
    fontSize: 12,
    right: 0,
    textAlign: "right",
    marginTop: 10,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#000",
  },
});
const genre_card_styles = StyleSheet.create({
  item: {
    width: screenWidth - 100,
    height: screenWidth / 2.5,
    display: "flex",
    flexDirection: "row",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f2f2f2",
  },
  image: {
    margin: 10,
    width: "30%",
    borderRadius: 12,
    resizeMode: "contain",
  },
  header_container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    margin: 10,
  },
  title: {
    fontSize: 14,
    padding: 3,
  },
  author: {
    fontSize: 13,
    paddingHorizontal: 5,
    color: "gray",
  },
  rating: {
    width: "100%",
  },
});
const card_styles = StyleSheet.create({
  item: {
    width: screenWidth / 2,
    height: screenWidth - 100,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    resizeMode: "contain",
    width: screenWidth / 2,
    height: screenWidth - 120,
  },
  header_container: {
    position: "absolute",
    top: "65%",
    width: "100%",
    height: 100,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 5,
  },
  title: {
    fontSize: 18,
    color: "white",
  },
  author: {
    fontSize: 12,
    color: "white",
  },
  rating: {
    width: "100%",
    marginTop: 10,
  },
});
const continue_reading_style = StyleSheet.create({
  container: {
    marginVertical: 30,
    width: screenWidth - 30,
    height: 150,
    borderRadius: 18,
    overflow: "hidden",
    padding: 20,
  },
  title: {
    fontSize: 25,
    color: "white",
    fontWeight: "400",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
});
const save_list_style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  view: {
    fontSize: 12,
    textDecorationStyle: "solid",
  },
  card_container: {
    marginVertical: 20,
    width: screenWidth,
    borderRadius: 18,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  item: {
    width: screenWidth / 4,
    height: screenWidth / 3,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 10,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "contain",
  },
  header_container: {
    position: "absolute",
    top: "50%",
    width: "100%",
    height: 60,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 5,
  },
  title: {
    fontSize: 12,
    color: "white",
  },
  author: {
    fontSize: 8,
    color: "white",
  },
  rating: {
    width: "80%",
    marginTop: 10,
  },
});

export default HomeScreen2;
