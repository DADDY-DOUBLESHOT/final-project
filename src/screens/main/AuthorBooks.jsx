import React, { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { IconButton } from "react-native-paper";
import { useSelector } from "react-redux";
import Grid from "../../components/Grid";

const { width: screenWidth } = Dimensions.get("window");

const AuthorBooks = ({ navigation }) => {
  const popularBooks = useSelector((state) => state.BOOKS.popularBooks);

  const handleGridnavigation = (id) => {
    navigation.navigate("bookdetail", { id: id });
  };

  return (
    <View style={styles.con}>
      <View style={styles.header}>
        <IconButton
          icon={"arrow-left"}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={{ fontSize: 18, fontWeight: "500" }}>{"Author PlaceHolder"}</Text>
        <IconButton size={25} icon={"magnify"} onPress={() => navigation.navigate("search")} />
      </View>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
        }}
        horizontal
        style={styles.content}
      >
        <Grid items={popularBooks} handleGridnavigation={handleGridnavigation} />
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
  },
  content: {
    flex: 1,
  },
});

export default AuthorBooks;
