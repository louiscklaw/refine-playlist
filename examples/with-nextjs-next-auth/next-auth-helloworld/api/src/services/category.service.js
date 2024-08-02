const httpStatus = require('http-status');
const { Category } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a category
 * @param {Object} categoryBody
 * @returns {Promise<Status>}
 */
const createCategory = async (categoryBody) => {
  if (await Category.isTitleTaken(categoryBody.title)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Title already taken');
  }

  console.log(categoryBody);

  return Category.create(categoryBody);
};

/**
 * Query for categories
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCategories = async (options) => {
  const categories = await Category.find().lean();
  return categories;
};

const getCategories = async (options) => {
  let start = typeof options._start === 'number' ? Number(options._start) : 0;
  let end = typeof options._end === 'number' ? Number(options._end) : 10;
  let limit = end - start;

  const count = await Category.countDocuments();

  const categories = await Category.find().sort({ createdAt: -1 }).skip(1).limit(10);

  return { categories, count };
};

/**
 * Get category by id
 * @param {ObjectId} id
 * @returns {Promise<Status>}
 */
const getCategoryById = async (id) => {
  return Category.findById(id);
};

/**
 * Get category by title
 * @param {string} title
 * @returns {Promise<Status>}
 */
const getCategoryByTitle = async (title) => {
  return Category.findOne({ title });
};

/**
 * Update category by id
 * @param {ObjectId} categoryId
 * @param {Object} updateBody
 * @returns {Promise<Status>}
 */
const updateCategoryById = async (categoryId, updateBody) => {
  const category = await getCategoryById(categoryId);

  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  if (updateBody.title && (await Category.isTitleTaken(updateBody.title, categoryId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Title already taken');
  }

  Object.assign(category, updateBody);

  await category.save();
  return category;
};

/**
 * Delete category by id
 * @param {ObjectId} categoryId
 * @returns {Promise<Status>}
 */
const deleteCategoryById = async (categoryId) => {
  const category = await getCategoryById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  await category.remove();
  return category;
};

module.exports = {
  createCategory,
  queryCategories,
  getCategoryById,
  getCategoryByTitle,
  updateCategoryById,
  deleteCategoryById,
  getCategories,
};
