import { Formik } from "formik";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import register_img from "../../../assets/regsiter.jpg";
import { loaderStart } from "../../store/actions/loaderAction";
import { userRegisterPre } from "../../store/actions/userAction";
import { SignupSchema } from "../../validations/loginValidations";

const RegisterScreen = ({ navigation }) => {
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.LOADER);
  const initialValue = {
    email: "",
    password: "",
    fullname: "",
  };

  const handleRegister = async (values) => {
    dispatch(loaderStart());
    dispatch(
      await userRegisterPre(values.email, values.password, values.fullname)
    );
    navigation.navigate("genre");
  };
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={style.container}
    >
      {/* <View style={style.container}> */}
      <View style={{ flex: 0.2 }}></View>
      <View style={style.header}>
        <Image
          resizeMode="cover"
          resizeMethod="auto"
          style={style.image}
          source={register_img}
        />
        <Text style={style.title}>Create An Account </Text>
      </View>
      <View style={style.inputContainer}>
        <Formik
          initialValues={initialValue}
          validationSchema={SignupSchema}
          onSubmit={(values) => handleRegister(values)}
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
              <TextInput
                mode="outlined"
                label={"Fullname"}
                placeholder="Enter your fullname"
                placeholderTextColor={"rgba(0,0,0,0.4)"}
                activeOutlineColor="#6867AC"
                outlineColor="rgba(0,0,0,0.2)"
                style={style.input}
                error={errors.fullname}
                onChangeText={handleChange("fullname")}
              />
              {errors.fullname && (
                <Text
                  style={{ color: "red", fontSize: 12, marginHorizontal: 20 }}
                >
                  {errors.fullname}
                </Text>
              )}
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
                    Register
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
                  Already have an account?
                </Text>
                <Text
                  style={{
                    color: "#4D4C7D",
                    fontWeight: "bold",
                    marginLeft: 10,
                    fontSize: 15,
                  }}
                  onPress={() => {
                    navigation.replace("login");
                  }}
                >
                  Login
                </Text>
              </View>
            </>
          )}
        </Formik>
      </View>
      {/* </View> */}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {},
  header: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300,
    flex: 1,
  },
  title: {
    flex: 0.1,
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

export default RegisterScreen;
