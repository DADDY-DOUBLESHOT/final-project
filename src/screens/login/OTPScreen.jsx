import axios from "axios";
import { Formik } from "formik";
import React, { useState, useRef } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableNativeFeedback,
  Animated,
  TextInput,
  Image,
} from "react-native";
import { Text, View } from "react-native";
import { TextInput as RTextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { ResetSchema } from "../../validations/loginValidations";
import { BASE_URL } from "@env";
import { loaderStart, loaderStop } from "../../store/actions/loaderAction";
import LottieView from "lottie-react-native";
import checkmark from "../../../assets/lottie/checkmark.json";

const OTPScreen = ({ navigation, route }) => {
  const [otpError, setOtpError] = useState({
    show: false,
    bad: false,
    msg: "",
  });
  const [resetError, setResetError] = useState({
    show: false,
    bad: false,
    msg: "",
  });
  const [otp, setOtp] = useState({
    n1: "",
    n2: "",
    n3: "",
    n4: "",
    n5: "",
    n6: "",
  });
  const [otpVerified, setVerfiy] = useState(false);
  const [resetPass, setReset] = useState(false);

  const initialValue = {
    new_password: "",
    confirm_pass: "",
  };

  const num1Ref = useRef(null);
  const num2Ref = useRef(null);
  const num3Ref = useRef(null);
  const num4Ref = useRef(null);
  const num5Ref = useRef(null);
  const num6Ref = useRef(null);
  const dispatch = useDispatch();

  const loader = useSelector((state) => state.LOADER);

  const otpRef = useRef(new Animated.Value(0)).current;
  const resetRef = useRef(new Animated.Value(0)).current;
  const verifyOtp = async () => {
    try {
      var data = JSON.stringify({
        otp: otp.n1 + otp.n2 + otp.n3 + otp.n4 + otp.n5 + otp.n6,
        email: route.params.email,
      });

      var config = {
        method: "post",
        url: `${BASE_URL}/verifyOTP`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      await axios(config)
        .then(function (response) {
          if (response.status === 200) {
            setOtpError({
              show: true,
              bad: false,
              msg: response.data.message,
            });
            animateFlip();
          } else {
            setOtpError({
              show: true,
              bad: true,
              msg: response.data.message,
            });
          }

          dispatch(loaderStop());
        })
        .catch(function (error) {
          console.log("sending email error", error);
          setOtpError({
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
  const resetPassword = async (values) => {
    try {
      var data = JSON.stringify({
        password: values.new_password,
        confirmPassword: values.confirm_pass,
        email: route.params.email,
      });

      var config = {
        method: "put",
        url: `${BASE_URL}/password/reset/`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      await axios(config)
        .then(function (response) {
          if (response.status === 200) {
            setResetError({
              show: true,
              bad: false,
              msg: "Password Reset Successfull",
            });
            setTimeout(() => {
              animateModal();
            }, 1000);
          } else {
            setResetError({
              show: true,
              bad: true,
              msg: "Password Reset unsuccessful",
            });
          }

          dispatch(loaderStop());
        })
        .catch(function (error) {
          setResetError({
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

  const animateFlip = () => {
    Animated.timing(otpRef, {
      toValue: 1,
      useNativeDriver: true,
      duration: 1000,
    }).start(() => {
      setVerfiy(true);
    });
  };
  const animateModal = () => {
    Animated.timing(resetRef, {
      toValue: 1,
      useNativeDriver: true,
      duration: 1000,
    }).start(() => {
      setReset(true);
    });
  };

  const handlePress = (values) => {
    dispatch(loaderStart());
    verifyOtp();
  };
  const handleReset = (values) => {
    dispatch(loaderStart());
    resetPassword(values);
  };
  return (
    <Animated.View style={style.container}>
      <View style={{ flex: 0.1 }}></View>
      {!otpVerified ? (
        <Animated.View
          style={{
            flex: 0.5,
            opacity: otpRef.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          }}
        >
          <Text style={style.header}>Enter OTP</Text>
          <Text style={style.desc}>We have sent a otp on your mail</Text>
          {/* </View>
      <View style={{ flex: 1 }}> */}
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextInput
              style={style.keypad}
              keyboardType="decimal-pad"
              mode="outlined"
              maxLength={1}
              outlineColor="rgba(0,0,0,0.2)"
              ref={num1Ref}
              onChangeText={(text) => {
                text === "" ? num1Ref.current.focus() : num2Ref.current.focus();
                setOtp({ ...otp, n1: text });
              }}
            />
            <TextInput
              style={style.keypad}
              keyboardType="decimal-pad"
              mode="outlined"
              maxLength={1}
              outlineColor="rgba(0,0,0,0.2)"
              ref={num2Ref}
              onChangeText={(text) => {
                text === "" ? num1Ref.current.focus() : num3Ref.current.focus();
                setOtp({ ...otp, n2: text });
              }}
            />
            <TextInput
              style={style.keypad}
              keyboardType="decimal-pad"
              mode="outlined"
              maxLength={1}
              outlineColor="rgba(0,0,0,0.2)"
              ref={num3Ref}
              onChangeText={(text) => {
                text === "" ? num2Ref.current.focus() : num4Ref.current.focus();
                setOtp({ ...otp, n3: text });
              }}
            />
            <TextInput
              style={style.keypad}
              keyboardType="decimal-pad"
              mode="outlined"
              maxLength={1}
              outlineColor="rgba(0,0,0,0.2)"
              ref={num4Ref}
              onChangeText={(text) => {
                text === "" ? num3Ref.current.focus() : num5Ref.current.focus();
                setOtp({ ...otp, n4: text });
              }}
            />
            <TextInput
              style={style.keypad}
              keyboardType="decimal-pad"
              mode="outlined"
              maxLength={1}
              outlineColor="rgba(0,0,0,0.2)"
              ref={num5Ref}
              onChangeText={(text) => {
                text === "" ? num4Ref.current.focus() : num6Ref.current.focus();
                setOtp({ ...otp, n5: text });
              }}
            />
            <TextInput
              style={style.keypad}
              keyboardType="decimal-pad"
              mode="outlined"
              maxLength={1}
              outlineColor="rgba(0,0,0,0.2)"
              ref={num6Ref}
              onChangeText={(text) => {
                text === "" ? num5Ref.current.focus() : null;
                setOtp({ ...otp, n6: text });
              }}
            />
          </View>
          {otpError.show && (
            <Text
              style={{
                color: otpError.bad ? "red" : "green",
                fontSize: 15,
                marginHorizontal: 10,
              }}
            >
              {otpError.msg}
            </Text>
          )}
          <TouchableNativeFeedback
            onPress={() => {
              handlePress();
            }}
          >
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
                  "Verify Otp"
                )}
              </Text>
            </View>
          </TouchableNativeFeedback>
        </Animated.View>
      ) : !resetPass ? (
        <Animated.View
          style={[
            {
              flex: 1,
              width: "100%",
              opacity: otpRef.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
            {
              opacity: resetRef.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
            },
          ]}
        >
          <Text style={style.header}>Create new password</Text>
          <Text style={style.desc}>
            Your new password must be different from previous used passwords
          </Text>
          {/* </View>
      <View style={{ flex: 1 }}> */}
          <Formik
            initialValues={initialValue}
            validationSchema={ResetSchema}
            onSubmit={(values) => handleReset(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <View
                style={{
                  flex: 1,
                }}
              >
                <RTextInput
                  label={"New Password"}
                  style={style.input}
                  mode="outlined"
                  outlineColor="rgba(0,0,0,0.2)"
                  onChangeText={handleChange("new_password")}
                />
                {errors.new_password && (
                  <Text
                    style={{
                      color: "red",
                      fontSize: 15,
                      marginHorizontal: 5,
                    }}
                  >
                    {errors.new_password}
                  </Text>
                )}
                <RTextInput
                  label={"Confirm new password"}
                  style={style.input}
                  mode="outlined"
                  outlineColor="rgba(0,0,0,0.2)"
                  onChangeText={handleChange("confirm_pass")}
                />
                {errors.confirm_pass && (
                  <Text
                    style={{
                      color: "red",
                      fontSize: 15,
                      marginHorizontal: 5,
                    }}
                  >
                    {errors.confirm_pass}
                  </Text>
                )}
                {resetError.show && (
                  <Text
                    style={{
                      color: resetError.bad ? "red" : "green",
                      fontSize: 15,
                      marginHorizontal: 5,
                    }}
                  >
                    {resetError.msg}
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
                        "Reset Password"
                      )}
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
            )}
          </Formik>
        </Animated.View>
      ) : (
        <Animated.View
          style={[
            {
              flex: 1,
              width: "100%",
            },
            {
              opacity: resetRef.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ]}
        >
          <LottieView
            source={require("../../../assets/lottie/checkmark.json")}
            autoPlay
            loop={false}
            onAnimationFinish={() => {
              navigation.replace("login");
            }}
            style={{ flex: 1 }}
          />
        </Animated.View>
      )}
    </Animated.View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 25,
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
    marginVertical: 10,
  },
  forgot_btn: {
    width: "100%",
  },
  keypad: {
    marginHorizontal: 3,
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center",
    borderColor: "rgba(0,0,0,0.3)",
  },
});

export default OTPScreen;
