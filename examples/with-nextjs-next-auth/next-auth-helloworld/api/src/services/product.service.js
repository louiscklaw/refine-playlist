const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const { Product, Category } = require('../models');

/**
 * Create a product
 * @param {Object} productBody
 * @returns {Promise<Product>}
 */
const createProduct = async (productBody) => {
  if (await Product.isNameTaken(productBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  return Product.create(productBody);
};

/**
 * Query for products
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryProducts1 = async (filter, options) => {
  const products = await Product.paginate(filter, options);
  return products;
};

const queryProducts = async (options) => {
  options._end = options._end ? parseInt(options._end) : 10;
  options._start = options._start ? parseInt(options._start) : 0;

  let start = options._start;
  let end = options._end;
  let limit = end - start;

  const count = await Product.countDocuments();
  const products = await Product.find().sort({ createdAt: -1 }).skip(parseInt(start)).limit(limit);

  return { products, count };
};

/**
 * Get product by id
 * @param {ObjectId} id
 * @returns {Promise<Product>}
 */
const getProductById = async (id) => {
  let product = await Product.findById(id).populate('category');

  return product;
};

/**
 * Get product by name
 * @param {string} name
 * @returns {Promise<Product>}
 */
const getProductByName = async (name) => {
  return Product.findOne({ name });
};

/**
 * Update product by id
 * @param {ObjectId} productId
 * @param {Object} updateBody
 * @returns {Promise<Product>}
 */
const updateProductById = async (productId, updateBody) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  updateBody.category = await Category.findById(updateBody.category.id);

  Object.assign(product, updateBody);

  await product.save();

  return product;
};

/**
 * Delete product by id
 * @param {ObjectId} productId
 * @returns {Promise<Product>}
 */
const deleteProductById = async (productId) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  await product.remove();
  return product;
};

const queryProductsAdvanced = async (options) => {
  let start = typeof options._start === 'number' ? Number(options._start) : 0;
  let end = typeof options._end === 'number' ? Number(options._end) : 10;
  let limit = end - start;

  const count = await Product.countDocuments();
  const products = await Product.find().populate('category').sort({ createdAt: -1 }).skip(parseInt(start)).limit(limit);

  return { products, count };
};

const getProducts = async () => {
  let products = await Product.find();
  // product.category = await Category.findById(product.category);

  return products;
};

module.exports = {
  createProduct,
  queryProducts,
  getProductById,
  getProductByName,
  updateProductById,
  deleteProductById,
  queryProductsAdvanced,
  getProducts,
};
