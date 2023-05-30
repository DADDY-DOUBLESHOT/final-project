import { StatusBar } from "expo-status-bar";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store";
import { useCallback, useEffect, useState } from "react";
import { theme } from "./src/theme";
import * as DefaultSplash from "expo-splash-screen";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./src/screens/splash/SplashScreen";
import StartScreen from "./src/screens/splash/StartScreen";
import LoginScreen from "./src/screens/login/LoginScreen";
import RegisterScreen from "./src/screens/login/RegisterScreen";
import HomeScreen2 from "./src/screens/main/HomeScreen2";
import ForgotScreen from "./src/screens/login/ForgotScreen";
import OTPScreen from "./src/screens/login/OTPScreen";
import GenresScreen from "./src/screens/login/GenresScreen";
import HomeNavigator from "./src/screens/main/HomeNavigator";
import BookDetail from "./src/screens/BookDetail/BookDetail";
import Reviews from "./src/screens/BookDetail/Reviews";
import ReadBook from "./src/screens/BookDetail/ReadBook";
import DiscussionForum from "./src/screens/BookDetail/DiscussionForum";
import AudioBookScreen from "./src/screens/main/AudioBookScreen";
// import BookDetail from "./src/screens/BookDetail/BookDetail";

DefaultSplash.preventAutoHideAsync();

const AppWrapper = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const checkLoadScreen = useCallback(async () => {
    try {
      DefaultSplash.hideAsync();
    } catch (error) {
    } finally {
      setAppIsReady(true);
    }
  });
  return (
    <View style={{ display: "flex", flex: 1 }} onLayout={checkLoadScreen}>
      <Provider store={store} theme={theme}>
        <App />
      </Provider>
    </View>
  );
};

const App = () => {
  const Stack = createStackNavigator();

  const user = useSelector((state) => state.USER);

  console.log("state", user);

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <StatusBar hidden />
      {/* <Provider store={store} theme={theme}> */}
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              animationEnabled: true,
              animationTypeForReplace: "pop",
            }}
            initialRouteName="splash"
          >
            <Stack.Screen name="splash" component={SplashScreen} />
            {
              <Stack.Group>
                <Stack.Screen name="start" component={StartScreen} />
                <Stack.Screen name="login" component={LoginScreen} />
                <Stack.Screen name="forgot" component={ForgotScreen} />
                <Stack.Screen name="register" component={RegisterScreen} />
                <Stack.Screen name="otp" component={OTPScreen} />
                <Stack.Screen name="genre" component={GenresScreen} />
              </Stack.Group>
            }

            {user && user.user && (
              // <Stack.Group>
              //   <Stack.Screen name="homenavi" component={HomeNavigator} />
              // </Stack.Group>
              <Stack.Group>
              <Stack.Screen name="homenavi" component={HomeNavigator} />
              <Stack.Screen name="discussionforum" component={DiscussionForum} />
              <Stack.Screen name="ReviewList" component={Reviews} />
              <Stack.Screen name="ReadBook" component={ReadBook} /> 
              <Stack.Screen name="bookdetail" component={BookDetail}/>
              <Stack.Screen name="AudioScreenBook" component={AudioBookScreen}/>
              </Stack.Group>
            )}
           
          </Stack.Navigator>
        </NavigationContainer>
      </KeyboardAvoidingView>
      {/* </Provider> */}
    </ScrollView>
  );
};

export default AppWrapper;
