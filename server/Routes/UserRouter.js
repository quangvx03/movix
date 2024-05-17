import express from "express";
import {
  addFavoritedMovie,
  changeUserPassword,
  deleteFavoritedMovies,
  deleteUser,
  deleteUserProfile,
  getFavoritedMovies,
  getUsers,
  loginUser,
  registerUser,
  updateUserProfile,
} from "../Controllers/UserController.js";
import { protect, admin } from "../middlewares/Auth.js";

const router = express.Router();

// PUBLIC ROUTES
router.post("/", registerUser);
router.post("/login", loginUser);

// PRIVATE ROUTES
router.put("/", protect, updateUserProfile);
router.delete("/", protect, deleteUserProfile);
router.put("/password", protect, changeUserPassword);
router.get("/favorites", protect, getFavoritedMovies);
router.post("/favorites", protect, addFavoritedMovie);
router.delete("/favorites", protect, deleteFavoritedMovies);

// ADMIN ROUTES
router.get("/", protect, admin, getUsers);
router.delete("/:id", protect, admin, deleteUser);

export default router;
