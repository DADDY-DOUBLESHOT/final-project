import { Formik } from "formik";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import login_img from "../../../assets/login_bg.png";
import { loaderStart } from "../../store/actions/loaderAction";
import { userLogin } from "../../store/actions/userAction";
import { LoginSchema } from "../../validations/loginValidations";

const LoginScreen = ({ navigation }) => {
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.LOADER);
  const initialValue = {
    email: "",
    password: "",
  };

  const handleLogin = async (values) => {
    dispatch(loaderStart());
    let res = await dispatch(await userLogin(values.email, values.password));
    if (res) navigation.replace("homenavi");
  };
  return (
    <View style={style.container}>
      <View style={{ flex: 0.2 }}></View>
      <View style={style.header}>
        <Image style={style.image} source={login_img} />
        <Text style={style.title}>Let's sign you in </Text>
      </View>
      <View style={style.inputContainer}>
        <Formik
          initialValues={initialValue}
          validationSchema={LoginSchema}
          onSubmit={(values) => handleLogin(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <TextInput
                mode="outlined"
                label={"Email"}
                placeholder="Enter you email"
                activeOutlineColor="#6867AC"
                placeholderTextColor={"rgba(0,0,0,0.4)"}
                outlineColor="rgba(0,0,0,0.2)"
                style={style.input}
                error={errors.email}
                onChangeText={handleChange("email")}
              />
              {errors.email && (
                <Text
                  style={{ color: "red", fontSize: 12, marginHorizontal: 20 }}
                >
                  {errors.email}
                </Text>
              )}
              <TextInput
                n
                mode="outlined"
                label={"Password"}
                placeholder="Enter your password"
                placeholderTextColor={"rgba(0,0,0,0.4)"}
                secureTextEntry={!showPass}
                activeOutlineColor="#6867AC"
                outlineColor="rgba(0,0,0,0.2)"
                style={style.input}
                right={
                  <TextInput.Icon
                    onPress={() => {
                      setShowPass(!showPass);
                    }}
                    icon={!showPass ? "eye" : "eye-off"}
                  />
                }
                error={errors.password}
                onChangeText={handleChange("password")}
              />
              {errors.password && (
                <Text
                  style={{ color: "red", fontSize: 12, marginHorizontal: 20 }}
                >
                  {errors.password}
                </Text>
              )}
              <Text
                onPress={() => {
                  navigation.navigate("forgot");
                }}
                style={[
                  style.input,
                  {
                    textAlign: "right",
                    color: "#6867AC",
                    fontWeight: "800",
                    fontSize: 15,
                  },
                ]}
              >
                Forgot Password ?
              </Text>
              <TouchableNativeFeedback onPress={handleSubmit}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    backgroundColor: "#363062",
                    marginHorizontal: 20,
                    marginVertical: 15,
                    borderRadius: 15,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      paddingVertical: 20,
                      fontWeight: "bold",
                      fontFamily: "Roboto",
                      fontSize: 18,
                    }}
                  >
                    Login
                  </Text>
                  {loader && loader.active && (
                    <ActivityIndicator
                      size="small"
                      color="white"
                      style={{ paddingLeft: 12 }}
                    />
                  )}
                </View>
              </TouchableNativeFeedback>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "#4D4C7D",
                    fontFamily: "Roboto",
                    fontSize: 15,
                  }}
                >
                  Create an Account?
                </Text>
                <Text
                  style={{
                    color: "#4D4C7D",
                    fontWeight: "bold",
                    marginLeft: 10,
                    fontSize: 15,
                  }}
                  onPress={() => {
                    navigation.replace("register");
                  }}
                >
                  Register
                </Text>
              </View>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    flex: 2,
    padding: 10,
  },
  title: {
    flex: 0.5,
    fontFamily: "Roboto",
    fontWeight: "bold",
    paddingVertical: 24,
    fontSize: 25,
  },
  input: {
    marginVertical: 10,
    marginHorizontal: 15,
  },
  inputContainer: {
    flex: 1,
  },
});

export default LoginScreen;
