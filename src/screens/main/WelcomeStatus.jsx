import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, IconButton } from "react-native-paper";
import { useSelector } from "react-redux";

const WelcomeStatus = ({ navigation }) => {
  const user = useSelector((state) => state.USER.user);
  const [welcome, setWelcome] = useState({
    msg: "",
    user: null,
  });

  const loadMsg = () => {
    let time = new Date().getHours();
    if (time >= 5 && time <= 12) {
      setWelcome({
        msg: "Good Morning",
      });
    } else if (time >= 12 && time < 18) {
      setWelcome({
        msg: "Good Afternoon",
      });
    } else {
      setWelcome({
        msg: "Good Evening",
      });
    }
  };
  useEffect(() => {
    loadMsg();
  }, []);
  return (
    <View
      style={[styles.con, { justifyContent: "space-between", marginTop: 3 }]}
    >
      <View style={styles.con}>
        <Avatar.Image
          size={50}
          style={{ marginLeft: 15, marginVertical: 5, marginRight: 15 }}
          source={{ uri: user?.avatar?.url }}
        />
        <View
          style={{
            flexDirection: "column",
            margin: 5,
            justifyContent: "center",
          }}
        >
          <Text style={styles.wish}>{welcome.msg}</Text>
          <Text style={styles.name}>{user && user.name}</Text>
        </View>
      </View>
      <IconButton
        style={{ margin: 0, padding: 0 }}
        icon={"menu"}
        size={30}
        onPress={() => navigation.toggleDrawer()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  con: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  wish: {
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
  },
  name: {
    color: "black",
    fontSize: 18,
  },
});

export default WelcomeStatus;
