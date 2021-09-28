const config = require("../../package.json");

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
const YOUTUBE_BASE_URL = "https://www.youtube.com/watch";

const TMDB_API_KEY = "161747f61d66f3623df2d30c1c1b4f8e";

// "2c260a918eb9a932643bef6b0356324892ce745c"

const ENDPOINTS = {
  NOW_PLAYING_MOVIES: "/movie/now_playing",
  UPCOMING_MOVIES: "/movie/upcoming",
  GENRES: "/genre/movie/list",
  MOVIE: "/movie",
  SEARCH: "search/movie",
  REQUEST_TOKEN: "/authentication/token/new",
};

const APPEND_TO_RESPONSE = {
  VIDEOS: "videos",
  CREDITS: "credits",
  RECOMMENDATIONS: "recommendations",
  SIMILAR: "similar",
  REVIEWS: "reviews",
};

export {
  TMDB_BASE_URL,
  TMDB_API_KEY,
  TMDB_IMAGE_BASE_URL,
  ENDPOINTS,
  APPEND_TO_RESPONSE,
  YOUTUBE_BASE_URL,
};
