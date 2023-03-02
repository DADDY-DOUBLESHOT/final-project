import 'react-native-gesture-handler';
import React, { useRef, useState } from "react";
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import profile from "../images/profile.png";
import camera from "../images/camera.png";
import upload from "../images/upload.png";
// Tab ICons...
import home from "../images/home.png";
import search from "../images/search.png";
import notifications from "../images/bell.png";
import settings from "../images/settings.png";
import logout from "../images/logout.png";
import bookmark from "../images/bookmark.png";
import edit from "../images/edit.png";
// Menu
import menu from "../images/menu.png";
import close from "../images/close.png";

// Photo
import photo from "../images/photo.jpg";
import HomeScreen2 from "./HomeScreen2";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../store/actions/userAction";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// import HomeScreen2 from './HomeScreen2';

import FirstPage from './BookListScreen';
import SecondPage from './HomeScreen';
import ThirdPage from './GenresScreen';

// Import Custom Sidebar
import CustomSidebarMenu from './CustomSidebarMenu';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={{ justifyContent: "flex-start", padding: 15 }}>
        <Image
          source={profile}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            marginTop: 70,
            alignItems: "center",
            marginStart: 45,
            resizeMode: "cover",
            justifyContent: "center",
          }}
        ></Image>
        <Image
          source={camera}
          style={{
            width: 30,
            height: 20,
            borderRadius: 5,
            marginTop: -25,
            alignItems: "center",
            marginStart: 120,
          }}
        ></Image>
        </View>
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 10,
            }}
            >
            <Text
                style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "white",
                alignItems: "center",
                textAlign: "center",
                }}
                allowFontScaling={false}
            >
                {user && user.user ? user.user.name : "USER"}
            </Text>
            
            <Image
            source={edit}
            style={{
              width: 20,
              height: 20,
              marginLeft: 5,
            }}
          ></Image>
        </View>
    </View>
  );
};

function firstScreenStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="FirstPage">
      <Stack.Screen
        name="FirstPage"
        component={HomeScreen2}
        options={{
          title: 'Home', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
        //   headerStyle: {
        //     backgroundColor: '#f4511e', //Set Header color
        //   },
        //   headerTintColor: '#fff', //Set Header text color
        //   headerTitleStyle: {
        //     fontWeight: 'bold', //Set Header text style
        //   },
        }}
      />
    </Stack.Navigator>
  );
}

function secondScreenStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="SecondPage"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#f4511e', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="SecondPage"
        component={SecondPage}
        options={{
          title: 'Second Page', //Set Header Title
        }}
      />
      <Stack.Screen
        name="ThirdPage"
        component={ThirdPage}
        options={{
          title: 'Third Page', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#5359D1',
          itemStyle: { marginVertical: 5 },
        }}
        drawerContent={(props) => <CustomSidebarMenu {...props} />}>
        <Drawer.Screen
          name="FirstPage"
          options={{ drawerLabel: 'First page Option' }}
          component={firstScreenStack}
        />
        <Drawer.Screen
          name="SecondPage"
          options={{ drawerLabel: 'Second page Option' }}
          component={secondScreenStack}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
