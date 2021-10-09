import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Pressable,
  Image,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../constants/Colors";
import FONTS from "../constants/Fonts";
import GenreCard from "../components/GenreCard";
import MovieCard from "../components/MovieCard";
import ItemSeparator from "../components/ItemSeparator";
import { MaterialIcons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { auth } from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  getNowPlayingMovies,
  getUpcomingMovies,
  getAllGenres,
  getParticularGenre,
} from "../services/MovieService";

const HomeScreen = (props) => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [activeGenre, setActiveGenre] = useState({
    id: 28,
    name: "Action",
  });
  const [nowPlayingMovies, setNowPlayingMovies] = useState({});
  const [upcomingMovies, setUpcomingMovies] = useState({});
  const [genres, setGenres] = useState([]);
  const bottomTabHeight = useBottomTabBarHeight();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);
  useEffect(() => {
    getNowPlayingMovies().then((movieResponse) => {
      setNowPlayingMovies(movieResponse.data);
      // console.log(movieResponse.data);
    });
    getUpcomingMovies().then((movieResponse) =>
      setUpcomingMovies(movieResponse.data)
    );
    getAllGenres().then((genreResponse) => {
      setGenres([...genres, ...genreResponse.data.genres]);
      // console.log(genreResponse.data.genres);
    });
  }, []);

  useEffect(() => {
    const unsub = async () => {
      if (activeGenre !== "" && activeGenre !== "all") {
        const res = await getParticularGenre(activeGenre.id);
        console.log(activeGenre);
        setNowPlayingMovies(res.data);
      }
    };
    unsub();
  }, [activeGenre]);

  return (
    <>
      <ScrollView style={styles.container}>
        <StatusBar
          style='auto'
          translucent={false}
          backgroundColor={COLORS.BASIC_BACKGROUND}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
        >
          <Pressable
            onPress={() => {
              navigation.navigate("profile");
            }}
            android_ripple={{ color: COLORS.GRAY, borderless: true }}
          >
            <Image
              style={{
                width: 35,
                height: 35,
                backgroundColor: "#000",
                borderRadius: 25,
              }}
              source={{
                uri:
                  user?.photoURL ??
                  "https://www.gravatar.com/avatar/94d093eda664addd6e450d7e9881bcad?s=32&d=identicon&r=PG",
              }}
            />
          </Pressable>
          <Text style={styles.appName}>Hingtam</Text>
          <Pressable
            onPress={() => navigation.navigate("search")}
            android_ripple={{ color: COLORS.GRAY, borderless: true }}
          >
            <MaterialIcons name='search' size={25} />
          </Pressable>
        </View>
        {/* <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Now Showing</Text>
          <Text style={styles.headerSubTitle}>VIEW ALL</Text>
        </View> */}
        <View style={styles.genreListContainer}>
          <FlatList
            data={genres}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <ItemSeparator width={20} />}
            ListHeaderComponent={() => <ItemSeparator width={20} />}
            ListFooterComponent={() => <ItemSeparator width={20} />}
            renderItem={({ item }) => (
              <GenreCard
                genreName={item.name}
                active={item.name === activeGenre.name ? true : false}
                onPress={() => setActiveGenre(item)}
              />
            )}
          />
        </View>
        <View>
          <FlatList
            data={nowPlayingMovies.results}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <ItemSeparator width={20} />}
            ListHeaderComponent={() => <ItemSeparator width={20} />}
            ListFooterComponent={() => <ItemSeparator width={20} />}
            renderItem={({ item }) => (
              <MovieCard
                title={item.title}
                language={item.original_language}
                voteAverage={item.vote_average}
                voteCount={item.vote_count}
                poster={item.poster_path}
                heartLess={false}
                onPress={() =>
                  navigation.navigate("movie", { movieId: item.id })
                }
              />
            )}
          />
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Coming Soon</Text>
          <Text style={styles.headerSubTitle}>VIEW ALL</Text>
        </View>
        <View style={{ paddingBottom: bottomTabHeight }}>
          <FlatList
            data={upcomingMovies.results}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <ItemSeparator width={20} />}
            ListHeaderComponent={() => <ItemSeparator width={20} />}
            ListFooterComponent={() => <ItemSeparator width={20} />}
            renderItem={({ item }) => (
              <MovieCard
                title={item.title}
                language={item.original_language}
                voteAverage={item.vote_average}
                voteCount={item.vote_count}
                poster={item.poster_path}
                size={0.6}
                onPress={() =>
                  navigation.navigate("movie", { movieId: item.id })
                }
              />
            )}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BASIC_BACKGROUND,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: FONTS.REGULAR,
  },
  headerSubTitle: {
    fontSize: 13,
    color: COLORS.ACTIVE,
    fontFamily: FONTS.BOLD,
  },
  genreListContainer: {
    paddingVertical: 10,
  },
  appName: {
    color: "#5642F5",
    fontSize: 25,
    fontFamily: "GloriaHallelujah",
    // textDecorationLine: "underline",
    fontWeight: "900",
  },
});

export default HomeScreen;
