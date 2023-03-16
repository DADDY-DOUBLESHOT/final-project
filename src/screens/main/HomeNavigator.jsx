import React from "react";
import { Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen2 from "./HomeScreen2";
import ProfileView from "./ProfileView";

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
    </HomeDrawer.Navigator>
  );
};

export default HomeNavigator;
