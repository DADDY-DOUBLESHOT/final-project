import React from "react";
import { Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen2 from "./HomeScreen2";
import ProfileView from "./ProfileView";
import AudioBookScreen from "./AudioBookScreen";
import UploadBook from "./UploadBook";
import WelcomeStatus from "./WelcomeStatus";

const HomeDrawer = createDrawerNavigator();

const HomeNavigator = () => {
  return (
    <HomeDrawer.Navigator
      initialRouteName="home"
      detachInactiveScreens
      screenOptions={{
        drawerActiveTintColor: "#A267AC",
      }}
      drawerContent={(props) => <ProfileView {...props} />}
    >
      <HomeDrawer.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
        }}
        component={HomeScreen2}
      />
      <HomeDrawer.Screen
        name="screenreader"
        options={{
          title: "",
          headerTitle: "",
          drawerItemStyle: {
            // display: "none",
          },
        }}
        component={AudioBookScreen}
      />
      <HomeDrawer.Screen
        name="Upload"
        options={{
          title: "Upload Book",
          headerTitle: "Upload Book",
          headerTitleAlign: "center",
        }}
        component={UploadBook}
      />
    </HomeDrawer.Navigator>
  );
};

export default HomeNavigator;
