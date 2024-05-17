import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { favoriteMovieAction } from "../Redux/Actions/userActions";

// check if movie is added to favorite
const IfMovieFavorited = (movie) => {
  const { favoritedMovies } = useSelector(
    (state) => state.userGetFavoriteMovies
  );
  return favoritedMovies?.find(
    (favoritedMovie) => favoritedMovie?._id === movie?._id
  );
};

// favorite movie functionality
const FavoriteMovie = (movie, dispatch, userInfo) => {
  return !userInfo
    ? toast.error("Bạn cần đăng nhập để thêm vào yêu thích")
    : dispatch(favoriteMovieAction({ movieId: movie._id }));
};

export { IfMovieFavorited, FavoriteMovie };
