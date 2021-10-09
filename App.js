import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
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
import Toast from "react-native-toast-message";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import Colors from "./src/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";
import ProfileScreen from "./src/screens/ProfileScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStackScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveBackgroundColor: "#A7E3D7",
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          borderRadius: 15,
          bottom: 8,
          marginHorizontal: 7,
          backgroundColor: "#fff",
          position: "absolute",
        },
        tabBarItemStyle: { margin: 5, borderRadius: 10 },
      }}
    >
      <Tab.Screen
        name='home'
        component={HomeScreen}
        options={{
          tabBarIcon: () => <Icon name='home' size={30} />,
          tabBarShowLabel: false,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name='fav'
        component={FavoriteScreen}
        options={{
          tabBarIcon: () => <Icon name='favorite' size={30} />,
          tabBarShowLabel: false,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name='search'
        component={SearchScreen}
        options={{
          tabBarIcon: () => <Icon name='search' size={30} />,
          tabBarShowLabel: false,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default () => {
  // const navigation = useNavigation();
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
          component={HomeStackScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='movie'
          component={MovieScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='profile'
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <Toast ref={(ref) => Toast.setRef(ref)} />
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
