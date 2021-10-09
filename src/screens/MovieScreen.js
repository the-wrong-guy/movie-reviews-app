import { StatusBar } from "expo-status-bar";
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking,
  FlatList,
  Share,
  Modal,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../constants/Colors";
import FONTS from "../constants/Fonts";
import { WebView } from "react-native-webview";
import {
  getMovieById,
  getPoster,
  getVideo,
  getLanguage,
} from "../services/MovieService";
import ItemSeparator from "../components/ItemSeparator";
import CastCard from "../components/CastCard";
import MovieCard from "../components/MovieCard";
import Comment from "../components/Comment";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Ionicons } from "@expo/vector-icons";
import { APPEND_TO_RESPONSE as AR } from "../constants/Urls";
import { Button } from "react-native-elements";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import db

// import moment from "moment";

const { height, width } = Dimensions.get("window");

const setHeight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;

const MovieScreen = ({ route }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState({});
  const [isCastSelected, setIsCastSelected] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getMovieById(
      movieId,
      `${AR.VIDEOS},${AR.CREDITS},${AR.RECOMMENDATIONS},${AR.SIMILAR},${AR.REVIEWS}`
    ).then((response) => {
      setMovie(response?.data);
      // console.log(response?.data.credits?.cast);
      // console.warn("Videos ===>", response?.data.videos.results);
      // console.log("Data===>", response?.data);
    });
  }, []);

  //Bottom Sheet
  const bottomSheetModalRef = useRef(null);
  // variables
  const snapPoints = useMemo(() => ["50%", "80%"], []);
  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  // let days = [];
  // let daysRequired = 7;

  // for (let i = 1; i <= daysRequired; i++) {
  //   days.push(moment().add(i, "days").format("Do"));
  // }

  const movieTimes = [
    { time: "1:30 PM", id: 1 },
    { time: "2:10 PM", id: 2 },
    { time: "11:00 AM", id: 3 },
    { time: "3:00 PM", id: 4 },
    { time: "9:30 AM", id: 51 },
  ];

  const movieDays = [
    { day: "sun", id: 1 },
    { day: "mon", id: 2 },
    { day: "thurs", id: 3 },
    { day: "fri", id: 4 },
    { day: "tues", id: 51 },
  ];

  const [bookingDetails, setBookingDetails] = useState({
    day: "",
    time: "",
  });


  const handleBookMovie = ()=>{
    if(bookingDetails.day === '' || bookingDetails.time === ''){
      Toast.show({
        type: "success",
        text1: "Please select both Time and Date",
      })}else{
      };
    }
  }
  const movieDayItem = ({ item }) => {
    return (
      <Pressable
        android_ripple={{ color: COLORS.GRAY, borderless: true }}
        onPress={() => setBookingDetails({ ...bookingDetails, day: item.day })}
      >
        <View
          style={{
            paddingVertical: 3,
            paddingHorizontal: 5,
            backgroundColor: "#82C5FA",
            borderRadius: 15,
            width: 80,
            alignItems: "center",
            height: 50,
            justifyContent: "center",
            borderColor:
              bookingDetails.day === item.day ? "#F5F500" : "#82C5FA",
            borderWidth: 2,
          }}
        >
          <Text style={{ fontFamily: FONTS.BOLD, color: "#fff" }}>
            {item.day}
          </Text>
        </View>
      </Pressable>
    );
  };

  const movieTimeItem = ({ item }) => {
    return (
      <Pressable
        android_ripple={{ color: COLORS.GRAY, borderless: true }}
        onPress={() =>
          setBookingDetails({ ...bookingDetails, time: item.time })
        }
      >
        <View
          style={{
            paddingVertical: 3,
            paddingHorizontal: 5,
            backgroundColor: "#82C5FA",
            borderRadius: 15,
            width: 80,
            alignItems: "center",
            height: 50,
            justifyContent: "center",
            borderColor:
              bookingDetails.time === item.time ? "#F5F500" : "#82C5FA",
            borderWidth: 2,
          }}
        >
          <Text style={{ fontFamily: FONTS.BOLD, color: "#fff" }}>
            {item.time}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{
          backgroundColor: "#FCC8BD",
          borderRadius: 15,
        }}
      >
        <View style={styles.bottomSheetContainer}>
          <Text
            style={{
              color: COLORS.BLACK,
              fontFamily: FONTS.EXTRA_BOLD,
              fontSize: 18,
              paddingBottom: 10,
            }}
            numberOfLines={2}
          >
            {movie?.original_title}
          </Text>
          <Image
            style={styles.moviePosterImage}
            resizeMode='cover'
            source={{ uri: getPoster(movie?.backdrop_path) }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={styles.row}>
              <Ionicons name='star' size={22} color={COLORS.STAR} />
              <Text style={styles.ratingText}>{movie?.vote_average}</Text>
            </View>
            <Text
              style={{
                color: COLORS.LIGHT_GRAY,
                paddingTop: 5,
                fontFamily: FONTS.BOLD,
                fontSize: 13,
              }}
            >
              {movie?.runtime} Min
            </Text>
            <Text
              style={{
                color: COLORS.LIGHT_GRAY,
                paddingTop: 5,
                fontFamily: FONTS.BOLD,
                fontSize: 13,
              }}
            >
              {getLanguage(movie?.original_language)?.english_name}
            </Text>
          </View>
          <Text
            style={{
              textAlign: "center",
              fontFamily: FONTS.BOLD,
              color: "#fff",
              fontSize: 20,
              marginVertical: 15,
            }}
          >
            Select Date and Time
          </Text>
          <View style={{ flex: 1, marginTop: 10 }}>
            <BottomSheetFlatList
              data={movieTimes}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              renderItem={movieTimeItem}
              ItemSeparatorComponent={() => <ItemSeparator width={20} />}
              ListFooterComponent={() => <ItemSeparator width={20} />}
            />
          </View>
          <View style={{ flex: 1, height: 50 }}>
            <BottomSheetFlatList
              data={movieDays}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              renderItem={movieDayItem}
              ItemSeparatorComponent={() => <ItemSeparator width={20} />}
              ListFooterComponent={() => <ItemSeparator width={20} />}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: 15,
            }}
          >
            <View style={{}}>
              <Text style={{ fontFamily: FONTS.BOLD, color: COLORS.GRAY }}>
                Total Price
              </Text>
              <Text
                style={{
                  fontFamily: FONTS.EXTRA_BOLD,
                  fontSize: 30,
                  color: "#fff",
                }}
              >
                $10
              </Text>
            </View>
            <Button
              buttonStyle={{
                backgroundColor: "#ffb43a",
                height: 50,
                width: 200,
                borderRadius: 25,
              }}
              containerStyle={{ borderRadius: 25 }}
              titleStyle={{ color: "#000" }}
              title='Book Now'
              onPress={handleBookMovie}
            />
          </View>
        </View>
      </BottomSheetModal>

      {/* <BottomSheet isVisible={isVisible}>
        <View>
          <Text>Hola</Text>
        </View>
      </BottomSheet> */}
      <ScrollView style={styles.container}>
        <StatusBar style='light' />
        <LinearGradient
          colors={["rgba(0, 0, 0, 0.5)", "rgba(217, 217, 217, 0)"]}
          start={[0, 0.3]}
          style={styles.linearGradient}
        />
        <View style={styles.moviePosterImageContainer}>
          <Image
            style={styles.moviePosterImage}
            resizeMode='cover'
            source={{ uri: getPoster(movie?.backdrop_path) }}
          />
        </View>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.goBack()}
          >
            <Feather name='chevron-left' size={35} color={COLORS.WHITE} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              Share.share({ message: `${movie?.title}\n\n${movie?.homepage}` })
            }
          >
            <Text style={styles.headerText}>Share</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => Linking.openURL(getVideo(movie.videos.results[0].key))}
        >
          <Ionicons name='play-circle-outline' size={70} color={COLORS.WHITE} />
        </TouchableOpacity>
        <ItemSeparator height={setHeight(37)} />
        <View style={styles.movieTitleContainer}>
          <Text style={[styles.movieTitle, { flex: 1 }]} numberOfLines={2}>
            {movie?.original_title}
          </Text>
          <View style={styles.row}>
            <Ionicons name='star' size={22} color={COLORS.STAR} />
            <Text style={styles.ratingText}>{movie?.vote_average}</Text>
          </View>
        </View>
        <Text style={styles.genreText}>
          {movie?.genres?.map((genre) => genre?.name)?.join(", ")} |{" "}
          {movie?.runtime} Min
        </Text>
        <Text style={styles.genreText}>
          {getLanguage(movie?.original_language)?.english_name}
        </Text>
        <View style={styles.overviewContainer}>
          <Text style={styles.overviewTitle}>Overview</Text>
          <Text style={styles.overviewText}>{movie?.overview}</Text>
        </View>
        <View>
          {/* <Text style={styles.castTitle}>Cast</Text> */}
          <View style={styles.castSubMenuContainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setIsCastSelected(true)}
            >
              <Text
                style={{
                  ...styles.castSubMenuText,
                  color: isCastSelected ? COLORS.BLACK : COLORS.LIGHT_GRAY,
                  // textDecorationLine: "underline",
                }}
              >
                Cast
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setIsCastSelected(false)}
            >
              <Text
                style={{
                  ...styles.castSubMenuText,
                  color: isCastSelected ? COLORS.LIGHT_GRAY : COLORS.BLACK,
                  // textDecorationLine: "underline",
                }}
              >
                Crew
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            style={{ marginVertical: 5 }}
            data={isCastSelected ? movie?.credits?.cast : movie?.credits?.crew}
            keyExtractor={(item) => item?.credit_id}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={() => <ItemSeparator width={20} />}
            ItemSeparatorComponent={() => <ItemSeparator width={20} />}
            ListFooterComponent={() => <ItemSeparator width={20} />}
            renderItem={({ item }) => (
              <CastCard
                originalName={item?.name}
                characterName={isCastSelected ? item?.character : item?.job}
                image={item?.profile_path}
              />
            )}
          />
        </View>

        <Button
          raised
          containerStyle={styles.bookBtn}
          buttonStyle={{ borderRadius: 25, backgroundColor: "#F56419" }}
          titleStyle={{ textTransform: "uppercase" }}
          title='Book a ticket'
          onPress={handlePresentModalPress}
        />

        {movie?.reviews?.results.length > 0 && (
          <>
            <Text style={styles.extraListTitle}>Reviews</Text>
            <View style={{ paddingHorizontal: 20 }}>
              {movie?.reviews?.results.map((item) => (
                <Comment data={item} />
              ))}
            </View>
          </>
        )}

        <Text style={styles.extraListTitle}>Recommended Movies</Text>
        <FlatList
          data={movie?.recommendations?.results}
          keyExtractor={(item) => item?.id?.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <MovieCard
              title={item.title}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              size={0.6}
              onPress={() => navigation.push("movie", { movieId: item.id })}
            />
          )}
        />
        <Text style={styles.extraListTitle}>Similar Movies</Text>
        <FlatList
          data={movie?.similar?.results}
          keyExtractor={(item) => item?.id?.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <MovieCard
              title={item.title}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              size={0.6}
              onPress={() => navigation.push("movie", { movieId: item.id })}
            />
          )}
        />
      </ScrollView>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BASIC_BACKGROUND,
  },
  moviePosterImageContainer: {
    height: setHeight(35),
    width: setWidth(145),
    alignItems: "center",
    position: "absolute",
    left: setWidth((100 - 145) / 2),
    top: 0,
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 300,
    elevation: 8,
  },
  moviePosterImage: {
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 300,
    width: setWidth(145),
    height: setHeight(35),
  },
  linearGradient: {
    width: setWidth(100),
    height: setHeight(6),
    position: "absolute",
    top: 0,
    elevation: 9,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    position: "absolute",
    right: 0,
    left: 0,
    top: 50,
    elevation: 20,
  },
  headerText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.BOLD,
  },
  playButton: {
    position: "absolute",
    top: 110,
    left: setWidth(50) - 70 / 2,
    elevation: 10,
  },
  movieTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  movieTitle: {
    color: COLORS.BLACK,
    fontFamily: FONTS.EXTRA_BOLD,
    fontSize: 18,
    width: setWidth(60),
  },
  ratingText: {
    marginLeft: 5,
    color: COLORS.BLACK,
    fontFamily: FONTS.EXTRA_BOLD,
    fontSize: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  genreText: {
    color: COLORS.LIGHT_GRAY,
    paddingHorizontal: 20,
    paddingTop: 5,
    fontFamily: FONTS.BOLD,
    fontSize: 13,
  },
  overviewContainer: {
    backgroundColor: COLORS.EXTRA_LIGHT_GRAY,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
  },
  overviewTitle: {
    color: COLORS.BLACK,
    fontFamily: FONTS.BOLD,
    fontSize: 18,
  },
  overviewText: {
    color: COLORS.LIGHT_GRAY,
    paddingVertical: 5,
    fontFamily: FONTS.BOLD,
    fontSize: 13,
    textAlign: "justify",
  },
  castTitle: {
    marginLeft: 20,
    color: COLORS.BLACK,
    fontFamily: FONTS.BOLD,
    fontSize: 18,
  },
  castSubMenuContainer: {
    marginLeft: 20,
    flexDirection: "row",
    marginVertical: 5,
  },
  castSubMenuText: {
    marginRight: 10,
    color: COLORS.BLACK,
    fontFamily: FONTS.BOLD,
    fontSize: 13,
  },
  extraListTitle: {
    marginLeft: 20,
    color: COLORS.BLACK,
    fontFamily: FONTS.BOLD,
    fontSize: 18,
    marginVertical: 8,
  },
  bookBtn: {
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 25,
    marginTop: 15,
  },
  bottomSheetContainer: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    flex: 1,
  },
});

export default MovieScreen;
