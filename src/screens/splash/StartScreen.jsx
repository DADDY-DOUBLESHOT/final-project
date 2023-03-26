import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import Carousel from "react-native-snap-carousel-expo-46-compatible/src/carousel/Carousel";
import read_book from "../../../assets/read_book.png";
import audio_book from "../../../assets/audio.png";
import discuss from "../../../assets/discuss.png";
import { Pagination } from "react-native-snap-carousel-expo-46-compatible";
import { useDispatch } from "react-redux";
import { loaderStop } from "../../store/actions/loaderAction";

const { width: screenWidth } = Dimensions.get("window");

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={card_styles.item}>
      <Image style={card_styles.image} source={item.img} />
      <Text style={[card_styles.title, { color: item.head }]}>
        {item.title}
      </Text>
    </View>
  );
};

export default function StartScreen({ navigation }) {
  const user = useSelector((state) => state.USER);
  const start = [
    {
      title: "Read Books",
      img: read_book,
      bg: "#E9D5CA",
      head: "white",
    },
    {
      title: "Listen up with audio.",
      img: audio_book,
      bg: "#FFBCD1",
      head: "white",
    },
    {
      title: "Unlock the power of your voice with discussions that inspire",
      img: discuss,
      bg: "#E5B8F4",
      head: "white",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const startCarousal = useRef(null);
  const dispatch = useDispatch();
  const [animatedBackgroundColor] = useState(new Animated.Value(0));
  useEffect(() => {
    dispatch(loaderStop());
    console.log("user from start", user);
    if (user && user.logged) navigation.replace("homenavi");
  }, [user.logged]);

  const startAnimation = (index) => {
    setActiveIndex(index);
    Animated.timing(animatedBackgroundColor, {
      toValue: index,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const animatedStyle = {
    backgroundColor: animatedBackgroundColor.interpolate({
      inputRange: [0, 1, 2],
      outputRange: ["#E9D5CA", "#FFBCD1", "#E5B8F4"],
    }),
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={{ flex: 0.5 }}></View>
      <View style={{ flex: 2, paddingVertical: 10 }}>
        <Carousel
          layout={"default"}
          ref={startCarousal}
          data={start}
          renderItem={CarouselCardItem}
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth}
          autoplay={true}
          enableMomentum
          autoplayDelay={1000}
          autoplayInterval={2500}
          enableSnap
          loop={true}
          activeAnimationType={"decay"}
          lockScrollWhileSnapping
          initialNumToRender={1}
          onSnapToItem={(index) => startAnimation(index)}
        />
        <Pagination
          dotsLength={start.length}
          activeDotIndex={activeIndex}
          containerStyle={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 8,
            backgroundColor: "rgba(0, 0, 0, 1)",
          }}
          inactiveDotStyle={
            {
              // Define styles for inactive dots here
            }
          }
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
      <View style={{ flex: 1 }}>
        <TouchableNativeFeedback
          onPress={() => {
            navigation.navigate("register");
          }}
        >
          <View
            style={{
              backgroundColor: "#363062",
              marginHorizontal: 20,
              marginVertical: 15,
              borderRadius: 15,
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                paddingVertical: 20,
                fontWeight: "bold",
                fontFamily: "Roboto",
                fontSize: 18,
              }}
            >
              Get Started
            </Text>
          </View>
        </TouchableNativeFeedback>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{ color: "#4D4C7D", fontFamily: "Roboto", fontSize: 15 }}
          >
            Already have an account?
          </Text>
          <Text
            style={{
              color: "#2D033B",
              fontWeight: "bold",
              marginLeft: 10,
              fontSize: 15,
            }}
            onPress={() => {
              navigation.navigate("login");
            }}
          >
            Log in
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  bottom: {
    flex: 1,
    width: "100%",
    backgroundColor: "#081327",
  },
  login: {
    borderRadius: 15,
    backgroundColor: "#810CA8",
    width: "100%",
    padding: 10,
  },
});
const card_styles = StyleSheet.create({
  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 2,
    padding: 10,
    width: screenWidth,
    height: screenWidth,
    resizeMode: "contain",
  },
  title: {
    fontFamily: "sans-serif-thin",
    flex: 1,
    fontWeight: "bold",
    fontSize: 25,
    padding: 20,
    textAlign: "center",
  },
});
