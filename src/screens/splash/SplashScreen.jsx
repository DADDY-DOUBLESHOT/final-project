import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import splash from "../../../assets/book_icon.png";
import { loaderStart, loaderStop } from "../../store/actions/loaderAction";
import { quotes } from "../../utils/quotes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadUserToken } from "../../store/actions/userAction";

const SplashScreen = ({ navigation }) => {
  const [quote, setQuote] = useState(null);
  const dispatch = useDispatch();
  const slideAnim = useRef(new Animated.Value(0)).current;
  const textAnim = useRef(new Animated.Value(0)).current;
  const loader = useSelector((state) => state.LOADER);

  const load = async () => {
    // AsyncStorage.removeItem("@user");
    // AsyncStorage.removeItem("@token");
    try {
      let user = await AsyncStorage.getItem("@user");
      let token = await AsyncStorage.getItem("@token");
      if (user && token) {
        // console.log("Preload user from storage ", user, token);
        dispatch(loadUserToken(JSON.parse(user), token));
        navigation.replace("homenavi");
      } else {
        navigation.replace("start");
      }
    } catch (error) {
      ToastAndroid.show("Error in connecting server", ToastAndroid.SHORT);
      dispatch(loaderStop());
    } finally {
    }
  };

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(textAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        dispatch(loaderStart());
        load();
      });
    });
  }, []);
  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  const logoStyle = {
    transform: [
      {
        translateY: slideAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [80, 0],
        }),
      },
    ],
  };

  return (
    <View style={style.container}>
      <Animated.View style={[style.icon_container, logoStyle]}>
        <Image style={style.icon} source={splash} />
      </Animated.View>
      <Animated.View style={[style.quote_container, { opacity: textAnim }]}>
        <Text style={style.quote}>{quote?.quote}</Text>
        <Text style={style.writer}>~{quote?.writer}</Text>
        {loader && loader.active && (
          <ActivityIndicator
            size="small"
            color="white"
            style={{ paddingLeft: 12 }}
          />
        )}
      </Animated.View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
    textAlign: "right",
  },
  icon_container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  quote_container: {
    flex: 1,
    width: "90%",
    marginHorizontal: 2,
    textAlign: "center",
  },
  quote: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: "#ffffff",
    fontSize: 13,
    textAlign: "center",
  },
  writer: {
    paddingHorizontal: 10,
    color: "#ffffff",
    fontSize: 13,
    textAlign: "right",
  },
});

export default SplashScreen;
