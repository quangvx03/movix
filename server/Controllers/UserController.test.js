import bcrypt from "bcryptjs";
import {
  registerUser,
  loginUser,
  updateUserProfile,
  deleteUserProfile,
  changeUserPassword,
  getFavoritedMovies,
  addFavoritedMovie,
  deleteFavoritedMovies,
  getUsers,
  deleteUser,
} from "./UserController";
import User from "../Models/UserModel";
import { generateToken } from "../middlewares/Auth";

jest.mock("../Models/UserModel");
jest.mock("../middlewares/Auth");

describe("UsersController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test cho hàm registerUser
  test("registerUser tạo ra một người dùng mới", async () => {
    const mockUser = {
      _id: "123",
      name: "Người Dùng Thử Nghiệm",
      email: "test@example.com",
      image: "test.jpg",
      isAdmin: false,
    };
    User.findOne.mockResolvedValue(null);
    bcrypt.genSalt = jest.fn().mockReturnValue("salt");
    bcrypt.hash = jest.fn().mockResolvedValue("hashedPassword");
    User.create.mockResolvedValue(mockUser);

    // Giả mạo hàm generateToken
    generateToken.mockReturnValue("TokenMẫu");

    const req = {
      body: {
        name: "Người Dùng Thử Nghiệm",
        email: "test@example.com",
        password: "password",
        image: "test.jpg",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      _id: mockUser._id,
      name: mockUser.name,
      email: mockUser.email,
      image: mockUser.image,
      isAdmin: mockUser.isAdmin,
      token: "TokenMẫu", // Xác nhận giá trị token
    });
  });

  // Test cho hàm loginUser
  test("loginUser đăng nhập người dùng", async () => {
    const mockUser = {
      _id: "123",
      name: "Test User",
      email: "test@example.com",
      image: "test.jpg",
      isAdmin: false,
      password: "hashedPassword",
    };
    User.findOne.mockResolvedValue(mockUser);

    // Sử dụng jest.fn() để tạo hàm mock cho bcrypt.compare
    const mockCompare = jest.fn().mockResolvedValue(true);
    bcrypt.compare = mockCompare;

    // Mock generateToken function
    generateToken.mockReturnValue("mockToken");

    const req = {
      body: {
        email: "test@example.com",
        password: "password",
      },
    };
    const res = {
      json: jest.fn(),
    };

    await loginUser(req, res);

    expect(mockCompare).toHaveBeenCalledWith("password", "hashedPassword"); // Kiểm tra xem hàm compare được gọi với đúng arguments
    expect(res.json).toHaveBeenCalledWith({
      _id: mockUser._id,
      name: mockUser.name,
      email: mockUser.email,
      image: mockUser.image,
      isAdmin: mockUser.isAdmin,
      token: "mockToken", // Xác nhận giá trị token
    });
  });

  // Test cho hàm getUsers
  test("getUsers lấy danh sách tất cả người dùng", async () => {
    const mockUsers = [
      { _id: "123", name: "User 1", email: "user1@example.com" },
      { _id: "456", name: "User 2", email: "user2@example.com" },
    ];
    User.find.mockResolvedValue(mockUsers);

    const req = {
      user: { _id: "123", isAdmin: true }, // Giả mạo req.user là admin
    };
    const res = {
      json: jest.fn(),
    };

    await getUsers(req, res);

    expect(User.find).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockUsers);
  });

  // Test cho hàm updateUserProfile
  test("updateUserProfile cập nhật thông tin hồ sơ người dùng", async () => {
    const mockUser = {
      _id: "123",
      name: "Test User",
      email: "test@example.com",
      image: "test.jpg",
      isAdmin: false,
      save: jest.fn().mockResolvedValue({
        _id: "123",
        name: "Updated Name",
        email: "updated@example.com",
        image: "updated.jpg",
        isAdmin: false,
      }), // Mock save method
    };
    User.findById.mockResolvedValue(mockUser); // Mock User.findById
    generateToken.mockReturnValue("mockToken");

    const updatedUserInfo = {
      name: "Updated Name",
      email: "updated@example.com",
      image: "updated.jpg",
    };

    const req = {
      user: { _id: "123" }, // Giả mạo req.user có _id tương ứng
      body: updatedUserInfo, // Thông tin cập nhật từ request body
    };

    const res = {
      status: jest.fn().mockReturnThis(), // Mock status() để trả về chính nó
      json: jest.fn(),
    };

    await updateUserProfile(req, res);

    expect(User.findById).toHaveBeenCalledWith("123"); // Kiểm tra xem hàm findById được gọi với đúng _id
    expect(mockUser.save).toHaveBeenCalled(); // Kiểm tra xem hàm save đã được gọi
    expect(res.status).not.toHaveBeenCalledWith(404); // Đảm bảo status 404 không được gọi
    expect(res.json).toHaveBeenCalledWith({
      _id: "123",
      name: "Updated Name",
      email: "updated@example.com",
      image: "updated.jpg",
      isAdmin: false,
      token: "mockToken",
    }); // Kiểm tra xem kết quả trả về là thông tin hồ sơ người dùng đã được cập nhật
  });

  test("updateUserProfile trả về 404 nếu không tìm thấy người dùng", async () => {
    User.findById.mockResolvedValue(null); // Mock User.findById trả về null nếu không tìm thấy người dùng

    const req = {
      user: { _id: "123" }, // Giả mạo req.user có _id tương ứng
      body: {
        name: "Updated Name",
        email: "updated@example.com",
        image: "updated.jpg",
      }, // Thông tin cập nhật từ request body
    };

    const res = {
      status: jest.fn().mockReturnThis(), // Mock status() để trả về chính nó
      json: jest.fn(),
    };

    await updateUserProfile(req, res);

    expect(User.findById).toHaveBeenCalledWith("123"); // Kiểm tra xem hàm findById được gọi với đúng _id
    expect(res.status).toHaveBeenCalledWith(404); // Kiểm tra xem status code được trả về là 404
    expect(res.json).toHaveBeenCalledWith({
      error: "Người dùng không tồn tại",
    }); // Cập nhật thông báo lỗi đồng bộ với controller
  });

  test("updateUserProfile trả về 400 nếu có lỗi trong quá trình cập nhật", async () => {
    const mockUser = {
      _id: "123",
      name: "Test User",
      email: "test@example.com",
      image: "test.jpg",
      isAdmin: false,
      save: jest.fn().mockRejectedValue(new Error("Update error")), // Mock save method trả về lỗi
    };
    User.findById.mockResolvedValue(mockUser); // Mock User.findById

    const req = {
      user: { _id: "123" }, // Giả mạo req.user có _id tương ứng
      body: {
        name: "Updated Name",
        email: "updated@example.com",
        image: "updated.jpg",
      }, // Thông tin cập nhật từ request body
    };

    const res = {
      status: jest.fn().mockReturnThis(), // Mock status() để trả về chính nó
      json: jest.fn(),
    };

    await updateUserProfile(req, res);

    expect(User.findById).toHaveBeenCalledWith("123"); // Kiểm tra xem hàm findById được gọi với đúng _id
    expect(mockUser.save).toHaveBeenCalled(); // Kiểm tra xem hàm save đã được gọi
    expect(res.status).toHaveBeenCalledWith(400); // Kiểm tra xem status code được trả về là 400
    expect(res.json).toHaveBeenCalledWith({ error: "Update error" }); // Kiểm tra xem thông báo lỗi có đúng không
  });

  // Test cho hàm deleteUserProfile
  test("deleteUserProfile xóa tài khoản người dùng", async () => {
    const mockUser = {
      _id: "123",
      name: "Test User",
      email: "test@example.com",
      isAdmin: false,
      deleteOne: jest.fn().mockResolvedValue(true),
    };
    User.findById.mockResolvedValue(mockUser);

    const req = {
      user: { _id: "123" },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await deleteUserProfile(req, res);

    expect(User.findById).toHaveBeenCalledWith("123");
    expect(mockUser.deleteOne).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Tài khoản đã được xóa" });
  });

  test("deleteUserProfile trả về 404 nếu không tìm thấy người dùng", async () => {
    User.findById.mockResolvedValue(null);

    const req = {
      user: { _id: "123" },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await deleteUserProfile(req, res);

    expect(User.findById).toHaveBeenCalledWith("123");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "Người dùng không tồn tại",
    });
  });

  test("deleteUserProfile trả về 400 nếu người dùng là admin", async () => {
    const mockUser = {
      _id: "123",
      name: "Admin User",
      email: "admin@example.com",
      isAdmin: true,
      deleteOne: jest.fn(),
    };
    User.findById.mockResolvedValue(mockUser);

    const req = {
      user: { _id: "123" },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await deleteUserProfile(req, res);

    expect(User.findById).toHaveBeenCalledWith("123");
    expect(mockUser.deleteOne).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Không thể xóa tài khoản admin",
    });
  });

  test("deleteUserProfile trả về 400 nếu có lỗi trong quá trình xóa", async () => {
    const mockUser = {
      _id: "123",
      name: "Test User",
      email: "test@example.com",
      isAdmin: false,
      deleteOne: jest.fn().mockRejectedValue(new Error("Delete error")),
    };
    User.findById.mockResolvedValue(mockUser);

    const req = {
      user: { _id: "123" },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await deleteUserProfile(req, res);

    expect(User.findById).toHaveBeenCalledWith("123");
    expect(mockUser.deleteOne).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Delete error" });
  });

  // Test cho hàm changeUserPassword
  test("changeUserPassword thay đổi mật khẩu người dùng", async () => {
    const mockUser = {
      _id: "123",
      password: "hashedOldPassword",
      save: jest.fn().mockResolvedValue(true),
    };
    User.findById.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    bcrypt.genSalt.mockResolvedValue("salt");
    bcrypt.hash.mockResolvedValue("hashedNewPassword");

    const req = {
      user: { _id: "123" },
      body: {
        oldPassword: "oldPassword",
        newPassword: "newPassword",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await changeUserPassword(req, res);

    expect(User.findById).toHaveBeenCalledWith("123");
    expect(bcrypt.compare).toHaveBeenCalledWith(
      "oldPassword",
      "hashedOldPassword"
    );
    expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
    expect(bcrypt.hash).toHaveBeenCalledWith("newPassword", "salt");
    expect(mockUser.password).toEqual("hashedNewPassword");
    expect(mockUser.save).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Mật khẩu đã được thay đổi",
    });
  });

  test("changeUserPassword trả về 401 nếu mật khẩu cũ không đúng", async () => {
    const mockUser = {
      _id: "123",
      password: "hashedOldPassword",
    };
    User.findById.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(false);

    const req = {
      user: { _id: "123" },
      body: {
        oldPassword: "wrongOldPassword",
        newPassword: "newPassword",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await changeUserPassword(req, res);

    expect(User.findById).toHaveBeenCalledWith("123");
    expect(bcrypt.compare).toHaveBeenCalledWith(
      "wrongOldPassword",
      "hashedOldPassword"
    );
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Mật khẩu cũ không đúng" });
  });

  test("changeUserPassword trả về 400 nếu có lỗi trong quá trình thay đổi mật khẩu", async () => {
    const mockUser = {
      _id: "123",
      password: "hashedOldPassword",
      save: jest.fn().mockRejectedValue(new Error("Update error")),
    };
    User.findById.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    bcrypt.genSalt.mockResolvedValue("salt");
    bcrypt.hash.mockResolvedValue("hashedNewPassword");

    const req = {
      user: { _id: "123" },
      body: {
        oldPassword: "oldPassword",
        newPassword: "newPassword",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await changeUserPassword(req, res);

    expect(User.findById).toHaveBeenCalledWith("123");
    expect(bcrypt.compare).toHaveBeenCalledWith(
      "oldPassword",
      "hashedOldPassword"
    );
    expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
    expect(bcrypt.hash).toHaveBeenCalledWith("newPassword", "salt");
    expect(mockUser.password).toEqual("hashedNewPassword");
    expect(mockUser.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Update error" });
  });

  // Test cho hàm getFavoritedMovies
  test("getFavoritedMovies trả về danh sách phim yêu thích của người dùng", async () => {
    const mockFavoritedMovies = [
      { _id: "movie1", title: "Movie 1" },
      { _id: "movie2", title: "Movie 2" },
    ];
    const mockUser = {
      _id: "123",
      favoritedMovies: mockFavoritedMovies,
      populate: jest
        .fn()
        .mockResolvedValue({ favoritedMovies: mockFavoritedMovies }), // Mock populate method
    };
    User.findById.mockImplementation(() => ({
      populate: mockUser.populate,
    }));

    const req = {
      user: { _id: "123" },
    };

    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await getFavoritedMovies(req, res);

    expect(User.findById).toHaveBeenCalledWith("123");
    expect(mockUser.populate).toHaveBeenCalledWith("favoritedMovies"); // Kiểm tra populate được gọi với đúng argument
    expect(res.json).toHaveBeenCalledWith(mockFavoritedMovies);
  });
  test("addFavoritedMovie thêm phim vào danh sách phim yêu thích của người dùng", async () => {
    const mockUser = {
      _id: "123",
      favoritedMovies: [],
      save: jest.fn().mockResolvedValue(true),
    };
    User.findById.mockResolvedValue(mockUser);

    const req = {
      user: { _id: "123" },
      body: { movieId: "movie1" },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await addFavoritedMovie(req, res);

    expect(User.findById).toHaveBeenCalledWith("123");
    expect(mockUser.favoritedMovies).toContain("movie1"); // Kiểm tra xem phim đã được thêm vào danh sách yêu thích của người dùng
    expect(mockUser.save).toHaveBeenCalled(); // Kiểm tra xem hàm save đã được gọi để lưu người dùng với danh sách phim yêu thích mới
    expect(res.json).toHaveBeenCalledWith(mockUser.favoritedMovies);
  });
  test("addFavoritedMovie trả về 400 nếu phim đã được thêm vào danh sách yêu thích của người dùng trước đó", async () => {
    const mockUser = {
      _id: "123",
      favoritedMovies: ["movie1", "movie2"],
    };
    User.findById.mockResolvedValue(mockUser);

    const req = {
      user: { _id: "123" },
      body: { movieId: "movie1" },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await addFavoritedMovie(req, res);

    expect(User.findById).toHaveBeenCalledWith("123");
    expect(res.status).toHaveBeenCalledWith(400); // Kiểm tra xem status code được trả về là 400
    expect(res.json).toHaveBeenCalledWith({ error: "Phim đã được thích" }); // Kiểm tra xem thông báo lỗi có đúng không
  });

  test("addFavoritedMovie trả về 404 nếu người dùng không tồn tại", async () => {
    User.findById.mockResolvedValue(null);

    const req = {
      user: { _id: "123" },
      body: { movieId: "movie1" },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await addFavoritedMovie(req, res);

    expect(User.findById).toHaveBeenCalledWith("123");
    expect(res.status).toHaveBeenCalledWith(404); // Kiểm tra xem status code được trả về là 404
    expect(res.json).toHaveBeenCalledWith({ error: "Phim không tồn tại" }); // Kiểm tra xem thông báo lỗi có đúng không
  });

  test("addFavoritedMovie trả về 400 nếu có lỗi trong quá trình thêm phim vào danh sách yêu thích", async () => {
    const mockUser = {
      _id: "123",
      favoritedMovies: [],
      save: jest.fn().mockRejectedValue(new Error("Save error")),
    };
    User.findById.mockResolvedValue(mockUser);

    const req = {
      user: { _id: "123" },
      body: { movieId: "movie1" },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await addFavoritedMovie(req, res);

    expect(User.findById).toHaveBeenCalledWith("123");
    expect(res.status).toHaveBeenCalledWith(400); // Kiểm tra xem status code được trả về là 400
    expect(res.json).toHaveBeenCalledWith({ error: "Save error" }); // Kiểm tra xem thông báo lỗi có đúng không
  });

  test("deleteFavoritedMovies xóa tất cả phim khỏi danh sách yêu thích của người dùng", async () => {
    const mockUser = {
      _id: "123",
      favoritedMovies: ["movie1", "movie2"],
      save: jest.fn().mockResolvedValue(true),
    };
    User.findById.mockResolvedValue(mockUser);

    const req = {
      user: { _id: "123" },
    };

    const res = {
      json: jest.fn(),
    };

    await deleteFavoritedMovies(req, res);

    expect(User.findById).toHaveBeenCalledWith("123");
    expect(mockUser.favoritedMovies).toHaveLength(0); // Kiểm tra xem tất cả phim đã bị xóa khỏi danh sách yêu thích của người dùng
    expect(mockUser.save).toHaveBeenCalled(); // Kiểm tra xem hàm save đã được gọi để lưu người dùng với danh sách phim yêu thích mới
    expect(res.json).toHaveBeenCalledWith({
      message: "Tất cả phim đã được xóa khỏi danh sách yêu thích",
    });
  });
  test("deleteFavoritedMovies trả về 404 nếu người dùng không tồn tại", async () => {
    User.findById.mockResolvedValue(null);

    const req = {
      user: { _id: "123" },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await deleteFavoritedMovies(req, res);

    expect(User.findById).toHaveBeenCalledWith("123");
    expect(res.status).toHaveBeenCalledWith(404); // Kiểm tra xem status code được trả về là 404
    expect(res.json).toHaveBeenCalledWith({
      error: "Người dùng không tồn tại",
    }); // Kiểm tra xem thông báo lỗi có đúng không
  });

  test("deleteFavoritedMovies trả về 400 nếu có lỗi trong quá trình xóa phim khỏi danh sách yêu thích", async () => {
    const mockUser = {
      _id: "123",
      favoritedMovies: ["movie1", "movie2"],
      save: jest.fn().mockRejectedValue(new Error("Save error")),
    };
    User.findById.mockResolvedValue(mockUser);

    const req = {
      user: { _id: "123" },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await deleteFavoritedMovies(req, res);

    expect(User.findById).toHaveBeenCalledWith("123");
    expect(res.status).toHaveBeenCalledWith(400); // Kiểm tra xem status code được trả về là 400
    expect(res.json).toHaveBeenCalledWith({ error: "Save error" }); // Kiểm tra xem thông báo lỗi có đúng không
  });

  // Test cho hàm deleteUser
  test("deleteUser xóa người dùng thành công", async () => {
    const mockUser = {
      _id: "123",
      isAdmin: false,
      deleteOne: jest.fn().mockResolvedValue(true),
    };
    User.findById.mockResolvedValue(mockUser);

    const req = {
      params: { id: "123" },
    };

    const res = {
      json: jest.fn(),
    };

    await deleteUser(req, res);

    expect(User.findById).toHaveBeenCalledWith("123");
    expect(mockUser.deleteOne).toHaveBeenCalled(); // Kiểm tra xem hàm deleteOne đã được gọi để xóa người dùng
    expect(res.json).toHaveBeenCalledWith({
      message: "Người dùng đã được xóa",
    });
  });

  test("deleteUser trả về 404 nếu người dùng không tồn tại", async () => {
    User.findById.mockResolvedValue(null);

    const req = {
      params: { id: "123" },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await deleteUser(req, res);

    expect(User.findById).toHaveBeenCalledWith("123");
    expect(res.status).toHaveBeenCalledWith(404); // Kiểm tra xem status code được trả về là 404
    expect(res.json).toHaveBeenCalledWith({
      error: "Người dùng không tồn tại",
    }); // Kiểm tra xem thông báo lỗi có đúng không
  });

  test("deleteUser trả về 400 nếu người dùng là admin", async () => {
    const mockUser = {
      _id: "123",
      isAdmin: true,
    };
    User.findById.mockResolvedValue(mockUser);

    const req = {
      params: { id: "123" },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await deleteUser(req, res);

    expect(User.findById).toHaveBeenCalledWith("123");
    expect(res.status).toHaveBeenCalledWith(400); // Kiểm tra xem status code được trả về là 400
    expect(res.json).toHaveBeenCalledWith({
      error: "Không thể xóa tài khoản admin",
    }); // Kiểm tra xem thông báo lỗi có đúng không
  });

  test("deleteUser trả về 400 nếu có lỗi trong quá trình xóa người dùng", async () => {
    const mockUser = {
      _id: "123",
      isAdmin: false,
      deleteOne: jest.fn().mockRejectedValue(new Error("Delete error")),
    };
    User.findById.mockResolvedValue(mockUser);

    const req = {
      params: { id: "123" },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await deleteUser(req, res);

    expect(User.findById).toHaveBeenCalledWith("123");
    expect(mockUser.deleteOne).toHaveBeenCalled(); // Kiểm tra xem hàm deleteOne đã được gọi để xóa người dùng
    expect(res.status).toHaveBeenCalledWith(400); // Kiểm tra xem status code được trả về là 400
    expect(res.json).toHaveBeenCalledWith({ error: "Delete error" }); // Kiểm tra xem thông báo lỗi có đúng không
  });
});
