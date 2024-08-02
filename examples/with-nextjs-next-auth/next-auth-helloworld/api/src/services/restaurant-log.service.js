const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const RestaurantLog = require('../models/restaurant-log.model');
const { userService } = require('.');

/**
 * Create a new log
 * @param {Object} logBody
 * @returns {Promise<Log>}
 */
const createRestaurantLog = async (logBody) => {
  // reserved to http api endpoint
  return RestaurantLog.create(logBody);
};

const internalCreateRestaurantLog = async (logBody) => {
  // reserved to http api endpoint
  const systemDefaultUser = await userService.getSystemUser();

  if (logBody?.user) {
    return RestaurantLog.create(logBody);
  } else {
    return RestaurantLog.create({ ...logBody, user: systemDefaultUser });
  }
};

/**
 * Query for logs
 * @param {Object} filter - Mongo filter
 * @param {Object} log_id - Query options
 * @param {string} [log_id.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [log_id.limit] - Maximum number of results per page (default = 10)
 * @param {number} [log_id.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryLogs = async (filter, options) => {
  const logs = await RestaurantLog.find(filter).lean();
  return logs;
};

/**
 * Query for logs
 * @param {Object} log_id - Query options
 * @param {string} [log_id.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [log_id._start] - Index of the first result (default = 0)
 * @param {number} [log_id._end] - Index of the last result (default = 100)
 * @returns {Promise<QueryResult>}
 */
const getAll = async (options) => {
  let start = typeof options._start === 'number' ? Number(options._start) : 0;
  let end = typeof options._end === 'number' ? Number(options._end) : 10;
  let limit = end - start;

  let sortBy = options._sortBy ? options._sortBy : { createdAt: -1 };

  const restaurantLogs = await RestaurantLog.find()
    .sort(sortBy)
    .skip(start)
    .limit(limit)
    //
    .populate('user')
    .exec();
  const count = restaurantLogs.length;

  return { restaurantLogs, count };
};

const getRestaurantLog = async (log_id) => {
  const restaurantLog = await RestaurantLog.findById(log_id)
    .populate('user')
    //
    .exec();

  return restaurantLog;
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
  createRestaurantLog,
  getAll,
  getRestaurantLog,
  internalCreateRestaurantLog,
  // queryCategories,
  // getCategoryById,
  // getCategoryByTitle,
  // updateCategoryById,
  // deleteCategoryById,
};
