import React from "react";
import { Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen2 from "./HomeScreen2";
import ProfileView from "./ProfileView";
// import UploadBook from "./UploadBook";
import UploadNavigator from "./UploadNavigator";
import BookDetail from "../BookDetail/BookDetail";

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
          headerTitle: "Book Forum",
          headerTitleAlign: "center",
        }}
        component={HomeScreen2}
      />
      <HomeDrawer.Screen
        name="home1"
        options={{
          title: "Home1",
          headerTitle: "Book Forum",
          headerTitleAlign: "center",
        }}
        component={BookDetail}
      />
      <HomeDrawer.Screen
        name="Upload"
        options={{
          title: "Upload Book",
          headerTitle: "Upload Book",
          headerTitleAlign: "center",
        }}
        component={UploadNavigator}
      />
    </HomeDrawer.Navigator>
  );
};

export default HomeNavigator;
