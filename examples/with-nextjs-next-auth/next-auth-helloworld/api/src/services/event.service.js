const httpStatus = require('http-status');
const { Event } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a new event
 * @param {Object} eventBody
 * @returns {Promise<Event>}
 */
const createEvent = async (eventBody) => {
  return Event.create(eventBody);
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
  const categories = await Event.find().lean();
  return categories;
};

/**
 * Query for events
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options._start] - Index of the first result (default = 0)
 * @param {number} [options._end] - Index of the last result (default = 100)
 * @returns {Promise<QueryResult>}
 */
const getEvents = async (options) => {
  let start = typeof options._start === 'number' ? Number(options._start) : 0;
  let end = typeof options._end === 'number' ? Number(options._end) : 10;
  let limit = end - start;

  let sortBy = options._sortBy ? options._sortBy : { createdAt: -1 };

  const count = await Event.countDocuments();
  const events = await Event.find();
  // .sort(sortBy).skip(start).limit(limit);

  return { events, count };
};

/**
 * Get category by id
 * @param {ObjectId} id
 * @returns {Promise<Status>}
 */
const getCategoryById = async (id) => {
  return Event.findById(id);
};

/**
 * Get category by title
 * @param {string} title
 * @returns {Promise<Status>}
 */
const getCategoryByTitle = async (title) => {
  return Event.findOne({ title });
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
  if (updateBody.title && (await Event.isTitleTaken(updateBody.title, categoryId))) {
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
  createEvent,
  getEvents,
  // queryCategories,
  // getCategoryById,
  // getCategoryByTitle,
  // updateCategoryById,
  // deleteCategoryById,
};
