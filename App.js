import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import MovieScreen from "./src/screens/MovieScreen";
import FavoriteScreen from "./src/screens/FavoritesScreen";
import SearchScreen from "./src/screens/SearchScreen";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "./src/components/DrawerContent";
import SplashScreen from "./src/screens/SplashScreen";
import LoginScreen from "./src/screens/LoginScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='home'
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='movie'
        component={MovieScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default () => {
  const [fontLoaded] = useFonts({
    Regular: require("./assets/fonts/NunitoSans-Regular.ttf"),
    Bold: require("./assets/fonts/NunitoSans-Bold.ttf"),
    Black: require("./assets/fonts/NunitoSans-Black.ttf"),
    ExtraBold: require("./assets/fonts/NunitoSans-ExtraBold.ttf"),
    ExtraLight: require("./assets/fonts/NunitoSans-ExtraLight.ttf"),
    Light: require("./assets/fonts/NunitoSans-Light.ttf"),
    SemiBold: require("./assets/fonts/NunitoSans-SemiBold.ttf"),
    GloriaHallelujah: require("./assets/fonts/GloriaHallelujah-Regular.ttf"),
  });

  return fontLoaded ? (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='login'
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='home'
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='movie'
          component={MovieScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='fav'
          component={FavoriteScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='search'
          component={SearchScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <SplashScreen />
  );
};

{
  /* <Drawer.Navigator
drawerContent={(props) => <CustomDrawerContent {...props} />}
initialRouteName='home'
screenOptions={{ drawerPosition: "left", drawerType: "front" }}
>
<Drawer.Screen
  name='home'
  component={HomeStackScreen}
  options={{ headerShown: false }}
/>
<Drawer.Screen
  name='fav'
  component={FavoriteScreen}
  options={{ headerShown: false }}
/>
</Drawer.Navigator> */
}
