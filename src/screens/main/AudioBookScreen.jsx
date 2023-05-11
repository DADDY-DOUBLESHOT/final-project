import React, { useEffect, useState } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import AWS from "aws-sdk/dist/aws-sdk-react-native";
import axios from "axios";
import { Platform } from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { BASE_URL } from "@env";
import { IconButton } from "react-native-paper";
AWS.config.update({
  region: "us-east-1",
  credentials: new AWS.Credentials({
    accessKeyId: "AKIAUWWAG4LTQIOF5XZV",
    secretAccessKey: "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",
  }),
});
const polly = new AWS.Polly();

const AudioBookScreen = () => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [soundObjects, setSoundObjects] = useState([]);
  const [loader, setLoader] = useState(true);
  const soundObject = new Audio.Sound();

  // async function handlePress() {
  //   await fetchPdfText("https://www.africau.edu/images/default/sample.pdf");
  // }

  const fetchPdfText = async (url) => {
    let data = JSON.stringify({
      pdf: url,
    });

    var config = {
      method: "get",
      url: `http://192.168.0.165:5000/api/v1/pdf-text`,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };

    try {
      axios
        .request(config)
        .then((response) => {
          console.log("got it ", JSON.stringify(response.data.data));
          synthesizeSpeech(JSON.stringify(response.data.data));
        })
        .catch((error) => {
          synthesizeSpeech("Sorry !!! there was some trouble with the server");
          console.log(error);
        });
    } catch (error) {
      console.log("error in fetching pdf text ", error);
    }
  };

  async function synthesizeSpeech(text) {
    const polly = new AWS.Polly();

    const textArray = text.split("\n").filter((line) => line.trim() !== "");
    const maxTextLength = 3000; // Maximum number of characters per input
    const textChunks = [];
    let chunkStart = 0;

    // Split text into chunks of maximum length
    while (chunkStart < textArray.length) {
      let chunkEnd = chunkStart;
      let chunkLength = 0;

      while (chunkEnd < textArray.length && chunkLength + textArray[chunkEnd].length < maxTextLength) {
        chunkLength += textArray[chunkEnd].length;
        chunkEnd++;
      }

      textChunks.push(textArray.slice(chunkStart, chunkEnd).join("\n"));
      chunkStart = chunkEnd;
    }

    // Synthesize audio for each chunk
    const audioStreams = await Promise.all(
      textChunks.map((chunk) =>
        polly
          .synthesizeSpeech({
            OutputFormat: "mp3",
            Text: chunk,
            VoiceId: "Joanna",
            Engine: "neural",
          })
          .promise()
      )
    );

    // Play the audio for each chunk

    for (const audioStream of audioStreams) {
      if (audioStream.AudioStream) {
        try {
          const fileUri = `${FileSystem.documentDirectory}/audio.mp3`;
          const base64Data = audioStream.AudioStream.toString("base64");
          await FileSystem.writeAsStringAsync(fileUri, base64Data, {
            encoding: FileSystem.EncodingType.Base64,
          });

          await soundObject.loadAsync({ uri: fileUri });
          soundObjects.push(soundObject);
        } catch (error) {
          console.warn("Error playing audio:", error);
        }
      } else {
        console.warn("No audio data to play");
      }
    }
    setLoader(false);
    setIsPlaying(true);
    // Play the audio sequentially
    for (const soundObject of soundObjects) {
      await soundObject.playAsync();
    }
  }

  useEffect(() => {
    fetchPdfText("https://www.africau.edu/images/default/sample.pdf");
  }, []);

  async function handlePause() {
    await soundObject.pauseAsync();
    setIsPlaying(!isPlaying);
  }
  async function handlePlay() {
    await soundObject.playAsync();
    setIsPlaying(!isPlaying);
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {!loader ? (
        isPlaying ? (
          <IconButton icon={"pause-circle"} size={50} onPress={handlePause} />
        ) : (
          <IconButton icon={"play-circle"} size={50} onPress={handlePlay} />
        )
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

export default AudioBookScreen;
