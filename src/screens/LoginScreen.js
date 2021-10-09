import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import { Button, Input } from "react-native-elements";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { auth } from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const { width, height } = Dimensions.get("window");

// 213812759610-829072g84ec4se432rnucgl9hn250t3o.apps.googleusercontent.com

export default function LoginScreen({ navigation, route }) {
  const [details, setDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [detailsError, setDetailsError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forwardView, setForwardView] = useState(false);
  // const navigation = useNavigation();

  const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  useEffect(() => {
    const unsub = async () => {
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      if (user) {
        navigation.navigate("home");
      }
    };
    unsub();
  }, []);

  const resetForm = () => {
    setDetails({ email: "", password: "", confirmPassword: "" });
    setDetailsError({ email: "", password: "", confirmPassword: "" });
    setLoginError(false);
    setLoading(false);
  };
  const handleSignUp = async () => {
    if (
      details.email === "" &&
      details.password === "" &&
      details.confirmPassword === ""
    ) {
      setDetailsError({
        email: "This field is required",
        password: "This field is required",
        confirmPassword: "This field is required",
      });
    } else if (details.email === "") {
      setDetailsError({
        ...detailsError,
        email: "This field is required",
      });
    } else if (emailReg.test(details.email) === false) {
      setDetailsError({
        ...detailsError,
        email: "Enter a valid email",
      });
    } else if (details.password === "") {
      setDetailsError({
        ...detailsError,
        password: "This field is required",
      });
    } else if (details.confirmPassword === "") {
      setDetailsError({
        ...detailsError,
        confirmPassword: "This field is required",
      });
    } else if (details.confirmPassword !== details.password) {
      setDetailsError({
        ...detailsError,
        confirmPassword: "Password didn't match",
      });
    } else if (
      details.email !== "" &&
      details.password !== "" &&
      details.confirmPassword !== ""
    ) {
      setLoading(true);
      await auth
        .createUserWithEmailAndPassword(details.email, details.password)
        .then(async (userCredential) => {
          // Signed in
          const user = userCredential.user;
          await AsyncStorage.setItem("user", JSON.stringify(user));
          console.log("Loged In user", user);
          navigation.navigate("home");
          resetForm();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("eroor login ===>", errorMessage);
          Toast.show({
            type: "error",
            text1: errorMessage,
          });
          setLoginError(errorMessage);
          setLoading(false);
        });
    }
  };

  const handleLogin = async () => {
    if (details.email === "" && details.password === "") {
      setDetailsError({
        email: "This field is required",
        password: "This field is required",
      });
    } else if (details.email === "") {
      setDetailsError({
        ...detailsError,
        email: "This field is required",
      });
    } else if (details.password === "") {
      setDetailsError({
        ...detailsError,
        password: "This field is required",
      });
    } else if (emailReg.test(details.email) === false) {
      setDetailsError({
        ...detailsError,
        email: "Enter a valid email",
      });
    } else if (details.email !== "" && details.password !== "") {
      setLoading(true);
      await auth
        .signInWithEmailAndPassword(details.email, details.password)
        .then(async (userCredential) => {
          // Signed in
          const user = userCredential.user;
          if (user) {
            await AsyncStorage.setItem("user", JSON.stringify(user));
          }

          console.log("Loged In user", user);
          navigation.navigate("home");
          resetForm();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("eroor login ===>", errorMessage);
          Toast.show({
            type: "error",
            text1: errorCode,
            text2: errorMessage,
          });
          setLoginError(errorMessage);
          setLoading(false);
        });
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          "rgba(0,0,0,0.8)",
          "rgba(255,225,255,0.5)",
          "rgba(163, 95, 255, 0.8)",
          "transparent",
        ]}
        style={styles.background}
      />
      <Text style={styles.appName}>Hingtam</Text>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: 200,
          position: "relative",
          width: 200,
        }}
      >
        <LottieView
          autoPlay
          loop
          source={require("../Lottie/72235-watch-a-movie-with-popcorn.json")}
        />
      </View>

      {!forwardView && (
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Input
            inputContainerStyle={{
              borderWidth: 1,
              width: 280,
              borderRadius: 5,
              paddingHorizontal: 5,
            }}
            containerStyle={{ padding: 0 }}
            leftIcon={<Icon name='mail' size={25} />}
            label='Email'
            errorMessage={detailsError.email !== "" && detailsError.email}
            value={details.email}
            onChangeText={(e) => {
              setDetails({ ...details, email: e });
              setDetailsError({ ...detailsError, email: "" });
            }}
          />
          <Input
            inputContainerStyle={{
              borderWidth: 1,
              width: 280,
              borderRadius: 5,
              paddingHorizontal: 5,
            }}
            leftIcon={<Icon name='lock' size={25} />}
            label='Password'
            secureTextEntry
            errorMessage={detailsError.password !== "" && detailsError.password}
            value={details.password}
            onChangeText={(e) => {
              setDetails({ ...details, password: e });
              setDetailsError({ ...detailsError, password: "" });
            }}
          />
          <Button
            title='LOGIN'
            containerStyle={{ width: 150 }}
            onPress={handleLogin}
            loading={loading}
          />
        </View>
      )}

      {forwardView && (
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Input
            inputContainerStyle={{
              borderWidth: 1,
              width: 280,
              borderRadius: 5,
              paddingHorizontal: 5,
            }}
            containerStyle={{ padding: 0 }}
            leftIcon={<Icon name='mail' size={25} />}
            label='Email'
            errorMessage={detailsError.email !== "" && detailsError.email}
            value={details.email}
            onChangeText={(e) => {
              setDetails({ ...details, email: e });
              setDetailsError({ ...detailsError, email: "" });
            }}
          />
          <Input
            inputContainerStyle={{
              borderWidth: 1,
              width: 280,
              borderRadius: 5,
              paddingHorizontal: 5,
            }}
            leftIcon={<Icon name='lock' size={25} />}
            label='Password'
            secureTextEntry
            errorMessage={detailsError.password !== "" && detailsError.password}
            value={details.password}
            onChangeText={(e) => {
              setDetails({ ...details, password: e });
              setDetailsError({ ...detailsError, password: "" });
            }}
          />
          <Input
            inputContainerStyle={{
              borderWidth: 1,
              width: 280,
              borderRadius: 5,
              paddingHorizontal: 5,
            }}
            leftIcon={<Icon name='lock' size={25} />}
            label='Confirm Password'
            secureTextEntry
            errorMessage={
              detailsError.confirmPassword !== "" &&
              detailsError.confirmPassword
            }
            value={details.confirmPassword}
            onChangeText={(e) => {
              setDetails({ ...details, confirmPassword: e });
              setDetailsError({ ...detailsError, confirmPassword: "" });
            }}
          />
          <Button
            title='SIGN UP'
            containerStyle={{ width: 150 }}
            onPress={handleSignUp}
            loading={loading}
          />
        </View>
      )}

      <Text
        style={{
          color: "blue",
          marginTop: 15,
          textDecorationLine: "underline",
        }}
        onPress={() => {
          setForwardView(!forwardView);
          resetForm();
        }}
      >
        {forwardView ? "Login" : "Don't have a account ? Sign Up"}
      </Text>

      {/* <Button
        title='Sign In With Google'
        raised
        icon={<Icon name='google' size={27} style={{ marginRight: 10 }} />}
        style={styles.googleBtn}
        onPress={handleGoogleSignIn}
      />
      <Button
        title='Sign In With Github'
        raised
        icon={<Icon name='github' size={27} style={{ marginRight: 10 }} />}
        style={styles.githubBtn}
        onPress={handleGithubSignIn}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#8718E7",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  appName: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "800",
    fontFamily: "GloriaHallelujah",
  },
  googleBtn: { width: 0 },
  githubBtn: { width: 30, marginTop: 10 },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height,
  },
});
