import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Carousel, {
  ParallaxImage,
} from "react-native-snap-carousel-expo-46-compatible";
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
import { IconButton } from "react-native-paper";
import { useSelector } from "react-redux";

const { width: screenWidth } = Dimensions.get("window");

const CarouselCardItem = ({ item, index }, parallaxProps) => {
  const isCenter = parallaxProps.index === index;
  const zIndex = isCenter ? 0 : 1;
  const scale = isCenter ? 1 : 0.8;
  const translateY = isCenter ? 0 : -100;
  return (
    <View
      style={[
        {
          width: screenWidth - 200,
          zIndex,
          alignItems: "center",
          margin: 0,
        },
      ]}
    >
      <Image
        style={{
          width: 200,
          height: 250,
          resizeMode: "contain",
        }}
        source={{ uri: item.coverImg }}
      />
      <Text
        style={[
          { textAlign: "center", fontSize: 16 },
          {
            color:
              parallaxProps.index === index ? "#810CA8" : "rgba(0,0,0,0.7)",
          },
        ]}
      >
        {item.title}
      </Text>
      <Text
        style={[
          { textAlign: "center", fontSize: 14 },
          { color: isCenter ? "#2D033B" : "rgba(0,0,0,0.7)" },
        ]}
      >
        {item.author}
      </Text>
    </View>
  );
};
const SavedListCardItem = ({ item, index }, parallaxProps) => {
  // console.log(item);
  return (
    <View style={save_list_style.item}>
      <ParallaxImage
        source={{ uri: item.imgUrl }}
        containerStyle={save_list_style.imageContainer}
        style={save_list_style.image}
        parallaxFactor={0.09}
        showSpinner
        {...parallaxProps}
      />
      <View style={save_list_style.header_container}>
        <Text allowFontScaling={false} style={save_list_style.title}>
          {item.title.length > 20
            ? item.title.substring(0, 20) + " ..."
            : item.title}
        </Text>
        <Text allowFontScaling={false} style={save_list_style.author}>
          {item.author}
        </Text>
        <Stars
          style={save_list_style.rating}
          default={parseInt(item.rating)}
          spacing={5}
          starSize={10}
          count={5}
          fullStar={<Ionicons name="star" size={10} color="rgb(255, 204, 0)" />}
          emptyStar={<Ionicons name="star" size={10} color="rgba(0,0,0,0.9)" />}
        />
      </View>
    </View>
  );
};
const GenreCardItem = ({ item, index }, parallaxProps) => {
  // console.log(item);
  return (
    <View style={genre_card_styles.item}>
      <Image style={genre_card_styles.image} source={{ uri: item.coverImg }} />
      <View style={genre_card_styles.header_container}>
        <View>
          <Text allowFontScaling={false} style={genre_card_styles.title}>
            {item.title.length > 20
              ? item.title.substring(0, 20) + " ..."
              : item.title}
          </Text>
          <Text allowFontScaling={false} style={genre_card_styles.author}>
            {item.author}
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
  );
};

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
  const handleSearch = () => {
    navigation.navigate("BookSearch", { searchTerm });
    setSearchTerm("");
  };
  const books = useSelector((state) => state.BOOKS);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
  const handleButtonPress = (index) => {
    setSelectedButtonIndex(index);
  };

  const renderButton = (item, index) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => handleButtonPress(index)}
        style={[
          genre_styles.button,
          index === selectedButtonIndex && genre_styles.selectedButton,
        ]}
      >
        <View style={[genre_styles.backgroundImage]}>
          <Text
            allowFontScaling={false}
            style={[
              genre_styles.buttonText,
              selectedButtonIndex === index && genre_styles.selectedButtonText,
            ]}
          >
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1 }}>
        <WelcomeStatus navigation={navigation} />
      </View>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => navigation.navigate("BookSearch")}
        >
          <Ionicons
            name="search"
            size={24}
            color="black"
            style={styles.searchIcon}
          />
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
        {books && books.trendingBooks && (
          <Carousel
            ref={trendingCarosal}
            data={books.trendingBooks}
            renderItem={CarouselCardItem}
            sliderWidth={screenWidth - 100}
            itemWidth={screenWidth - 200}
            loop={true}
            activeSlideAlignment={"center"}
            hasParallaxImages={true}
            inactiveSlideScale={0.8}
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
      <View style={genre_styles.container}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {genre_data.map((item, index) => renderButton(item, index))}
        </ScrollView>
        <View style={genre_styles.contentContainer}>
          {
            <Carousel
              layout={"default"}
              ref={genreCarousel}
              data={books.trendingBooks}
              renderItem={GenreCardItem}
              sliderWidth={screenWidth - 100}
              sliderHeight={screenWidth - 200}
              itemWidth={screenWidth}
              autoplay={true}
              useScrollView={false}
            />
          }
        </View>
      </View>
      <View style={continue_reading_style.container}>
        <ImageBackground
          source={cont1}
          style={continue_reading_style.image}
          blurRadius={9}
        >
          <Text style={continue_reading_style.title}>Continue Reading ...</Text>
        </ImageBackground>
      </View>
      <View style={save_list_style.container}>
        <Text style={save_list_style.view}>Your saved Items</Text>
        {/* <Carousel
          ref={savedCarousel}
          data={books.trendingBooks}
          renderItem={SavedListCardItem}
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth / 3.5}
          hasParallaxImages={true}
          useScrollView={false}
          shouldOptimizeUpdates={true}
          enableSnap={true}
          enableMomentum={true}
        /> */}
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
    backgroundColor: "#fff",
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
    paddingBottom: 20,
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
    backgroundColor: "#eee",
    borderRadius: 10,
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
    paddingVertical: 20,
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
    width: "30%",
    borderRadius: 12,
    resizeMode: "contain",
  },
  header_container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 15,
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
