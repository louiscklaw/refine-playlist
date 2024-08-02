const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

// sample data
// [
//   {
//     "id": 1,
//     "product_id": 29,
//     "orderCount": 48
//   },
//   {
//     "id": 2,
//     "product_id": 32,
//     "orderCount": 48
//   }
// ]

const { TrendingProduct } = require('../models');

/**
 * Create a trending product
 * @param {Object} trendingProductBody
 * @returns {Promise<TrendingProduct>}
 */
const createTrendingProduct = async (trendingProductBody) => {
  if (await TrendingProduct.isProductIdTaken(trendingProductBody.product_id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product ID already taken');
  }
  return TrendingProduct.create(trendingProductBody);
};

/**
 * Query for trending products
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTrendingProducts = async (filter, options) => {
  const trendingProducts = await TrendingProduct.paginate(filter, options);
  return trendingProducts;
};

/**
 * Get trending product by id
 * @param {ObjectId} id
 * @returns {Promise<TrendingProduct>}
 */
const getTrendingProductById = async (id) => {
  return TrendingProduct.findById(id);
};

/**
 * Get trending product by product id
 * @param {string} product_id
 * @returns {Promise<TrendingProduct>}
 */
const getTrendingProductByProductId = async (product_id) => {
  return TrendingProduct.findOne({ product_id });
};

/**
 * Update trending product by id
 * @param {ObjectId} trendingProductId
 * @param {Object} updateBody
 * @returns {Promise<TrendingProduct>}
 */
const updateTrendingProductById = async (trendingProductId, updateBody) => {
  const trendingProduct = await getTrendingProductById(trendingProductId);
  if (!trendingProduct) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Trending product not found');
  }
  if (updateBody.product_id && (await TrendingProduct.isProductIdTaken(updateBody.product_id, trendingProductId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product ID already taken');
  }
  Object.assign(trendingProduct, updateBody);
  await trendingProduct.save();
  return trendingProduct;
};

/**
 * Delete trending product by id
 * @param {ObjectId} trendingProductId
 * @returns {Promise<TrendingProduct>}
 */
const deleteTrendingProductById = async (trendingProductId) => {
  const trendingProduct = await getTrendingProductById(trendingProductId);
  if (!trendingProduct) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Trending product not found');
  }
  await trendingProduct.remove();
  return trendingProduct;
};

const queryTrendingProductsAdvanced = async (options) => {
  const trending_products = await TrendingProduct.find()
    .sort({ createdAt: -1 })
    .skip(parseInt(options._start))
    .limit(parseInt(options._end));

  return trending_products;
};

module.exports = {
  createTrendingProduct,
  queryTrendingProducts,
  getTrendingProductById,
  getTrendingProductByProductId,
  updateTrendingProductById,
  deleteTrendingProductById,
  queryTrendingProductsAdvanced,
};
