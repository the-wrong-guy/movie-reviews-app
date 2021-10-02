import React from "react";
import { View, Text } from "react-native";
import LottieView from "lottie-react-native";

export default function SplashScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Splash Screen</Text>
      {/* <LottieView
        autoPlay
        loop
        source={require("../Lottie/splash-animation.json")}
      /> */}
    </View>
  );
}
