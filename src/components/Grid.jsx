import React from "react";
import { Dimensions, FlatList, Image, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { IconButton } from "react-native-paper";

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
    <View
      style={[
        {
          width: screenWidth / 3.3,
          alignItems: "flex-start",
          justifyContent: "center",
          marginVertical: 10,
          marginHorizontal: 4,
        },
      ]}
      
    >
      <Image
        style={{
          width: "100%",
          height: 180,
          resizeMode: "contain",
          borderRadius: 12,
          marginBottom: 5,
        }}
        source={{ uri: item.coverImg }}
      />
      <Text style={[{ textAlign: "left", fontSize: 14 }]}>{item.title}</Text>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text>{Number.parseFloat(item.rating).toFixed(1)}</Text>
        <IconButton
          size={18}
          style={{ padding: 0, margin: 0 }}
          iconColor={colorSelector(Math.round(Number.parseFloat(item.rating)))}
          icon={"star"}
        />
      </View>
    </View>
    </TouchableOpacity>
  );
};

const Grid = ({ items , handleGridnavigation}) => {
  return (
    <FlatList
      numColumns={3}
      refreshing={false}
      initialNumToRender={20}
      horizontal={false}
      data={items}
      renderItem={({ item }) => <BookView item={item} handleGridnavigation={handleGridnavigation}/>}
      keyExtractor={(item) => item._id}
      style={{ flex: 1 }}
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
        width: screenWidth,
      }}
    />
  );
};

export default Grid;
