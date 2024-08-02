const httpStatus = require('http-status');
const { Category, QrRedirect } = require('../models');
const ApiError = require('../utils/ApiError');

// /**
//  * Create a category
//  * @param {Object} categoryBody
//  * @returns {Promise<Status>}
//  */
const createQrRedirect = async (categoryBody) => {
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
const queryQrRedirects = async (options) => {
  const qr_redirects = await QrRedirect.find().lean();
  return qr_redirects;
};

const getQrRedirects = async (options) => {
  return await QrRedirect.find();
};

/**
 * Get QrRedirect by id
 * @param {ObjectId} id
 * @returns {Promise<QrRedirect>}
 */
const getQrRedirectById = async (id) => {
  return QrRedirect.findById(id);
};

// /**
//  * Get category by title
//  * @param {string} title
//  * @returns {Promise<Status>}
//  */
// const getCategoryByTitle = async (title) => {
//   return Category.findOne({ title });
// };

/**
 * Update category by id
 * @param {ObjectId} qrRedirectId
 * @param {Object} updateBody
 * @returns {Promise<Status>}
 */
const updateQrRedirectById = async (qrRedirectId, updateBody) => {
  const qr_redirect = await QrRedirect.findById(qrRedirectId);

  if (!qr_redirect) {
    throw new ApiError(httpStatus.NOT_FOUND, 'QrRedirect not found');
  }
  // if (updateBody.title && (await Category.isTitleTaken(updateBody.title, qrRedirectId))) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Title already taken');
  // }

  Object.assign(qr_redirect, updateBody);

  await qr_redirect.save();
  return qr_redirect;
};

/**
 * Delete category by id
 * @param {ObjectId} categoryId
 * @returns {Promise<Status>}
 */
const deleteQrRedirectById = async (categoryId) => {
  const category = await getCategoryById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  await category.remove();
  return category;
};

module.exports = {
  createQrRedirect,
  // queryCategories,
  getQrRedirects,
  getQrRedirectById,
  queryQrRedirects,
  updateQrRedirectById,
  // getCategoryById,
  // getCategoryByTitle,
  // updateCategoryById,
  deleteQrRedirectById,
  // getCategories,
};
