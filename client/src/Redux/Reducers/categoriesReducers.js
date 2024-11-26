import * as categoriesContants from "../Constants/categoriesConstants";

// GET ALL CATEGORIES
export const getAllCategoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case categoriesContants.GET_ALL_CATEGORIES_REQUEST:
      return { isLoading: true };
    case categoriesContants.GET_ALL_CATEGORIES_SUCCESS:
      return { isLoading: false, categories: action.payload };
    case categoriesContants.GET_ALL_CATEGORIES_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// CREATE CATEGORY
export const createCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case categoriesContants.CREATE_CATEGORY_REQUEST:
      return { isLoading: true };
    case categoriesContants.CREATE_CATEGORY_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case categoriesContants.CREATE_CATEGORY_FAIL:
      return { isLoading: false, isError: action.payload };
    case categoriesContants.CREATE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

// UPDATE CATEGORY
export const updateCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case categoriesContants.UPDATE_CATEGORY_REQUEST:
      return { isLoading: true };
    case categoriesContants.UPDATE_CATEGORY_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case categoriesContants.UPDATE_CATEGORY_FAIL:
      return { isLoading: false, isError: action.payload };
    case categoriesContants.UPDATE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

// DELETE CATEGORY
export const deleteCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case categoriesContants.DELETE_CATEGORY_REQUEST:
      return { isLoading: true };
    case categoriesContants.DELETE_CATEGORY_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case categoriesContants.DELETE_CATEGORY_FAIL:
      return { isLoading: false, isError: action.payload };
    case categoriesContants.DELETE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};
