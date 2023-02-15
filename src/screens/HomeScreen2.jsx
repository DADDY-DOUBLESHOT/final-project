import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen2 = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    navigation.navigate("BookSearch", { searchTerm });
    setSearchTerm("");
  };

  return (

      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.searchBar}
            onPress={() => navigation.navigate("BookSearch")}
          >
            <Ionicons
              name="search"
              size={24}
              color="black"
              style={styles.searchIcon}
            />
            <Text style={styles.searchText}>Search any book</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.bodyText}>Welcome to my app!</Text>
        <Text> Home from Navigation</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 10,
    width: '90%',
    height: 40,
    paddingLeft: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchText: {
    fontSize: 16,
    color: '#aaa',
  },
  bodyText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 30,
  },
});

export default HomeScreen2;
