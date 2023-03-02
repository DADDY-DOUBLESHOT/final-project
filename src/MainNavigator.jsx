import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import BookSearchScreen from "./screens/BookSearchScreen";
import HomeNavi from "./screens/HomeNavi";
import HomeScreen2 from "./screens/HomeScreen2";
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
      initialRouteName="UploadBook"
      screenOptions={{
        headerShown: false,
        cardOverlayEnabled: true,
        cardStyle: { backgroundColor: "transparent" },
      }}
      detachInactiveScreens={false}
    >
      <BookStack.Screen name="HomeNavi" component={HomeNavi} />
      <BookStack.Screen name="UploadBook" component={UploadBook} />
      <BookStack.Screen name="Home" component={HomeScreen2} />
      <BookStack.Screen name="BookSearch" component={BookSearchScreen} />
    </BookStack.Navigator>
  );
}

export default React.memo(MainNavigator);
