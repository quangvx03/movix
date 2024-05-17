import { MoviesData } from "../Data/MovieData.js";
import Movie from "../Models/MoviesModel.js";
import asyncHandler from "express-async-handler";

// PUBLIC CONTROLLER
// @desc import movies
// @route POST /api/movies/import
// @access Public

const importMovies = asyncHandler(async (req, res) => {
  // first make sure our Movies table is empty by delete all documents
  await Movie.deleteMany({});
  // then insert all movies from MoviesData
  const movies = await Movie.insertMany(MoviesData);
  res.status(201).json({ movies });
});

// @desc get all movies
// @route GET /api/movies
// @access Public

const getMovies = asyncHandler(async (req, res) => {
  try {
    // filter movies by category, time, language, rate, year and search
    const { category, time, language, rate, year, search } = req.query;
    let query = {
      ...(category && { category }),
      ...(time && { time }),
      ...(language && { language }),
      ...(rate && { rate }),
      ...(year && { year }),
      ...(search && { name: { $regex: search, $options: "i" } }),
    };

    // Kiểm tra nếu rate không rỗng thì thêm điều kiện lọc theo khoảng rate.
    if (rate) {
      const rateValue = parseFloat(rate);
      query.rate = { $gte: rateValue, $lte: rateValue + 1 };
    }

    // load more movies functionality
    const page = Number(req.query.pageNumber) || 1; // if pageNumber is not provided in query set it to 1
    const limit = 12; // 2 movies per page
    const skip = (page - 1) * limit; // skip 2 movies per page

    // find movies by query, skip and limit
    const movies = await Movie.find(query)
      // .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // get total number of movies
    const count = await Movie.countDocuments(query);

    // send response with movies and total number of movies
    res.json({
      movies,
      page,
      pages: Math.ceil(count / limit), // total number of pages
      totalMovies: count, // total number of movies
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc get movie by id
// @route GET /api/movies/:id
// @access Public

const getMovieById = asyncHandler(async (req, res) => {
  try {
    // find movie by id in DB
    const movie = await Movie.findById(req.params.id);
    // if the movie if found send it in response
    if (movie) {
      res.json(movie);
    }
    // if the movie is not found send 404 error
    else {
      res.status(404);
      throw new Error("Không tìm thấy phim");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc get top rated movies
// @route GET /api/movies/rated/top
// @access Public

const getTopRatedMovies = asyncHandler(async (req, res) => {
  try {
    // find top rated movies
    const movies = await Movie.find({ rate: { $gte: 4.5, $lte: 5 } }).sort({
      rate: -1,
    });
    // send top rated movies to the client
    res.json(movies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc get random movies
// @route GET /api/movies/random
// @access Public

const getRandomMovies = asyncHandler(async (req, res) => {
  try {
    // find random movies
    const movies = await Movie.aggregate([{ $sample: { size: 12 } }]);
    // send random movies to the client
    res.json(movies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PRIVATE CONTROLLER

// @desc create movie review
// @route POST /api/movies/:id/reviews
// @access Private

const createMovieReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  try {
    // find movie by id in DB
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      // check if the user already reviewed the movie
      const alreadyReviewed = movie.reviews.find(
        (r) => r.userId.toString() === req.user._id.toString()
      );
      // if the user already reviewed the movie send 400 error
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Bạn đã đánh giá phim này");
      }
      // else create new review
      const review = {
        userName: req.user.name,
        userId: req.user._id,
        userImage: req.user.image,
        rating: Number(rating),
        comment,
      };
      // push the new review to the reviews array
      movie.reviews.push(review);
      // increase the number of reviews
      movie.numberOfReviews = movie.reviews.length;

      // calculate the new rating
      movie.rate =
        movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
        movie.reviews.length;

      // save the movie in DB
      await movie.save();
      // send the new movie to client
      res.status(201).json({
        message: "Đánh giá đã được thêm",
      });
    } else {
      res.status(404);
      throw new Error("Không tìm thấy phim");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ADMIN CONTROLLER

// @desc update movie
// @route PUT /api/movies/:id
// @access Private/Admin

const updateMovie = asyncHandler(async (req, res) => {
  try {
    // get data from request body
    const {
      name,
      desc,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      time,
      language,
      year,
      video,
      casts,
    } = req.body;

    // find movie by id in DB
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      // update movie data
      movie.name = name || movie.name;
      movie.desc = desc || movie.desc;
      movie.image = image || movie.image;
      movie.titleImage = titleImage || movie.titleImage;
      movie.rate = rate || movie.rate;
      movie.numberOfReviews = numberOfReviews || movie.numberOfReviews;
      movie.category = category || movie.category;
      movie.time = time || movie.time;
      movie.language = language || movie.language;
      movie.year = year || movie.year;
      movie.video = video || movie.video;
      movie.casts = casts || movie.casts;

      // save the updated movie in DB

      const updatedMovie = await movie.save();
      // send the updated movie to client
      res.status(201).json(updatedMovie);
    } else {
      res.status(404);
      throw new Error("Không tìm thấy phim");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc delete movie
// @route DELETE /api/movies/:id
// @access Private/Admin

const deleteMovie = asyncHandler(async (req, res) => {
  try {
    // tìm phim theo id trong DB
    const movie = await Movie.findById(req.params.id);
    // nếu tìm thấy phim thì xóa phim
    if (movie) {
      await movie.deleteOne();
      res.json({ message: "Phim đã được xóa" });
    }
    // nếu không tìm thấy phim thì trả về lỗi 404
    else {
      res.status(404);
      throw new Error("Không tìm thấy phim");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc delete all movies
// @route DELETE /api/movies
// @access Private/Admin

const deleteAllMovies = asyncHandler(async (req, res) => {
  try {
    // delete all movies
    await Movie.deleteMany({});
    res.json({ message: "Tất cả phim đã được xóa" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc create movie
// @route POST /api/movies
// @access Private/Admin

const createMovie = asyncHandler(async (req, res) => {
  try {
    // get data from request body
    const {
      name,
      desc,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      time,
      language,
      year,
      video,
      casts,
    } = req.body;

    // create new movie
    const movie = new Movie({
      name,
      desc,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      time,
      language,
      year,
      video,
      casts,
      userId: req.user._id,
    });

    // save the new movie in DB
    if (movie) {
      const createdMovie = await movie.save();
      res.status(201).json(createdMovie);
    } else {
      res.status(400);
      throw new Error("Dữ liệu không hợp lệ");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export {
  importMovies,
  getMovies,
  getMovieById,
  getTopRatedMovies,
  getRandomMovies,
  createMovieReview,
  updateMovie,
  deleteMovie,
  deleteAllMovies,
  createMovie,
};
