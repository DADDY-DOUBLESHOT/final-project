import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import Svg, { Image, Ellipse, ClipPath } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  withDelay,
  runOnJS,
  withSequence,
  withSpring,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, userRegisterPre } from "../store/actions/userAction";
import { loaderStart } from "../store/actions/loaderAction";
import { Formik, FormikProps } from "formik";
import { LoginSchema, SignupSchema } from "../validations/loginValidations";

const { width, height } = Dimensions.get("window");

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const imagePosition = useSharedValue(1);
  const formButtonScale = useSharedValue(1);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const loader = useSelector((state) => state.LOADER);

  const initialValue1 = {
    email: "",
    password: "",
  };
  const initialValue2 = {
    email: "",
    name: "",
    password: "",
  };

  const handleSubmit = (values) => {
    dispatch(loaderStart());
    if (isRegistering) {
      dispatch(userRegisterPre(values.email, values.password, values.name));
      navigation.push("Genre");
      return;
    }
    dispatch(userLogin(values.email, values.password));
  };
  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1],
      [-(height - 200), 0]
    );
    return {
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const buttonsAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0]);
    return {
      opacity: withTiming(imagePosition.value, { duration: 500 }),
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const closeButtonContainerStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360]);
    return {
      opacity: withTiming(imagePosition.value === 1 ? 0 : 1, { duration: 800 }),
      transform: [
        { rotate: withTiming(interpolation + "deg", { duration: 1000 }) },
      ],
    };
  });

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        imagePosition.value === 0
          ? withDelay(400, withTiming(1, { duration: 800 }))
          : withTiming(0, { duration: 300 }),
    };
  });

  const formButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: formButtonScale.value }],
    };
  });

  const loginHandler = () => {
    imagePosition.value = 0;

    if (isRegistering) {
      runOnJS(setIsRegistering)(false);
    }
  };

  const registerHandler = () => {
    imagePosition.value = 0;
    if (!isRegistering) {
      runOnJS(setIsRegistering)(true);
    }
  };

  return (
    <Animated.ScrollView contentContainerStyle={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
        <Svg height={height + 100} width={width}>
          <ClipPath id="clipPathId">
            <Ellipse cx={width / 2} rx={height} ry={height + 100} />
          </ClipPath>
          <Image
            href={require("../../assets/blobs.png")}
            width={width + 100}
            height={height + 100}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#clipPathId)"
          />
        </Svg>
        <Animated.View
          style={[styles.closeButtonContainer, closeButtonContainerStyle]}
        >
          <Text onPress={() => (imagePosition.value = 1)}>X</Text>
        </Animated.View>
      </Animated.View>
      <View style={styles.bottomContainer}>
        <Animated.View style={buttonsAnimatedStyle}>
          <Pressable style={styles.loginbutton} onPress={loginHandler}>
            <Text style={styles.loginbuttonText}>Log in</Text>
          </Pressable>
        </Animated.View>
        <Animated.View style={buttonsAnimatedStyle}>
          <Pressable style={styles.signupbutton} onPress={registerHandler}>
            <Text style={styles.buttonText}>Sign up</Text>
          </Pressable>
        </Animated.View>
        <Formik
          initialValues={isRegistering ? initialValue2 : initialValue1}
          validationSchema={isRegistering ? SignupSchema : LoginSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <Animated.View
              style={[styles.formInputContainer, formAnimatedStyle]}
            >
              <KeyboardAvoidingView>
                <View style={styles.row}>
                  <Ionicons name="mail" size={25} color="rgba(1,89,213,255)" />
                  <TextInput
                    placeholder="Email"
                    style={styles.field}
                    placeholderTextColor="black"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                  />
                </View>
                {errors.email && touched.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}
                {isRegistering && (
                  <View style={styles.row}>
                    <Ionicons
                      name="person"
                      size={25}
                      color="rgba(1,89,213,255)"
                    />
                    <TextInput
                      placeholder="Full Name"
                      style={styles.field}
                      placeholderTextColor="black"
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                      value={values.name}
                    />
                  </View>
                )}
                {isRegistering && errors.name && touched.name && (
                  <Text style={styles.error}>{errors.name}</Text>
                )}
                <View style={styles.row}>
                  <Ionicons name="key" size={25} color="rgba(1,89,213,255)" />
                  <TextInput
                    placeholder="Password"
                    style={styles.field}
                    placeholderTextColor="black"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                  />
                </View>
                {errors.password && touched.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}
              </KeyboardAvoidingView>
              <Animated.View
                style={[styles.formButton, formButtonAnimatedStyle]}
              >
                <Pressable
                  onPress={handleSubmit}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Text style={styles.buttonText}>
                    {isRegistering ? "Sign up" : "Log in"}
                  </Text>
                  {loader && loader.active && (
                    <ActivityIndicator
                      size="small"
                      color="white"
                      style={{ paddingLeft: 12 }}
                    />
                  )}
                </Pressable>
              </Animated.View>
            </Animated.View>
          )}
        </Formik>
      </View>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  error: { color: "red", paddingHorizontal: 30 },
  button: {
    backgroundColor: "rgba(123,104,238,0.8)",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  loginbutton: {
    backgroundColor: "rgba(255,255,255,255)",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: "white",
  },
  signupbutton: {
    backgroundColor: "rgba(0,107,255,255)",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: "white",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    letterSpacing: 0.5,
  },
  loginbuttonText: {
    fontSize: 20,
    fontWeight: "700",
    color: "rgb(0,107,255)",
    letterSpacing: 0.5,
  },
  bottomContainer: {
    justifyContent: "center",
    height: height - 200,
    paddingVertical: 10,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.2)",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 15,
    paddingLeft: 10,
  },
  formButton: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "rgba(0,107,255,255)",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: "white",
  },
  formInputContainer: {
    ...StyleSheet.absoluteFill,
    zIndex: -1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  closeButtonContainer: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 1,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 20,
    top: -20,
  },
  row: {
    height: 50,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.2)",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 15,
    paddingLeft: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  field: {
    paddingHorizontal: 5,
    width: "100%",
  },
});
