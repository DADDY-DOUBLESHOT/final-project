import React from "react";
import { StyleSheet } from "react-native";
import { Dimensions, FlatList, Image, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import Stars from "react-native-stars";
import { IconButton } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const { width: screenWidth } = Dimensions.get("window");

const colorSelector = (rating) => {
  if (rating <= 1) {
    return "red";
  } else if (rating <= 4) {
    return "#ffcc00";
  } else {
    return "#00cc00";
  }
};

const BookView = ({ handleGridnavigation , item }) => {
  return (
    <TouchableOpacity onPress={() => handleGridnavigation(item._id)} >
    <View style={card_style.item}>
      <Image style={card_style.image} source={{ uri: item.coverImg }} />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            margin: 10,
          }}
        >
          <Text>{item.title}</Text>
          <Text style={{ marginVertical: 5 }}>{item.author}</Text>
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <Text
              style={{
                padding: 5,
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.1)",
                borderRadius: 7,
              }}
            >
              Publisher:
              {item.publisher.length > 8
                ? item.publisher.substring(0, 5) + "..."
                : item.publisher}
            </Text>
            <Text
              style={{
                padding: 5,
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.1)",
                borderRadius: 7,
                marginLeft: 7,
              }}
            >
              Pages:{item.pages}
            </Text>
          </View>
        </View>
        <IconButton
          style={{ flex: 0.2 }}
          icon={"bookmark-outline"}
          iconColor="#C147E9"
        />
      </View>
    </View>
    </TouchableOpacity>
  );
};

const GridForSearch = ({ items, handleGridnavigation }) => {
  return (
    <>
      {items && items.length > 0 ? (
        <FlatList
          initialNumToRender={10}
          horizontal={false}
          data={items}
          renderItem={({ item }) => <BookView item={item} handleGridnavigation={handleGridnavigation}/>}
          keyExtractor={(item) => item._id}
          style={{ flex: 1 }}
          contentContainerStyle={{
            width: screenWidth - 15,
          }}
        />
      ) : (
        <Text>Sorry no books founds with this name</Text>
      )}
    </>
  );
};

const card_style = StyleSheet.create({
  item: {
    width: screenWidth - 20,
    height: screenWidth / 2.5,
    display: "flex",
    flexDirection: "row",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.15)",
    overflow: "hidden",
    marginBottom: 10,
  },
  image: {
    width: screenWidth / 3.5,
    height: screenWidth / 2.5,
    resizeMode: "cover",
  },
  header_container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    margin: 10,
  },
  title: {
    fontSize: 16,
    padding: 3,
  },
  author: {
    fontSize: 13,
    paddingHorizontal: 5,
    color: "gray",
    marginBottom: 2,
  },
  rating: {
    width: "100%",
  },
});

export default GridForSearch;
