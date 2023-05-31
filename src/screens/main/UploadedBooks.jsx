import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "@env";
import { useIsFocused } from "@react-navigation/native";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const UploadedBooks = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchuploadedBooks();
  }, [isFocused]);

  const fetchuploadedBooks = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}uploaded-books`,
      headers: {},
    };

    try {
      await axios(config)
        .then(function (response) {
          console.log("response is", response.data.books);
          console.log("response id is", response.data.books[0].title);
          setBooks(response.data.books);
          // console.log("books are:",response.data.books)
        })
        .catch(function (error) {
          console.log("Unable to show uploaded Book", error);
        });
    } catch (error) {
      console.log("Unable to show uploaded Book1", error);
    }
  };

  handlePress = (navigation, id) => {
    navigation.navigate("bookdetail", { id: id });
  };

  return (
    <>
      <ScrollView>
        {books.map((item, id) => {
          return (
            item.coverImg && (
              <View key={id}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("bookdetail", { id: item._id });
                  }}
                >
                  <View style={styles.usercontainer}>
                    <Image source={{ uri: item.coverImg }} style={styles.profileImg} />
                    <View style={{ display: "flex", flexDirection: "column", borderColor: "black", width: screenWidth - 130 }}>
                      <Text style={{ marginStart: 10, marginTop: 10, color: "black" }}>{item.title}</Text>
                      <Text style={{ height: 40, marginStart: 10, paddingVertical: 5, color: "black" }}>{item.author}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )
          );
        })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  usercontainer: {
    display: "flex",
    flexDirection: "row",
    // borderColor:'black',
    // borderWidth:1,0
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    color: "black",
  },
  profileImg: {
    width: 100,
    height: 100,
    alignItems: "center",
    marginStart: 12,
    borderColor: "black",
    marginVertical: 10,
  },

  con: {
    flex: 1,
  },
  header: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "rgba(0,0,0,0.2)",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  content: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 10,
    width: screenWidth,
  },
  container: {
    flexDirection: "row",
    marginVertical: 10,
  },
  image: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
});

export default UploadedBooks;
