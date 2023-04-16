import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import PDFReader from "rn-pdf-reader-js";
import WebView from "react-native-webview";
// import Animated, {
//     interpolate, withTiming, runOnJS,
//     useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, useAnimatedScrollHandler,
//   } from 'react-native-reanimated';
import "react-native-gesture-handler";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

// const PdfReader = ({ url: uri }) => <WebView javaScriptEnabled={true} style={{ flex: 1 }} source={{ uri }} />

const ReadBook = ({ route }) => {
  //   console.log("route ", route);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        marginHorizontal: 10,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "500", marginTop: 40 }}>
        Read Book
      </Text>
      <View style={styles.pdfstyle}>
        {/* <PdfReader url="http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf"/> */}
        <PDFReader
          source={{
            uri: "https://api.printnode.com/static/test/pdf/multipage.pdf",

            // uri: route.params.pdf_url,
          }}
          style={styles.pdfstyle}
          withPinchZoom="True"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pdfstyle: {
    flex: 1,
    height: screenHeight - 200,
    marginVertical: 40,
    backgroundColor: "black",
    // marginHorizontal:20,
    width: screenWidth - 50,
  },
});

export default ReadBook;
