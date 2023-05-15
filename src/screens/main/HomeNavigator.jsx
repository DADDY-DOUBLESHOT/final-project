import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen2 from "./HomeScreen2";
import ProfileView from "./ProfileView";
import AudioBookScreen from "./AudioBookScreen";
import UploadBook from "./UploadBook";
import PopularBooks from "./PopularBooks";
import RecommendedBooks from "./RecommendedBooks";
import Wishlist from "./Wishlist";
import SearchScreen from "./SearchScreen";
import { IconButton } from "react-native-paper";
import { Text, View } from "react-native";
// import UploadBook from "./UploadBook";
import UploadNavigator from "./UploadNavigator";
import BookDetail from "../BookDetail/BookDetail";
import AuthorBooks from "./AuthorBooks";
import DiscussionForum from "../BookDetail/DiscussionForum";

const HomeDrawer = createDrawerNavigator();

const HomeNavigator = () => {
  return (
    <HomeDrawer.Navigator
      initialRouteName="home"
      detachInactiveScreens
      screenOptions={{
        drawerStatusBarAnimation: "fade",
        drawerActiveTintColor: "#A267AC",
      }}
      drawerContent={(props) => <ProfileView {...props} />}
    >
      <HomeDrawer.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          drawerIcon: ({ color, focused, size }) => <IconButton size={size} style={{ margin: 0, padding: 0 }} iconColor={color} icon={"home"} />,
        }}
        component={HomeScreen2}
      />
      <HomeDrawer.Screen
        name="screenreader"
        options={{
          title: "",
          headerTitle: "",
          drawerItemStyle: {},
        }}
        component={AudioBookScreen}
      />
      <HomeDrawer.Screen
        name="popular"
        options={{
          title: "",
          headerTitle: "",
          drawerItemStyle: {
            display: "none",
          },
          headerShown: false,
        }}
        component={PopularBooks}
      />
      <HomeDrawer.Screen
        name="author"
        options={{
          title: "",
          headerTitle: "",
          drawerItemStyle: {
            display: "none",
          },
          headerShown: false,
        }}
        component={AuthorBooks}
      />
      <HomeDrawer.Screen
        name="recommend"
        options={{
          title: "",
          headerTitle: "",
          drawerItemStyle: {
            display: "none",
          },
          headerShown: false,
        }}
        component={RecommendedBooks}
      />
      <HomeDrawer.Screen
        name="wishlist"
        options={{
          title: "Wishlist",
          drawerIcon: ({ color, focused, size }) => <IconButton size={size} style={{ margin: 0, padding: 0 }} iconColor={color} icon={"bookmark"} />,
          headerShown: false,
        }}
        component={Wishlist}
      />
      {/* <HomeDrawer.Screen
        name="Discussion Forum"
        options={{
          title: "Discussion Forum",
          drawerIcon: ({ color, focused, size }) => (
            <IconButton
              size={size}
              style={{ margin: 0, padding: 0 }}
              iconColor={color}
              icon={"bookmark"}
            />
          ),
          headerShown: false,
        }}
        component={DiscussionForum}
      /> */}
      <HomeDrawer.Screen
        name="search"
        options={{
          title: "",
          headerTitle: "",
          drawerItemStyle: {
            display: "none",
          },
          headerShown: false,
        }}
        component={SearchScreen}
      />
      {/* <HomeDrawer.Screen
        name="bookdetail"
        options={{
          title: "Bookdetail",
          headerTitle: "Book Forum",
          headerTitleAlign: "center",
        }}
        component={BookDetail}
      /> */}
      <HomeDrawer.Screen
        name="Upload"
        options={{
          title: "Upload Book",
          headerTitle: "Upload Book",
          headerTitleAlign: "center",
          drawerIcon: ({ color, focused, size }) => (
            <IconButton size={size} style={{ margin: 0, padding: 0 }} iconColor={color} icon={"cloud-upload-outline"} />
          ),
          headerShown: true,
        }}
        component={UploadNavigator}
      />
    </HomeDrawer.Navigator>
  );
};

export default HomeNavigator;
