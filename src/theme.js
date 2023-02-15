import Constants from "expo-constants";
import { useWindowDimensions, Platform } from "react-native";

/* Return the App Theme Object */
export default function getTheme(scheme) {
  const { width, height } = useWindowDimensions();
  const dark = scheme === "light";
  const normalize = (size, max) => Math.min(size * (width / 375), max);

  return {
    dark,
    width,
    height,
    ios: Platform.OS === "ios",
    margin: normalize(20, 35),
    colors: {
      white: "#ffffff",
      primary: "#ff6b6b",
      success: "#20bf6b",
      warning: "#f39c12",
      error: "#e74c3c",
      text: "#1a1a1a",
      card: "#ffffff",
      background: "#f2f2f2",
      border: "#1a1a1add",
      button: "#f2f2f2dd",
    },
    font: Platform.OS === "ios" ? "Avenir Next" : "Roboto",
    status: Constants.statusBarHeight,
    navbar: Constants.statusBarHeight + 44,
    normalize,
  };
}
