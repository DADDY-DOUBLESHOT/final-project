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
import romance from "../../assets/romance.png";
import adult from "../../assets/adult.png";
import bio from "../../assets/bio.png";
import comics from "../../assets/comics.png";
import fantasy from "../../assets/fantasy.png";
import history from "../../assets/history.png";
import horror from "../../assets/horror.png";
import mystery from "../../assets/mystery.png";
import science from "../../assets/science.png";
import short from "../../assets/short.png";
import study from "../../assets/study.png";
import young from "../../assets/young.png";
import cont1 from "../../assets/continue_read_1.jpg";
import cont2 from "../../assets/continue_read_2.jpg";

const { width: screenWidth } = Dimensions.get("window");

const CarouselCardItem = ({ item, index }, parallaxProps) => {
  // console.log(item);
  return (
    <View style={card_styles.item}>
      <ParallaxImage
        source={{ uri: item.imgUrl }}
        containerStyle={card_styles.imageContainer}
        style={card_styles.image}
        parallaxFactor={0.2}
        showSpinner
        {...parallaxProps}
      />
      <View style={card_styles.header_container}>
        <Text style={card_styles.title}>{item.title}</Text>
        <Text style={card_styles.author}>{item.author}</Text>
        <Stars
          style={card_styles.rating}
          default={item.rating}
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
const GenreCardItem = ({ item, index }, parallaxProps) => {
  // console.log(item);
  return (
    <View style={genre_card_styles.item}>
      <Image style={genre_card_styles.image} source={{ uri: item.imgUrl }} />
      <View style={genre_card_styles.header_container}>
        <Text style={genre_card_styles.title}>{item.title}</Text>
        <Text style={genre_card_styles.author}>{item.author}</Text>
        <Stars
          style={genre_card_styles.rating}
          default={item.rating}
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
    {
      title: "The Kite Runner",
      rating: "4.26",
      imgUrl: "https://images.gr-assets.com/books/1484565687m/77203.jpg",
      author: "Khaled Hosseini",
    },
    {
      title: "Divergent (Divergent, #1)",
      rating: "4.24",
      imgUrl: "https://images.gr-assets.com/books/1328559506m/13335037.jpg",
      author: "Veronica Roth",
    },
    {
      title: "Animal Farm",
      rating: "3.87",
      imgUrl: "https://images.gr-assets.com/books/1424037542m/7613.jpg",
      author: "George Orwell",
    },
    {
      title: "The Diary of a Young Girl",
      rating: "4.1",
      imgUrl: "https://images.gr-assets.com/books/1358276407m/48855.jpg",
      author: "Anne Frank, Eleanor Roosevelt, B.M. Mooyaart-Doubleday",
    },
    {
      title: "The Girl with the Dragon Tattoo (Millennium, #1)",
      rating: "4.11",
      imgUrl: "https://images.gr-assets.com/books/1327868566m/2429135.jpg",
      author: "Stieg Larsson, Reg Keeland",
    },
    {
      title: "Catching Fire (The Hunger Games, #2)",
      rating: "4.3",
      imgUrl: "https://images.gr-assets.com/books/1358273780m/6148028.jpg",
      author: "Suzanne Collins",
    },
    {
      title: "Harry Potter and the Prisoner of Azkaban (Harry Potter, #3)",
      rating: "4.53",
      imgUrl: "https://images.gr-assets.com/books/1499277281m/5.jpg",
      author: "J.K. Rowling, Mary GrandPré, Rufus Beck",
    },
    {
      title: "The Fellowship of the Ring (The Lord of the Rings, #1)",
      rating: "4.34",
      imgUrl: "https://images.gr-assets.com/books/1298411339m/34.jpg",
      author: "J.R.R. Tolkien",
    },
    {
      title: "Mockingjay (The Hunger Games, #3)",
      rating: "4.03",
      imgUrl: "https://images.gr-assets.com/books/1358275419m/7260188.jpg",
      author: "Suzanne Collins",
    },
    {
      title: "Harry Potter and the Order of the Phoenix (Harry Potter, #5)",
      rating: "4.46",
      imgUrl: "https://images.gr-assets.com/books/1387141547m/2.jpg",
      author: "J.K. Rowling, Mary GrandPré",
    },
    {
      title: "The Lovely Bones",
      rating: "3.77",
      imgUrl: "https://images.gr-assets.com/books/1457810586m/12232938.jpg",
      author: "Alice Sebold",
    },
    {
      title: "Harry Potter and the Chamber of Secrets (Harry Potter, #2)",
      rating: "4.37",
      imgUrl: "https://images.gr-assets.com/books/1474169725m/15881.jpg",
      author: "J.K. Rowling, Mary GrandPré",
    },
    {
      title: "Harry Potter and the Goblet of Fire (Harry Potter, #4)",
      rating: "4.53",
      imgUrl: "https://images.gr-assets.com/books/1361482611m/6.jpg",
      author: "J.K. Rowling, Mary GrandPré",
    },
    {
      title: "Harry Potter and the Deathly Hallows (Harry Potter, #7)",
      rating: "4.61",
      imgUrl: "https://images.gr-assets.com/books/1474171184m/136251.jpg",
      author: "J.K. Rowling, Mary GrandPré",
    },
    {
      title: "The Da Vinci Code (Robert Langdon, #2)",
      rating: "3.79",
      imgUrl: "https://images.gr-assets.com/books/1303252999m/968.jpg",
      author: "Dan Brown",
    },
    {
      title: "Harry Potter and the Half-Blood Prince (Harry Potter, #6)",
      rating: "4.54",
      imgUrl: "https://images.gr-assets.com/books/1361039191m/1.jpg",
      author: "J.K. Rowling, Mary GrandPré",
    },
    {
      title: "Lord of the Flies",
      rating: "3.64",
      imgUrl: "https://images.gr-assets.com/books/1327869409m/7624.jpg",
      author: "William Golding",
    },
    {
      title: "Romeo and Juliet",
      rating: "3.73",
      imgUrl: "https://images.gr-assets.com/books/1327872146m/18135.jpg",
      author: "William Shakespeare, Robert           Jackson",
    },
    {
      title: "Gone Girl",
      rating: "4.03",
      imgUrl: "https://images.gr-assets.com/books/1339602131m/8442457.jpg",
      author: "Gillian Flynn",
    },
  ];
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);

  const buttonNames = [
    "Button 1",
    "Button 2",
    "Button 3",
    "Button 4",
    "Button 5",
  ];
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

  const renderContent = () => {
    switch (selectedButtonIndex) {
      case 0:
        return (
          <Carousel
            layout={"stack"}
            ref={genreCarousel}
            data={data}
            renderItem={GenreCardItem}
            sliderWidth={screenWidth - 20}
            sliderHeight={screenWidth}
            itemWidth={screenWidth}
            autoplay={true}
          />
        );
      case 1:
        return <Text>Content for Button 2</Text>;
      case 2:
        return <Text>Content for Button 3</Text>;
      case 3:
        return <Text>Content for Button 4</Text>;
      case 4:
        return <Text>Content for Button 5</Text>;
      default:
        return <Text>Default Content</Text>;
    }
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
        />
      </View>
      <View style={genre_styles.container}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {genre_data.map((item, index) => renderButton(item, index))}
        </ScrollView>
        <Text style={genre_styles.viewAll}>View All</Text>
        <View style={genre_styles.contentContainer}>{renderContent()}</View>
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
      {/* <View style={styles.trendingContainer}>
        <Text style={styles.trendingText}>Top Trending</Text>
        <Carousel
          ref={isCarousel}
          data={data}
          renderItem={CarouselCardItem}
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth / 2}
          hasParallaxImages={true}
        />
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    width: "100%",
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
  },
  buttonText: {
    fontSize: 14,
    color: "white",
  },
  selectedButtonText: {
    color: "white",
    fontWeight: "600",
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
    padding: 5,
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: 20,
    padding: 5,
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
    resizeMode: "cover",
  },
  header_container: {
    position: "absolute",
    top: "60%",
    width: "100%",
    height: 100,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 5,
  },
  title: {
    fontSize: 24,
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

export default HomeScreen2;
