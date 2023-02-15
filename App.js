import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider, useSelector } from "react-redux";
import store from "./store";
import { useEffect } from "react";
import getTheme from "./src/theme";
import MainNavigator from "./src/MainNavigator";
import LoginNavigator from "./src/LoginNavigator";

const Stack = createStackNavigator();

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const App = () => {
  const scheme = useColorScheme();
  const user = useSelector((state) => state.USER);
  console.log("About user", user);
  useEffect(() => {}, [user && user.logged]);
  return (
    <NavigationContainer theme={getTheme(scheme)}>
      <MainNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AppWrapper;
