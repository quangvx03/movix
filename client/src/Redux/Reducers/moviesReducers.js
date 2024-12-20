import * as moviesConstants from "../Constants/moviesConstants";

// GET ALL MOVIES
export const moviesListReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case moviesConstants.MOVIE_LIST_REQUEST:
      return { isLoading: true };
    case moviesConstants.MOVIE_LIST_SUCCESS:
      return {
        isLoading: false,
        movies: action.payload.movies,
        page: action.payload.page,
        pages: action.payload.pages,
        totalMovies: action.payload.totalMovies,
      };
    case moviesConstants.MOVIE_LIST_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// GET RANDOM MOVIES
export const moviesRandomReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case moviesConstants.MOVIE_RANDOM_REQUEST:
      return { isLoading: true };
    case moviesConstants.MOVIE_RANDOM_SUCCESS:
      return { isLoading: false, movies: action.payload };
    case moviesConstants.MOVIE_RANDOM_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// GET MOVIE BY ID
export const movieDetailsReducer = (state = { movie: {} }, action) => {
  switch (action.type) {
    case moviesConstants.MOVIE_DETAILS_REQUEST:
      return { isLoading: true };
    case moviesConstants.MOVIE_DETAILS_SUCCESS:
      return { isLoading: false, movie: action.payload };
    case moviesConstants.MOVIE_DETAILS_FAIL:
      return { isLoading: false, isError: action.payload };
    case moviesConstants.MOVIE_DETAILS_RESET:
      return { movie: {} };
    default:
      return state;
  }
};

// GET TOP RATED MOVIES
export const moviesTopRatedReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case moviesConstants.MOVIE_TOP_RATED_REQUEST:
      return { isLoading: true };
    case moviesConstants.MOVIE_TOP_RATED_SUCCESS:
      return { isLoading: false, movies: action.payload };
    case moviesConstants.MOVIE_TOP_RATED_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// CREATE REVIEW
export const createReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case moviesConstants.CREATE_REVIEW_REQUEST:
      return { isLoading: true };
    case moviesConstants.CREATE_REVIEW_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case moviesConstants.CREATE_REVIEW_FAIL:
      return { isLoading: false, isError: action.payload };
    case moviesConstants.CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

// DELETE MOVIE
export const deleteMovieReducer = (state = {}, action) => {
  switch (action.type) {
    case moviesConstants.DELETE_MOVIE_REQUEST:
      return { isLoading: true };
    case moviesConstants.DELETE_MOVIE_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case moviesConstants.DELETE_MOVIE_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// DELETE ALL MOVIES
export const deleteAllMoviesReducer = (state = {}, action) => {
  switch (action.type) {
    case moviesConstants.DELETE_ALL_MOVIES_REQUEST:
      return { isLoading: true };
    case moviesConstants.DELETE_ALL_MOVIES_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case moviesConstants.DELETE_ALL_MOVIES_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// CREATE MOVIE
export const createMovieReducer = (state = {}, action) => {
  switch (action.type) {
    case moviesConstants.CREATE_MOVIE_REQUEST:
      return { isLoading: true };
    case moviesConstants.CREATE_MOVIE_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case moviesConstants.CREATE_MOVIE_FAIL:
      return { isLoading: false, isError: action.payload };
    case moviesConstants.CREATE_MOVIE_RESET:
      return {};
    default:
      return state;
  }
};

// CASTS
export const castsReducer = (state = { casts: [] }, action) => {
  switch (action.type) {
    case moviesConstants.ADD_CAST:
      return { casts: [...state.casts, action.payload] };
    case moviesConstants.EDIT_CAST:
      const updateCasts = state.casts.map((cast) =>
        cast._id === action.payload._id ? action.payload : cast
      );
      return {
        casts: updateCasts,
      };
    case moviesConstants.DELETE_CAST:
      return {
        ...state,
        casts: state.casts.filter((cast) => cast.id !== action.payload),
      };
    case moviesConstants.RESET_CAST:
      return { casts: [] };
    default:
      return state;
  }
};

// UPDATE MOVIE
export const updateMovieReducer = (state = {}, action) => {
  switch (action.type) {
    case moviesConstants.UPDATE_MOVIE_REQUEST:
      return { isLoading: true };
    case moviesConstants.UPDATE_MOVIE_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case moviesConstants.UPDATE_MOVIE_FAIL:
      return { isLoading: false, isError: action.payload };
    case moviesConstants.UPDATE_MOVIE_RESET:
      return {};
    default:
      return state;
  }
};
