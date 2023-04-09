import axios from "axios";
import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableNativeFeedback,
} from "react-native";
import { Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { ForgotSchema } from "../../validations/loginValidations";
import { BASE_URL } from "@env";
import { loaderStart, loaderStop } from "../../store/actions/loaderAction";

const ForgotScreen = ({ navigation }) => {
  const initialValue = {
    email: "",
  };
  const [emailError, setEmailError] = useState({
    show: null,
    bad: null,
    msg: null,
  });

  useEffect(() => {
    setEmailError({
      show: false,
      bad: false,
      msg: "",
    });
  }, []);
  const dispatch = useDispatch();

  const loader = useSelector((state) => state.LOADER);
  const checkEmail = async (email) => {
    try {
      var data = JSON.stringify({
        email: email,
      });

      var config = {
        method: "post",
        url: `${BASE_URL}/email-check`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      await axios(config)
        .then(function (response) {
          setEmailError({
            show: true,
            bad: false,
            msg: response.data.message,
          });
          return response.data.exists;
        })
        .catch(function (error) {
          console.log("email error", error);
          dispatch(loaderStop());

          return false;
        });
    } catch (error) {
      return false;
    }
  };

  const sendResetLink = async (email) => {
    try {
      var data = JSON.stringify({
        email: email,
      });

      var config = {
        method: "post",
        url: `${BASE_URL}/password/forgot`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      await axios(config)
        .then(function (response) {
          setEmailError({
            show: true,
            bad: response.data.success === "true",
            msg: response.data.message,
          });
          dispatch(loaderStop());
          setTimeout(() => {
            navigation.navigate("otp", { email: email });
          }, 2000);
        })
        .catch(function (error) {
          console.log("sending email error", error);
          setEmailError({
            show: true,
            bad: true,
            msg: error.message,
          });
          dispatch(loaderStop());
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePress = (values) => {
    dispatch(loaderStart());
    // if (checkEmail(values.email)) {
    //   console.log("workign now", emailError);
    sendResetLink(values.email);
    // }
  };
  return (
    <View style={style.container}>
      <View style={{ flex: 0.1 }}></View>
      <View style={{ flex: 1 }}>
        <Text style={style.header}>Reset Password</Text>
        <Text style={style.desc}>
          Enter the email associated with your account and we'll send an email
          with instructions to reset your password
        </Text>
        <Formik
          initialValues={initialValue}
          validationSchema={ForgotSchema}
          onSubmit={(values) => handlePress(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <>
              <TextInput
                mode="outlined"
                label={"Email"}
                placeholder="Enter you email"
                activeOutlineColor="#C147E9"
                placeholderTextColor={"rgba(0,0,0,0.4)"}
                outlineColor="rgba(0,0,0,0.2)"
                style={style.input}
                error={errors.email}
                onChangeText={handleChange("email")}
              />
              {errors.email && (
                <Text
                  style={{ color: "red", fontSize: 12, marginHorizontal: 10 }}
                >
                  {errors.email}
                </Text>
              )}
              {emailError.show && (
                <Text
                  style={{
                    color: emailError.bad ? "red" : "green",
                    fontSize: 12,
                    marginHorizontal: 10,
                  }}
                >
                  {emailError.msg}
                </Text>
              )}
              <TouchableNativeFeedback onPress={handleSubmit}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    backgroundColor: "#810CA8",

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
                    {loader && loader.active ? (
                      <ActivityIndicator
                        size="small"
                        color="white"
                        style={{ paddingLeft: 12 }}
                      />
                    ) : (
                      "Send Otp"
                    )}
                  </Text>
                </View>
              </TouchableNativeFeedback>
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
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 20,
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
  },
  desc: {
    fontSize: 15,
    marginVertical: 10,
    color: "rgba(0,0,0,0.5)",
  },
  input: {
    marginVertical: 15,
  },
  forgot_btn: {
    width: "100%",
  },
});

export default ForgotScreen;
