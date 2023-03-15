import React from "react";
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { theme } from "../theme";

export default function Background({ children }) {
  return (
    <ScrollView contentContainerStyle={styles.main} horizontal={false}>
      {/* <ImageBackground
        source={require("../../assets/blobs.png")}
        resizeMode="cover"
        style={styles.background}
      > */}
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
      {/* </ImageBackground> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
