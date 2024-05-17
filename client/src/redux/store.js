import { combineReducers, configureStore } from "@reduxjs/toolkit";
import * as User from "./Reducers/userReducers";
import * as Category from "./Reducers/categoriesReducers";
import * as Movie from "./Reducers/moviesReducers";

const rootReducer = combineReducers({
  // user reducers
  userLogin: User.userLoginReducer,
  userRegister: User.userRegisterReducer,
  userUpdateProfile: User.userUpdateProfileReducer,
  userDeleteProfile: User.userDeleteProfileReducer,
  userChangePassword: User.userChangePasswordReducer,
  userGetFavoriteMovies: User.userGetFavoriteMoviesReducer,
  userDeleteFavoriteMovies: User.userDeleteFavoriteMoviesReducer,
  adminGetAllUsers: User.adminGetAllUsersReducer,
  adminDeleteUser: User.adminDeleteUserReducer,
  userFavoriteMovie: User.userFavoriteMovieReducer,

  // category reducers
  categoryGetAll: Category.getAllCategoriesReducer,
  categoryCreate: Category.createCategoryReducer,
  categoryUpdate: Category.updateCategoryReducer,
  categoryDelete: Category.deleteCategoryReducer,

  // movie reducers
  movieGetAll: Movie.moviesListReducer,
  movieGetRandom: Movie.moviesRandomReducer,
  movieGetById: Movie.movieDetailsReducer,
  movieGetTopRated: Movie.moviesTopRatedReducer,
  createReview: Movie.createReviewReducer,
  movieDelete: Movie.deleteMovieReducer,
  movieDeleteAll: Movie.deleteAllMoviesReducer,
});

// get userInfo from localStorage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// initialState
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});
