import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./CategoriesController";
import Categories from "../Models/CategoriesModel";

jest.mock("../Models/CategoriesModel");

describe("CategoriesController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getCategories returns all categories", async () => {
    const mockCategories = [{ title: "Category 1" }, { title: "Category 2" }];
    Categories.find.mockResolvedValue(mockCategories);

    const req = {};
    const res = { json: jest.fn() };

    await getCategories(req, res);

    expect(res.json).toHaveBeenCalledWith(mockCategories);
  });

  test("createCategory creates a new category", async () => {
    const mockCategory = { title: "New Category" };
    Categories.mockReturnValue({
      save: jest.fn().mockResolvedValue(mockCategory),
    });

    const req = { body: { title: "New Category" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await createCategory(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockCategory);
  });

  test("updateCategory updates a category", async () => {
    const mockCategory = {
      title: "Original Category",
      save: jest.fn().mockImplementationOnce(function () {
        this.title = req.body.title; // Cập nhật title trên đối tượng khi save được gọi
        return Promise.resolve(this);
      }),
    };

    Categories.findById.mockResolvedValue(mockCategory);

    const req = { params: { id: "1" }, body: { title: "Updated Category" } };
    const res = { json: jest.fn() };

    await updateCategory(req, res);

    expect(mockCategory.title).toBe("Updated Category"); // Kiểm tra liệu title có được cập nhật không
    expect(mockCategory.save).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockCategory);
  });

  test("deleteCategory deletes a category", async () => {
    const mockCategory = { deleteOne: jest.fn().mockResolvedValueOnce() };
    Categories.findById.mockResolvedValue(mockCategory);

    const req = { params: { id: "1" } };
    const res = { json: jest.fn() };

    await deleteCategory(req, res);

    expect(mockCategory.deleteOne).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ message: "Thể loại đã được xóa" });
  });
});
