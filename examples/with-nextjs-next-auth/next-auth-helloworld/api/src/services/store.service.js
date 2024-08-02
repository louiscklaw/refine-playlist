const httpStatus = require('http-status');
const { Store, Product } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a store
 * @param {Object} storeBody
 * @returns {Promise<Store>}
 */
const createStore = async (storeBody) => {
  if (await Store.isTitleTaken(storeBody.title)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Title already taken');
  }
  return Store.create(storeBody);
};

/**
 * Query for stores
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryStores = async (filter, options) => {
  const stores = await Store.paginate(filter, options);
  return stores;
};

/**
 * Get store by id
 * @param {ObjectId} id
 * @returns {Promise<Store>}
 */
const getStoreById = async (id) => {
  let store = await Store.findById(id).populate('products');

  return store;
};

/**
 * Get store by title
 * @param {string} title
 * @returns {Promise<Store>}
 */
const getStoreByTitle = async (title) => {
  return Store.findOne({ title });
};

/**
 * Update store by id
 * @param {ObjectId} storeId
 * @param {Object} updateBody
 * @returns {Promise<Store>}
 */
const updateStoreById = async (storeId, updateBody) => {
  const store = await getStoreById(storeId);
  if (!store) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Store not found');
  }
  if (updateBody.title && (await Store.isTitleTaken(updateBody.title, storeId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Title already taken');
  }
  Object.assign(store, updateBody);
  await store.save();
  return store;
};

/**
 * Delete store by id
 * @param {ObjectId} storeId
 * @returns {Promise<Store>}
 */
const deleteStoreById = async (storeId) => {
  const store = await getStoreById(storeId);
  if (!store) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Store not found');
  }
  await store.remove();
  return store;
};

const queryStoresAdvanced = async (options) => {
  // const orders = await Store.paginate(filter, options);
  const orders = await Store.find()
    .populate('products')
    .sort({ createdAt: -1 })
    .skip(parseInt(options._start))
    .limit(parseInt(options._end));
  return orders;
};

module.exports = {
  createStore,
  queryStores,
  getStoreById,
  getStoreByTitle,
  updateStoreById,
  deleteStoreById,
  queryStoresAdvanced,
};
