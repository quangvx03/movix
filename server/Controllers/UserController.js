import asyncHandler from "express-async-handler";
import User from "../Models/UserModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middlewares/Auth.js";

// @desc Register a new user
// @route POST /api/users/
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, image } = req.body;
  try {
    const userExists = await User.findOne({ email });
    // check if user exists
    if (userExists) {
      res.status(400);
      throw new Error("Người dùng đã tồn tại");
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user in DB
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      image,
    });

    // if user created successfully send user data and token to client
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Dữ liệu người dùng không hợp lệ");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc Login user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    // find user in DB
    const user = await User.findOne({ email });
    // if user exists compare password with hashed password then send user data and token to client
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
      // if user does not exist or password is incorrect send error message
    } else {
      res.status(400);
      throw new Error("Email hoặc mật khẩu không đúng");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PRIVATE CONTROLLER

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, password, image } = req.body;
  try {
    // find user in DB
    const user = await User.findById(req.user._id);
    // if user exists update user data and save it in DB
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.image = image || user.image;

      const updatedUser = await user.save();
      // send updated user data and token to client
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.image,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    }
    // else send error message
    else {
      res.status(404);
      throw new Error("Người dùng không tồn tại");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc Delete user profile
// @route DELETE /api/users
// @access Private
const deleteUserProfile = asyncHandler(async (req, res) => {
  try {
    // find user in DB
    const user = await User.findById(req.user._id);
    // if user exists delete user from DB
    if (user) {
      // if user is admin throw error message
      if (user.isAdmin) {
        res.status(400);
        throw new Error("Không thể xóa tài khoản admin");
      }
      // else delete user from DB
      await user.deleteOne();
      res.json({ message: "Tài khoản đã được xóa" });
    }
    // else send error message
    else {
      res.status(404);
      throw new Error("Người dùng không tồn tại");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc Change user password
// @route PUT /api/users/password
// @access Private
const changeUserPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    // find user in DB
    const user = await User.findById(req.user._id);
    // if user exists compare old password with hashed password then update password and save it in DB
    if (user && (await bcrypt.compare(oldPassword, user.password))) {
      // hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
      await user.save();
      res.json({ message: "Mật khẩu đã được thay đổi" });
    }
    // else send error message
    else {
      res.status(401);
      throw new Error("Mật khẩu cũ không đúng");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc Get all liked movies
// @route GET /api/users/favorites
// @access Private
const getLikedMovies = asyncHandler(async (req, res) => {
  try {
    // find user in DB
    const user = await User.findById(req.user._id).populate("likedMovies");
    // if user exists send liked movies to client
    if (user) {
      res.json(user.likedMovies);
    }
    // else send error message
    else {
      res.status(404);
      throw new Error("Người dùng không tồn tại");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc Add movie to liked movies
// @route PUT /api/users/favorites
// @access Private
const addLikedMovie = asyncHandler(async (req, res) => {
  const { movieId } = req.body;
  try {
    // find user in DB
    const user = await User.findById(req.user._id);
    // if user exists add movie to liked movies and save it in DB
    if (user) {
      // check if movie already liked
      // if movie already liked send error message
      if (user.likedMovies.includes(movieId)) {
        res.status(400);
        throw new Error("Phim đã được thích");
      }
      // else add movie to liked movies and save it in DB
      user.likedMovies.push(movieId);
      await user.save();
      res.json(user.likedMovies);
    }
    // else send error message
    else {
      res.status(404);
      throw new Error("Phim không tồn tại");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc Delete all liked movies
// @route DELETE /api/users/favorites
// @access Private
const deleteLikedMovies = asyncHandler(async (req, res) => {
  try {
    // find user in DB
    const user = await User.findById(req.user._id);
    // if user exists delete all liked movies and save it in DB
    if (user) {
      user.likedMovies = [];
      await user.save();
      res.json({ message: "Tất cả phim đã được xóa khỏi danh sách yêu thích" });
    }
    // else send error message
    else {
      res.status(404);
      throw new Error("Người dùng không tồn tại");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ADMIN CONTROLLER

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  try {
    // find all users in DB
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  try {
    // find user in DB
    const user = await User.findById(req.params.id);
    // if user exists delete user from DB
    if (user) {
      // if user is admin throw error message
      if (user.isAdmin) {
        res.status(400);
        throw new Error("Không thể xóa tài khoản admin");
      }
      // else delete user from DB
      await user.deleteOne();
      res.json({ message: "Người dùng đã được xóa" });
    }
    // else send error message
    else {
      res.status(404);
      throw new Error("Người dùng không tồn tại");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export {
  registerUser,
  loginUser,
  updateUserProfile,
  deleteUserProfile,
  changeUserPassword,
  getLikedMovies,
  addLikedMovie,
  deleteLikedMovies,
  getUsers,
  deleteUser,
};
