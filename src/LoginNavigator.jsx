import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import BookListScreen from "./screens/BookListScreen";
import GenresScreen from "./screens/GenresScreen";
import LoginScreen from "./screens/LoginScreen";
import UserMenu from "./screens/HomeNavi";


// Root Stack of App
function LoginNavigator() {
  const LoginStack = createSharedElementStackNavigator();

  const fadeScreen = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  const bookTransition = {
    animation: "spring",
    config: {
      mass: 3,
      damping: 300,
      stiffness: 1000,
      overshootClamping: false,
      restDisplacementThreshold: 10,
      restSpeedThreshold: 10,
    },
  };

  const searchTranstion = {
    animation: "spring",
    config: {
      mass: 3,
      damping: 300,
      stiffness: 1000,
      overshootClamping: false,
      restDisplacementThreshold: 10,
      restSpeedThreshold: 10,
    },
  };

  return (
    <LoginStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        cardOverlayEnabled: true,
      }}
      detachInactiveScreens={false}
    >
      <LoginStack.Screen name="Login" component={LoginScreen} />
      <LoginStack.Screen name="UploadBook" component={UploadBook} />
      {/* <LoginStack.Screen name="UserMenu" component={UserMenu} /> */}
      <LoginStack.Screen name="Genre" component={GenresScreen} />
    </LoginStack.Navigator>
  );
}

export default React.memo(LoginNavigator);
