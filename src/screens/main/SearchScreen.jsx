import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, Image, RefreshControl, ScrollView, ToastAndroid, TouchableNativeFeedback } from "react-native";
import { Dimensions, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { Chip, IconButton } from "react-native-paper";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "@env";
import GridForSearch from "../../components/GridForSearch";

const { width: screenWidth } = Dimensions.get("window");

const SearchView = ({ item, handlePills }) => {
  return (
    <TouchableNativeFeedback onPress={() => handlePills(item.title)}>
      <View
        style={{
          width: screenWidth / 2.3,
          marginHorizontal: 10,
          marginVertical: 10,
          flexDirection: "row",
        }}
      >
        <Image
          style={{
            width: 60,
            height: 60,
            borderRadius: 15,
            resizeMode: "cover",
          }}
          source={{ uri: item.coverImg }}
        />
        <View
          style={{
            padding: 2,
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Text style={{ flex: 1, fontSize: 14, textAlign: "left" }}>{item.title}</Text>
          {/* <Text style={{ flex: 1, fontSize: 10 }}>
          {item.author.length > 10
            ? item.author.substring(0, 10) + "..."
            : item.author}
        </Text> */}
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};
const AuthorView = ({ item, handleAuthorClick }) => {
  return (
    <TouchableNativeFeedback onPress={() => handleAuthorClick(item._id)}>
      <View
        style={[
          {
            width: 90,
            alignItems: "center",
            marginHorizontal: 2,
          },
        ]}
      >
        <Image
          style={{
            width: 80,
            height: 80,
            resizeMode: "cover",
            borderRadius: screenWidth / 2,
            borderWidth: 5,
            borderColor: "white",
          }}
          source={{ uri: item.profile }}
        />
        <Text style={[{ textAlign: "left", fontSize: 14 }]}>{item.title}</Text>
        <Text style={[{ textAlign: "center", fontSize: 12 }]}>{item.name.length > 20 ? item.name.substring(0, 20) + "..." : item.name}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const SearchScreen = ({ navigation }) => {
  const [searchHistory, setSearchHistory] = useState(null);
  const trendingBooks = useSelector((state) => state.BOOKS.trendingBooks);
  const [searchBook, setSearch] = useState({
    show: false,
    key: "",
    loader: false,
    result: [],
  });
  const dummyAuthors = [
    {
      _id: "6457d3b7ecbd4bd7bcd55121",
      name: "Vikarm Seth",
      profile: "https://i.pravatar.cc/150?img=3",
    },
    {
      _id: "6457d3b7ecbd4bd7bcd55122",
      name: "Anita Desai",
      profile: "https://i.pravatar.cc/150?img=3",
    },
    {
      _id: "6457d3b7ecbd4bd7bcd55123",
      name: "Chetan Bhagat",
      profile: "https://i.pravatar.cc/150?img=3",
    },
    {
      _id: "6457d3b7ecbd4bd7bcd55124",
      name: "Jhumpa Lahiri",
      profile: "https://i.pravatar.cc/150?img=3",
    },
    {
      _id: "6457d3b7ecbd4bd7bcd55125",
      name: "R.K Narayan",
      profile: "https://i.pravatar.cc/150?img=3",
    },
    {
      _id: "6457d3b7ecbd4bd7bcd55126",
      name: "Rabindranath Tagore",
      profile: "https://i.pravatar.cc/150?img=3",
    },
  ];

  const handleGridnavigation = (id) => {
    navigation.navigate("bookdetail", { id: id });
  };

  const handleDelete = (id) => {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${BASE_URL}user/search/${id}`,
    };

    axios
      .request(config)
      .then((response) => {
        console.log("deleted item");
        getHistory();
      })
      .catch((error) => {
        console.log("error in deleting item");
        getHistory();
      });
  };
  const handleClear = (id) => {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${BASE_URL}user/search`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log("list cleared");
        getHistory();
        ToastAndroid.show("Recent history cleared", ToastAndroid.SHORT);
      })
      .catch((error) => {
        console.log("error in clearing list");
      });
  };
  const handleSearch = async (key) => {
    // console.log("key in search", key);
    if (key) {
      setSearch({
        show: true,
        key: key,
      });
    } else {
      setSearch({
        show: false,
        key: "",
      });
    }
  };
  const getMatches = (key) => {
    setSearch({ show: true, key: key, loader: true });
    // console.log("data key", key);
    let data = JSON.stringify({
      query: key ? key : searchBook.key,
    });

    let config = {
      method: "patch",
      url: `${BASE_URL}user/search`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setSearch({
          show: true,
          key: key,
          result: response.data.seachedResult,
          loader: false,
        });
      })
      .catch((error) => {
        console.log("error in search", error);
        ToastAndroid.show("Error in fetching result", ToastAndroid.SHORT);
        // setSearch({ ...searchBook, loader: false });
      });
  };
  const getHistory = () => {
    let config = {
      method: "get",
      url: `${BASE_URL}user/search`,
    };

    axios
      .request(config)
      .then((response) => {
        setSearchHistory(response.data.searchHistory);
        setRefreshing(false);
      })
      .catch((error) => {
        console.log(error);
        setRefreshing(false);
      });
  };
  const handlePills = async (key) => {
    // await handleSearch(key);
    getMatches(key);
  };

  const handleAuthorClick = (key) => {
    navigation.navigate("author", { id: key });
  };
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getHistory();
  }, []);

  useEffect(() => {
    getHistory();
  }, []);
  return (
    <View style={styles.con}>
      <View
        style={{
          marginTop: 20,
          marginHorizontal: 10,
          flexDirection: "row",
          alignItems: "center",
          borderColor: "rgba(0,0,0,0.2)",
          borderWidth: 1,
          borderRadius: 15,
        }}
      >
        <IconButton icon={"magnify"} />
        <TextInput
          placeholder="Search titles, topics or authors"
          value={searchBook.key}
          onChangeText={(text) => handleSearch(text)}
          onSubmitEditing={() => getMatches(searchBook.key)}
        />
      </View>
      {!searchBook.show ? (
        <ScrollView contentContainerStyle={{ width: screenWidth }} showsVerticalScrollIndicator={false}>
          <View style={{ margin: 10 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>Recent</Text>
              {searchHistory && searchHistory.length > 0 && (
                <Text
                  style={{
                    fontSize: 15,
                    color: "rgba(0,0,0,0.4)",
                    padding: 5,
                  }}
                  onPress={() => {
                    handleClear();
                  }}
                >
                  Clear All
                </Text>
              )}
            </View>
            <ScrollView
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              horizontal
              style={{ width: screenWidth }}
              contentContainerStyle={{
                flexDirection: "column",
                justifyContent: "center",
                width: screenWidth - 10,
              }}
            >
              {searchHistory && (
                <FlatList
                  numColumns={2}
                  data={searchHistory}
                  initialNumToRender={5}
                  horizontal={false}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        backgroundColor: "#D2DAFF",
                        borderRadius: 10,
                        margin: 10,
                        padding: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        onPress={() => {
                          handlePills(item.text);
                        }}
                        style={{
                          paddingHorizontal: 10,
                          paddingVertical: 10,
                          textAlign: "center",
                        }}
                      >
                        {item.text.length > 20 ? item.text.substring(0, 20) + "..." : item.text}
                      </Text>
                      <IconButton
                        style={{
                          margin: 0,
                          paddingVertical: 0,
                        }}
                        icon={"close"}
                        onPress={() => {
                          handleDelete(item._id);
                        }}
                      />
                    </View>
                  )}
                  keyExtractor={(item) => item._id}
                  style={{ width: screenWidth - 30, margin: 5 }}
                  contentContainerStyle={{
                    alignItems: "flex-start",
                    width: screenWidth - 10,
                  }}
                />
              )}
            </ScrollView>
          </View>
          <ScrollView
            horizontal
            style={{ width: screenWidth }}
            contentContainerStyle={{
              width: screenWidth - 10,
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold", margin: 10 }}>Top Book Search</Text>
            {trendingBooks && (
              <FlatList
                numColumns={2}
                data={trendingBooks.slice(0, 8)}
                renderItem={({ item }) => <SearchView item={item} handlePills={handlePills} />}
                keyExtractor={(item) => item._id}
                contentContainerStyle={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            )}
          </ScrollView>
          <ScrollView
            horizontal
            style={{ width: screenWidth }}
            contentContainerStyle={{
              width: screenWidth - 10,
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold", margin: 10 }}>Top Authors</Text>
            {dummyAuthors && (
              <FlatList
                numColumns={4}
                data={dummyAuthors.slice(0, 4)}
                renderItem={({ item }) => <AuthorView item={item} handleAuthorClick={handleAuthorClick} />}
                keyExtractor={(item) => item._id}
                contentContainerStyle={{
                  justifyContent: "center",
                }}
              />
            )}
          </ScrollView>
        </ScrollView>
      ) : (
        <ScrollView
          horizontal
          style={{
            marginTop: 20,
          }}
          contentContainerStyle={{
            width: screenWidth - 10,
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          {searchBook.loader ? (
            <ActivityIndicator size={"small"} color="#554994" />
          ) : (
            searchBook.result && <GridForSearch items={searchBook.result} handleGridnavigation={handleGridnavigation} />
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  con: {
    flex: 1,
    margin: 5,
  },
});

export default SearchScreen;
