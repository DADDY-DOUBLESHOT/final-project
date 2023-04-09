import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  ImageBackground,
  TouchableNativeFeedback,
  Button,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import romance from "../../../assets/romance.png";
import adult from "../../../assets/adult.png";
import bio from "../../../assets/bio.png";
import blobs from "../../../assets/blobs.png";
import comics from "../../../assets/comics.png";
import fantasy from "../../../assets/fantasy.png";
import history from "../../../assets/history.png";
import horror from "../../../assets/horror.png";
import mystery from "../../../assets/mystery.png";
import science from "../../../assets/science.png";
import short from "../../../assets/short.png";
import study from "../../../assets/study.png";
import young from "../../../assets/young.png";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../store/actions/userAction";
import { loaderStart } from "../../store/actions/loaderAction";

const screenWidth = Dimensions.get("screen").width;
const cardWidth = (screenWidth - 60) / 2;

const data = [
  { id: 1, title: "Romance", img: romance },
  { id: 2, title: "Science Fiction", img: science },
  { id: 3, title: "Young Adult", img: young },
  { id: 4, title: "Adult Fiction", img: adult },
  { id: 5, title: "Mystery", img: mystery },
  { id: 6, title: "Fantasy", img: fantasy },
  { id: 7, title: "Short Stories", img: short },
  { id: 8, title: "Biography", img: bio },
  { id: 9, title: "Education", img: study },
  { id: 10, title: "Comics", img: comics },
  { id: 11, title: "Historical", img: history },
  { id: 12, title: "Horror", img: horror },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flex: 0.2,
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#554994",
    borderRadius: 10,
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  card: {
    width: cardWidth,
    height: cardWidth / 2,
    margin: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  selectedCard: {
    opacity: 0.5,
  },
  selectedCardBG: {
    backgroundColor: "#E5B8F4",
  },
  selectedCardText: {
    color: "white",
  },
  checkIcon: {
    color: "white",
    fontSize: 32,
  },
  nextButton: {
    height: 50,
    backgroundColor: "#C147E9",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

const GenresScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);
  const loader = useSelector((state) => state.LOADER);

  const handleCardPress = (id) => {
    const index = selected.indexOf(id);
    if (index > -1) {
      setSelected([...selected.slice(0, index), ...selected.slice(index + 1)]);
    } else {
      setSelected([...selected, id]);
    }
  };
  const handleNext = async () => {
    dispatch(loaderStart());
    let res = await dispatch(await userRegister(selected));
    console.log("result from dispatch", res);
    if (res) navigation.replace("homenavi");
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Choose your interests</Text>
      </View>
      <ScrollView
        horizontal
        style={{ flex: 1 }}
        contentContainerStyle={styles.body}
      >
        <FlatList
          data={data}
          numColumns={2}
          contentContainerStyle={{ borderRadius: 15, padding: 5 }}
          renderItem={({ item }) => (
            <TouchableNativeFeedback onPress={() => handleCardPress(item.id)}>
              <View
                style={[
                  styles.card,
                  selected.includes(item.id) && styles.selectedCardBG,
                ]}
              >
                <ImageBackground
                  style={[
                    {
                      width: "100%",
                      height: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                    },
                    selected.includes(item.id) && styles.selectedCard,
                  ]}
                  resizeMode="cover"
                  blurRadius={5}
                  source={item.img}
                >
                  {selected.includes(item.id) ? (
                    <Ionicons
                      name="checkmark-done-outline"
                      style={styles.checkIcon}
                    />
                  ) : (
                    <Text
                      style={[
                        styles.cardText,
                        selected === item.id && styles.selectedCardText,
                      ]}
                    >
                      {item.title}
                    </Text>
                  )}
                </ImageBackground>
              </View>
            </TouchableNativeFeedback>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
      {selected.length > 0 && (
        <TouchableNativeFeedback
          onPress={() => {
            handleNext();
          }}
        >
          <View
            style={{
              width: "100%",
              padding: 5,
              paddingVertical: 15,
              backgroundColor: "#6867AC",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>NEXT</Text>
            {loader && loader.active && (
              <ActivityIndicator
                size="small"
                color="white"
                style={{ paddingLeft: 12 }}
              />
            )}
          </View>
        </TouchableNativeFeedback>
      )}
    </View>
  );
};

export default GenresScreen;
