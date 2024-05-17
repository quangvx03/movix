import Categories from "../Models/CategoriesModel.js";
import asyncHandler from "express-async-handler";

// PUBLIC CONTROLLER
// @desc get all categories
// @route GET /api/categories
// @access Public

const getCategories = asyncHandler(async (req, res) => {
  try {
    // find all categories in DB
    const categories = await Categories.find({});
    // send all categories to the client
    res.json(categories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// ADMIN CONTROLLER

// @desc create new category
// @route POST /api/categories
// @access Private/Admin

const createCategory = asyncHandler(async (req, res) => {
  try {
    // Get title from request body
    const { title } = req.body;

    // Check if the category already exists
    const existingCategory = await Categories.findOne({ title });
    if (existingCategory) {
      return res.status(400).json({ message: "Thể loại đã tồn tại" });
    }

    // Create new category
    const category = new Categories({ title });

    // Save category to DB
    const createdCategory = await category.save();

    // Send created category to the client
    res.status(201).json(createdCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc update category
// @route PUT /api/categories/:id
// @access Private/Admin

const updateCategory = asyncHandler(async (req, res) => {
  try {
    // get category id from request params
    const category = await Categories.findById(req.params.id);

    if (category) {
      // update category title
      category.title = req.body.title || category.title;
      // save updated category to DB
      const updatedCategory = await category.save();
      // send updated category to the client
      res.json(updatedCategory);
    } else {
      res.status(404).json({ message: "Thể loại không tồn tại" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc delete category
// @route DELETE /api/categories/:id
// @access Private/Admin

const deleteCategory = asyncHandler(async (req, res) => {
  try {
    // get category id from request params
    const category = await Categories.findById(req.params.id);

    if (category) {
      // delete category from DB
      await category.deleteOne();
      // send message to the client
      res.json({ message: "Thể loại đã được xóa" });
    } else {
      res.status(404).json({ message: "Thể loại không tồn tại" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { getCategories, createCategory, updateCategory, deleteCategory };
