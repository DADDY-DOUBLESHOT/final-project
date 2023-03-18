import React, { useState } from "react";
import { View, Text } from "react-native";
import { WebView } from "react-native-webview";

const PdfViewer = ({ url }) => {
  return (
    <WebView
      source={{ uri: url }}
      style={{ flex: 1 }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      startInLoadingState={true}
    />
  );
};

const AudioBookScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <PdfViewer url="https://example.com/sample.pdf" />
    </View>
  );
};

export default AudioBookScreen;
