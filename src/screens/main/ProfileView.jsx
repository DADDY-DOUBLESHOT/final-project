import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Animated,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import dummy_profile from "../../images/profile.png";
import { useSelector, useDispatch } from "react-redux";
import { IconButton, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { BASE_URL } from "@env";
import { loaderStart, loaderStop } from "../../store/actions/loaderAction";

const ProfileView = (props) => {
  const [edit, setEdit] = useState(false);
  const [editPic, setEditPic] = useState(false);
  const [userChange, setUserChange] = useState({
    name: "",
    profile: null,
  });
  const user = useSelector((state) => state.USER.user);
  const loader = useSelector((state) => state.LOADER);
  const dispatch = useDispatch();
  const editRef = useRef(new Animated.Value(0)).current;
  const profileeditRef = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    dispatch(loaderStop());
    setUserChange({
      name: user.name,
      profile: user?.profile ? user.profile : "../../images/profile.png",
    });
  }, []);

  const animateEdit = () => {
    Animated.timing(editRef, {
      toValue: edit ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setEdit(!edit);
    });
  };
  const animateProfileEdit = () => {
    Animated.timing(profileeditRef, {
      toValue: editPic ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setEditPic(!editPic);
    });
  };

  const updateUsername = async () => {
    // dispatch(loaderStart());
    var data = JSON.stringify({
      name: userChange.name,
    });

    var config = {
      method: "put",
      url: `${BASE_URL}/admin/me/update`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      await axios(config)
        .then(function (response) {
          // console.log(JSON.stringify(response.data));
          ToastAndroid.show("Username updated", ToastAndroid.SHORT);
        })
        .catch(function (error) {
          // console.log(error);
          setUserChange({ ...userChange, name: user.name });
          ToastAndroid.show("Error updating username", ToastAndroid.SHORT);
        });
    } catch (error) {
      setUserChange({ ...userChange, name: user.name });
      ToastAndroid.show("Error updating username", ToastAndroid.SHORT);
    }
    animateEdit();
  };
  const updateProfilePic = async () => {
    var data = JSON.stringify({
      profile: userChange.profile,
    });

    var config = {
      method: "put",
      url: `${BASE_URL}/admin/me/update`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    try {
      return await axios(config)
        .then(function (response) {
          // console.log(JSON.stringify(response.data));
          ToastAndroid.show("Profile pic updated", ToastAndroid.SHORT);
        })
        .catch(function (error) {
          // console.log(error);
          ToastAndroid.show("Error updating profile pic", ToastAndroid.SHORT);
        });
    } catch (error) {
      ToastAndroid.show("Error updating profile pic", ToastAndroid.SHORT);
    }
  };

  const pickImage = async () => {
    dispatch(loaderStart());
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    // console.log("image res", result);

    if (!result.canceled) {
      setUserChange({ ...userChange, profile: result.assets[0].uri });
      await updateProfilePic();
      animateProfileEdit();
    }
    dispatch(loaderStop());
  };

  return (
    <DrawerContentScrollView style={styles.container}>
      <View style={styles.profile_container}>
        <Animated.View style={styles.profileContainer}>
          {loader && loader.active ? (
            <ActivityIndicator
              style={{ width: 150, height: 150 }}
              size="large"
              color="#810CA8"
            />
          ) : (
            <Image
              resizeMode="contain"
              source={
                user.profile
                  ? { uri: userChange.profile }
                  : require("../../images/profile.png")
              }
              style={styles.profile}
            />
          )}
          {editPic ? (
            <Animated.View
              style={{
                flex: 1,
                flexDirection: "row",
                padding: 10,
                opacity: profileeditRef.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              }}
            >
              <Button
                onPress={() => {
                  pickImage();
                }}
                mode="outlined"
                style={{ marginRight: 10 }}
              >
                Local
              </Button>
              <Button mode="outlined">Avatar</Button>
            </Animated.View>
          ) : (
            <IconButton
              size={25}
              style={{
                position: "absolute",
                bottom: 25,
                right: 5,
                padding: 0,
                margin: 0,
                opacity: profileeditRef.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0],
                }),
              }}
              icon={"camera"}
              iconColor="#554994"
              containerColor="#rgba(255,255,255,0.9)"
              onPress={() => {
                animateProfileEdit();
              }}
            />
          )}
        </Animated.View>
        {edit ? (
          <Animated.View
            style={[
              {
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              },
              {
                opacity: editRef.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
            ]}
          >
            <TextInput
              style={styles.edit_name}
              value={userChange.name}
              onChangeText={(text) =>
                setUserChange({ ...userChange, name: text })
              }
            />
            <Button
              onPress={() => {
                updateUsername();
              }}
              mode="contained"
              buttonColor="green"
            >
              Save
            </Button>
          </Animated.View>
        ) : (
          <Animated.View
            style={[
              {
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              },
              {
                opacity: editRef.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0],
                }),
              },
            ]}
          >
            <Text style={styles.name}>{user.name}</Text>
            <IconButton
              size={20}
              style={{ padding: 0, margin: 0 }}
              icon={"pencil"}
              onPress={() => {
                animateEdit();
              }}
            />
          </Animated.View>
        )}
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  profile_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  profileContainer: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  profile: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#554994",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  edit_name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#554994",
    textAlign: "center",
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.5)",
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5,
  },
});
export default ProfileView;
