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
import { Rating, AirbnbRating } from "react-native-ratings";
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

const { width: screenWidth } = Dimensions.get("window");

const CarouselCardItem = ({ item, index }, parallaxProps) => {
  // console.log(item);
  return (
    <View style={card_styles.item}>
      <ParallaxImage
        source={{ uri: item.imgUrl }}
        containerStyle={card_styles.imageContainer}
        style={card_styles.image}
        parallaxFactor={0.15}
        showSpinner
        {...parallaxProps}
      />
      <View style={card_styles.header_container}>
        <Text allowFontScaling={false} style={card_styles.title}>
          {item.title.length > 20
            ? item.title.substring(0, 20) + " ..."
            : item.title}
        </Text>
        <Text allowFontScaling={false} style={card_styles.author}>
          {item.author}
        </Text>
        <Stars
          style={card_styles.rating}
          default={parseInt(item.rating)}
          spacing={5}
          starSize={25}
          count={5}
          fullStar={<Ionicons name="star" size={20} color="rgb(255, 204, 0)" />}
          emptyStar={<Ionicons name="star" size={20} color="rgba(0,0,0,0.9)" />}
        />
      </View>
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
      <Image style={genre_card_styles.image} source={{ uri: item.imgUrl }} />
      <View style={genre_card_styles.header_container}>
        <Text allowFontScaling={false} style={genre_card_styles.title}>
          {item.title.length > 20
            ? item.title.substring(0, 20) + " ..."
            : item.title}
        </Text>
        <Text allowFontScaling={false} style={genre_card_styles.author}>
          {item.author}
        </Text>
        <Stars
          style={genre_card_styles.rating}
          default={parseInt(item.rating)}
          spacing={5}
          starSize={25}
          count={5}
          fullStar={<Ionicons name="star" size={20} color="rgb(255, 204, 0)" />}
          emptyStar={<Ionicons name="star" size={20} color="rgba(0,0,0,0.9)" />}
          isDisabled={true}
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
  const isCarousel = React.useRef(null);
  const genreCarousel = React.useRef(null);
  const savedCarousel = React.useRef(null);
  const handleSearch = () => {
    navigation.navigate("BookSearch", { searchTerm });
    setSearchTerm("");
  };
  const data = [
    {
      title: "The Hunger Games (The Hunger Games, #1)",
      rating: "4.34",
      imgUrl: "https://images.gr-assets.com/books/1447303603m/2767052.jpg",
      author: "Suzanne Collins",
    },
    {
      title: "Harry Potter and the Sorcerer's Stone (Harry Potter, #1)",
      rating: "4.44",
      imgUrl: "https://images.gr-assets.com/books/1474154022m/3.jpg",
      author: "J.K. Rowling, Mary GrandPré",
    },
    {
      title: "Twilight (Twilight, #1)",
      rating: "3.57",
      imgUrl: "https://images.gr-assets.com/books/1361039443m/41865.jpg",
      author: "Stephenie Meyer",
    },
    {
      title: "To Kill a Mockingbird",
      rating: "4.25",
      imgUrl: "https://images.gr-assets.com/books/1361975680m/2657.jpg",
      author: "Harper Lee",
    },
    {
      title: "The Great Gatsby",
      rating: "3.89",
      imgUrl: "https://images.gr-assets.com/books/1490528560m/4671.jpg",
      author: "F. Scott Fitzgerald",
    },
    {
      title: "The Fault in Our Stars",
      rating: "4.26",
      imgUrl: "https://images.gr-assets.com/books/1360206420m/11870085.jpg",
      author: "John Green",
    },
    {
      title: "The Hobbit",
      rating: "4.25",
      imgUrl: "https://images.gr-assets.com/books/1372847500m/5907.jpg",
      author: "J.R.R. Tolkien",
    },
    {
      title: "The Catcher in the Rye",
      rating: "3.79",
      imgUrl: "https://images.gr-assets.com/books/1398034300m/5107.jpg",
      author: "J.D. Salinger",
    },
    {
      title: "Angels & Demons  (Robert Langdon, #1)",
      rating: "3.85",
      imgUrl: "https://images.gr-assets.com/books/1303390735m/960.jpg",
      author: "Dan Brown",
    },
    {
      title: "Pride and Prejudice",
      rating: "4.24",
      imgUrl: "https://images.gr-assets.com/books/1320399351m/1885.jpg",
      author: "Jane Austen",
    },
  ];
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
          selectedButtonIndex === index && genre_styles.selectedButton,
        ]}
      >
        <ImageBackground
          blurRadius={2}
          source={item.img}
          style={[
            genre_styles.backgroundImage,
            selectedButtonIndex === index && genre_styles.selectedCard,
          ]}
        >
          <Text
            allowFontScaling={false}
            style={[
              genre_styles.buttonText,
              selectedButtonIndex === index && genre_styles.selectedButtonText,
            ]}
          >
            {item.title}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
      <View style={styles.trendingContainer}>
        <Text style={styles.trendingText}>Top Trending</Text>
        <Carousel
          ref={isCarousel}
          data={data}
          renderItem={CarouselCardItem}
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth / 2}
          hasParallaxImages={true}
          useScrollView={false}
          shouldOptimizeUpdates={true}
        />
      </View>
      <View style={genre_styles.container}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {genre_data.map((item, index) => renderButton(item, index))}
        </ScrollView>
        {/* <Text style={genre_styles.viewAll}>View All</Text> */}
        <View style={genre_styles.contentContainer}>
          {
            <Carousel
              layout={"stack"}
              ref={genreCarousel}
              data={data}
              renderItem={GenreCardItem}
              sliderWidth={screenWidth - 20}
              sliderHeight={screenWidth}
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
        <Carousel
          ref={savedCarousel}
          data={data}
          renderItem={SavedListCardItem}
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth / 3.5}
          hasParallaxImages={true}
          useScrollView={false}
          shouldOptimizeUpdates={true}
          enableSnap={true}
          enableMomentum={true}
        />
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
  },
  header: {
    height: 60,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  trendingContainer: {
    marginTop: 10,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 20,
    width: "100%",
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
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 20,
  },
  button: {
    borderRadius: 12,
    backgroundColor: "#eee",
    overflow: "hidden",
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: "rgba(0,107,255,255)",
    zIndex: -1,
  },
  buttonText: {
    fontSize: 14,
    color: "white",
  },
  selectedButtonText: {
    color: "white",
    fontWeight: "600",
    zIndex: 1,
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  backgroundImage: {
    resizeMode: "cover",
    justifyContent: "center",
    paddingHorizontal: 23,
    paddingVertical: 13,
    borderRadius: 12,
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
    width: screenWidth - 30,
    height: screenWidth / 2.5,
    display: "flex",
    flexDirection: "row",
    borderRadius: 12,
    overflow: "hidden",
    padding: 10,
    margin: 5,
    backgroundColor: "#f2f2f2",
  },
  image: {
    width: "50%",
    resizeMode: "cover",
    borderRadius: 20,
  },
  header_container: {
    padding: 3,
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: 18,
    padding: 3,
  },
  author: {
    fontSize: 12,
    paddingHorizontal: 10,
    color: "gray",
    marginBottom: 10,
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
