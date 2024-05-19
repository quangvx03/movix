import {
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
} from "./MovieController"; // Import hàm cần test
import Movie from "../Models/MoviesModel"; // Import model của Movies
import { MoviesData } from "../Data/MovieData"; // Import dữ liệu movies

jest.mock("../Models/MoviesModel"); // Mock MovieModel

describe("importMovies", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Xóa tất cả các mock sau mỗi test case
  });

  // Test cho hàm importMovies
  test("importMovies chèn dữ liệu movies vào cơ sở dữ liệu và trả về danh sách movies đã chèn", async () => {
    // Giả mạo hành vi của MovieModel.deleteMany và MovieModel.insertMany
    Movie.deleteMany.mockResolvedValue({ n: 0 });
    Movie.insertMany.mockResolvedValue(MoviesData);

    const req = {}; // Giả mạo request
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }; // Giả mạo response

    await importMovies(req, res); // Gọi hàm importMovies

    // Kiểm tra xem MovieModel.deleteMany và MovieModel.insertMany đã được gọi đúng cách
    expect(Movie.deleteMany).toHaveBeenCalledTimes(1);
    expect(Movie.insertMany).toHaveBeenCalledWith(MoviesData);

    // Kiểm tra xem response được trả về có đúng không
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ movies: MoviesData });
  });

  // Test cho hàm getMovies

  // Test cho hàm getMovieById
  test("getMovieById trả về phim khi tìm thấy", async () => {
    const mockMovie = {
      _id: "123",
      title: "Test Movie",
      category: "Action",
      rating: 8,
      year: 2021,
    };
    // Mock Movie.findById để trả về phim mock
    Movie.findById.mockResolvedValue(mockMovie);

    const req = {
      params: { id: "123" }, // Giả mạo params với id phù hợp
    };
    const res = {
      json: jest.fn(),
    };

    await getMovieById(req, res);

    expect(Movie.findById).toHaveBeenCalledWith("123");
    expect(res.json).toHaveBeenCalledWith(mockMovie);
  });
  test("getMovieById trả về lỗi 404 khi không tìm thấy phim", async () => {
    // Mock Movie.findById để trả về null (không tìm thấy phim)
    Movie.findById.mockResolvedValue(null);

    const req = {
      params: { id: "123" }, // Giả mạo params với id phù hợp
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getMovieById(req, res);

    expect(Movie.findById).toHaveBeenCalledWith("123");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Không tìm thấy phim" });
  });

  test("getMovieById trả về lỗi 400 khi có lỗi xảy ra", async () => {
    const errorMessage = "Lỗi xảy ra khi tìm kiếm phim";
    // Mock Movie.findById để ném ra một lỗi
    Movie.findById.mockRejectedValue(new Error(errorMessage));

    const req = {
      params: { id: "123" }, // Giả mạo params với id phù hợp
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getMovieById(req, res);

    expect(Movie.findById).toHaveBeenCalledWith("123");
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });

  // Test cho hàm getTopRatedMovies

  // Test cho hàm getRandomMovies
  test("getRandomMovies trả về danh sách phim ngẫu nhiên", async () => {
    // Mock danh sách phim ngẫu nhiên
    const mockMovies = [
      { _id: "1", title: "Movie 1", category: "Action", rating: 7, year: 2020 },
      { _id: "2", title: "Movie 2", category: "Comedy", rating: 8, year: 2019 },
      // Thêm các phần tử khác tùy theo nhu cầu test
    ];

    // Mock phương thức aggregate của MovieModel để trả về danh sách phim ngẫu nhiên
    Movie.aggregate.mockResolvedValue(mockMovies);

    const req = {}; // Giả mạo request
    const res = {
      json: jest.fn(), // Giả mạo hàm json của response
    };

    await getRandomMovies(req, res); // Gọi hàm getRandomMovies

    // Kiểm tra xem MovieModel.aggregate đã được gọi đúng cách
    expect(Movie.aggregate).toHaveBeenCalledWith([{ $sample: { size: 12 } }]);

    // Kiểm tra xem response được trả về có đúng không
    expect(res.json).toHaveBeenCalledWith(mockMovies);
  });
  test("getRandomMovies trả về lỗi 400 khi có lỗi xảy ra", async () => {
    const errorMessage = "Lỗi xảy ra khi lấy danh sách phim ngẫu nhiên";
    // Mock phương thức aggregate của MovieModel để ném ra một lỗi
    Movie.aggregate.mockRejectedValue(new Error(errorMessage));

    const req = {}; // Giả mạo request
    const res = {
      status: jest.fn().mockReturnThis(), // Giả mạo hàm status của response
      json: jest.fn(), // Giả mạo hàm json của response
    };

    await getRandomMovies(req, res); // Gọi hàm getRandomMovies

    // Kiểm tra xem phương thức status và json của response được gọi đúng cách khi có lỗi xảy ra
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });

  // Test cho hàm createMovieReview
  test("Tạo đánh giá mới cho phim và trả về status code 201", async () => {
    const req = {
      params: { id: "movieId" }, // Giả mạo id của phim
      body: { rating: 8, comment: "Good movie" }, // Giả mạo đánh giá từ người dùng
      user: { _id: "userId", name: "User", image: "user.jpg" }, // Giả mạo thông tin người dùng
    };
    const res = {
      status: jest.fn().mockReturnThis(), // Giả mạo hàm status của response
      json: jest.fn(), // Giả mạo hàm json của response
    };

    // Mock Movie.findById để trả về một phim tồn tại
    Movie.findById.mockResolvedValueOnce({
      reviews: [], // Không có đánh giá nào cho phim này trước đó
      save: jest.fn(), // Mock phương thức save của model để không làm gì cả
    });

    await createMovieReview(req, res);

    // Kiểm tra xem status code và thông báo đã đúng chưa
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: "Đánh giá đã được thêm" });
  });

  // Test cho hàm updateMovie
  test("Cập nhật thông tin phim thành công và trả về status code 201", async () => {
    const req = {
      params: { id: "movieId" }, // Giả mạo id của phim
      body: { name: "New Name" }, // Giả mạo thông tin mới của phim
    };
    const res = {
      status: jest.fn().mockReturnThis(), // Giả mạo hàm status của response
      json: jest.fn(), // Giả mạo hàm json của response
    };

    // Mock Movie.findById để trả về một phim tồn tại
    Movie.findById.mockResolvedValueOnce({
      save: jest
        .fn()
        .mockResolvedValueOnce({ _id: "movieId", name: "New Name" }), // Mock phương thức save của model để trả về thông tin của phim đã cập nhật
    });

    await updateMovie(req, res);

    // Kiểm tra xem status code và thông tin của phim đã được cập nhật đúng chưa
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ _id: "movieId", name: "New Name" });
  });

  // Test cho hàm deleteMovie
  test("Xóa phim thành công và trả về status code 200", async () => {
    const req = {
      params: { id: "movieId" }, // Giả mạo id của phim
    };
    const res = {
      json: jest.fn(), // Giả mạo hàm json của response
    };

    // Mock Movie.findById để trả về một phim tồn tại
    Movie.findById.mockResolvedValueOnce({
      deleteOne: jest.fn(), // Mock phương thức deleteOne của model để không làm gì cả
    });

    await deleteMovie(req, res);

    // Kiểm tra xem hàm deleteOne của model đã được gọi đúng cách
    expect(Movie.findById).toHaveBeenCalledWith("movieId");
    expect(res.json).toHaveBeenCalledWith({ message: "Phim đã được xóa" });
  });

  test("Trả về status code 404 khi không tìm thấy phim", async () => {
    const req = {
      params: { id: "movieId" }, // Giả mạo id của phim
    };
    const res = {
      status: jest.fn().mockReturnThis(), // Giả mạo hàm status của response
      json: jest.fn(), // Giả mạo hàm json của response
    };

    // Mock Movie.findById để không tìm thấy phim
    Movie.findById.mockResolvedValueOnce(null);

    await deleteMovie(req, res);

    // Kiểm tra xem hàm status và json của response đã được gọi đúng cách
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Không tìm thấy phim" });
  });

  // Test cho hàm deleteAllMovies
  test("Xóa tất cả phim thành công và trả về status code 200", async () => {
    const req = {}; // Không cần giả mạo request vì không cần truyền tham số vào hàm deleteAllMovies
    const res = {
      json: jest.fn(), // Giả mạo hàm json của response
    };

    // Mock Movie.deleteMany để không làm gì cả
    Movie.deleteMany.mockResolvedValueOnce();

    await deleteAllMovies(req, res);

    // Kiểm tra xem hàm deleteMany của model đã được gọi đúng cách
    expect(Movie.deleteMany).toHaveBeenCalledWith({});
    expect(res.json).toHaveBeenCalledWith({
      message: "Tất cả phim đã được xóa",
    });
  });

  // Test cho hàm createMovie
  test("Tạo phim mới thành công và trả về status code 201", async () => {
    const req = {
      body: {
        // Giả mạo thông tin mới của phim từ request body
        name: "New Movie",
        desc: "Description",
        director: "Director",
        image: "image.jpg",
        titleImage: "titleImage.jpg",
        rate: 8,
        numberOfReviews: 10,
        category: "Action",
        time: 120,
        language: "English",
        year: 2021,
        video: "video.mp4",
        casts: ["Actor 1", "Actor 2"],
      },
      user: { _id: "userId" }, // Giả mạo thông tin người dùng từ request
    };
    const res = {
      status: jest.fn().mockReturnThis(), // Giả mạo hàm status của response
      json: jest.fn(), // Giả mạo hàm json của response
    };

    // Mock phương thức save của model để trả về đối tượng phim đã được tạo
    Movie.prototype.save.mockResolvedValueOnce({
      _id: "movieId",
      ...req.body,
      userId: "userId",
    });

    await createMovie(req, res);

    // Kiểm tra xem status code và thông tin của phim đã được tạo đúng chưa
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      _id: "movieId",
      ...req.body,
      userId: "userId",
    });
  });
});
