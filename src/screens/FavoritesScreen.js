import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import COLORS from "../constants/Colors";
import FONTS from "../constants/Fonts";
import GenreCard from "../components/GenreCard";
import MovieCard from "../components/MovieCard";
import ItemSeparator from "../components/ItemSeparator";
import { useNavigation } from "@react-navigation/core";

// with ability to buy tickets of the moview

export default function FavoritesScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <StatusBar
        style='auto'
        translucent={false}
        backgroundColor={COLORS.BASIC_BACKGROUND}
      />
      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
        >
          <Feather name='chevron-left' size={35} color={"#000"} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fav Screen</Text>
        <MaterialIcons name='favorite' color='red' />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.BASIC_BACKGROUND,
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: FONTS.REGULAR,
  },
});
