import React, {
  useEffect,
  useCallback,
  useState,
  useMemo,
  useRef,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Dimensions,
} from "react-native";
import COLORS from "../constants/Colors";
import MovieCard from "../components/MovieCard";
import ItemSeparator from "../components/ItemSeparator";
import { searchMovies } from "../services/MovieService";
import { useNavigation } from "@react-navigation/core";
import { SearchBar } from "react-native-elements";
import LottieView from "lottie-react-native";

const { height, width } = Dimensions.get("window");

export default function SearchScreen() {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const [loader, showLoader] = useState(false);
  const [query, setQuery] = useState("");

  const fetchMovies = async (event) => {
    setQuery(event);
    if (event !== "") {
      showLoader(true);
      try {
        await searchMovies(event).then(({ data }) => setData(data.results));
      } catch (error) {
        console.error(error);
      } finally {
        showLoader(false);
      }
    } else {
      setData([]);
    }
  };

  console.log(data, query);
  return (
    <View style={styles.container}>
      <SearchBar
        placeholder='Search movies, TV shows...'
        onChangeText={fetchMovies}
        value={query}
        showLoading={loader}
        lightTheme
        inputContainerStyle={{ borderRadius: 25 }}
        containerStyle={{
          backgroundColor: COLORS.BASIC_BACKGROUND,
          borderTopWidth: 0,
          borderBottomWidth: 0,
        }}
      />
      {query === "" && data.length === 0 && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: "#434",
            height: height - 130,
          }}
        >
          <LottieView
            autoPlay
            loop
            source={require("../Lottie/61372-404-error-not-found.json")}
          />
        </View>
      )}
      {query !== "" && data.length === 0 && !loader && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: "#434",
            height: height - 130,
          }}
        >
          <LottieView
            autoPlay
            loop
            source={require("../Lottie/1725-not-found.json")}
          />
          <Text style={{ marginTop: 100 }}>Didn't found anything!</Text>
        </View>
      )}
      <View style={styles.moviesContainer}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          scrollEventThrottle
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <MovieCard
              title={item.title}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              heartLess={false}
              size={0.8}
              onPress={() => navigation.navigate("movie", { movieId: item.id })}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BASIC_BACKGROUND,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  moviesContainer: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    width,
  },
});
