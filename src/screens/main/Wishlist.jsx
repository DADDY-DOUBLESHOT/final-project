import React, { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { IconButton } from "react-native-paper";
import { useSelector } from "react-redux";
import GridForWishList from "../../components/GridForWishList";

const { width: screenWidth } = Dimensions.get("window");

const Wishlist = ({ navigation }) => {
  const wishlistBooks = useSelector((state) => state.BOOKS.wishlist);

  const handleGridnavigation=(id)=>{
    navigation.navigate("bookdetail", {id:id})
  }


  return (
    <View style={styles.con}>
      <View style={styles.header}>
        <IconButton
          icon={"arrow-left"}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={{ fontSize: 18, fontWeight: "500" }}>Wishlist Books</Text>
        <IconButton
          size={25}
          icon={"magnify"}
          onPress={() => navigation.navigate("search")}
        />
      </View>
      <ScrollView horizontal style={styles.content}>
        <GridForWishList items={wishlistBooks} handleGridnavigation={handleGridnavigation}/>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Wishlist;
