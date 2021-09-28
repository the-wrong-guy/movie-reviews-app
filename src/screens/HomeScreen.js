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

import {
  getNowPlayingMovies,
  getUpcomingMovies,
  getAllGenres,
  getParticularGenre,
} from "../services/MovieService";

const HomeScreen = (props) => {
  const navigation = useNavigation();
  const [activeGenre, setActiveGenre] = useState({
    id: 28,
    name: "Action",
  });
  const [nowPlayingMovies, setNowPlayingMovies] = useState({});
  const [upcomingMovies, setUpcomingMovies] = useState({});
  const [genres, setGenres] = useState([]);

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
              navigation.navigate("fav");
            }}
          >
            <Image
              style={{ width: 25, height: 28 }}
              source={{
                uri: "https://img.icons8.com/material-rounded/96/000000/menu--v1.png",
              }}
            />
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("search")}
            android_ripple={{ color: COLORS.GRAY, borderless: true }}
          >
            <MaterialIcons name='search' size={25} />
          </Pressable>
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Now Showing</Text>
          <Text style={styles.headerSubTitle}>VIEW ALL</Text>
        </View>
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
        <View>
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
});

export default HomeScreen;
