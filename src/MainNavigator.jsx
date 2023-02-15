import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import BookListScreen from "./screens/BookListScreen";
import UserMenu from "./screens/UserMenu";
import UploadBook from "./screens/UploadBook";


// Root Stack of App
function MainNavigator() {
  const BookStack = createSharedElementStackNavigator();

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
    <BookStack.Navigator
      initialRouteName="BookList"
      screenOptions={{
        headerShown: false,
        cardOverlayEnabled: true,
        cardStyle: { backgroundColor: "transparent" },
      }}
      detachInactiveScreens={false}
    >
      {/* <BookStack.Screen name="BookList" component={BookListScreen} /> */}
      {/* <BookStack.Screen name="UserMenu" component={UserMenu} /> */}
      <BookStack.Screen name="Upload" component={UploadBook} /> 
    </BookStack.Navigator>
  );
}

export default React.memo(MainNavigator);
