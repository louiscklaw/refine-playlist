const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const { OrderStatus } = require('../models');

/**
 * Create a order status
 * @param {Object} orderStatusBody
 * @returns {Promise<OrderStatus>}
 */
const createOrderStatus = async (orderStatusBody) => {
  if (await OrderStatus.isTextTaken(orderStatusBody.text)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Text already taken');
  }
  return OrderStatus.create(orderStatusBody);
};

/**
 * Query for order statuses
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryOrderStatuses = async () => {
  const orderStatuses = await OrderStatus.find().skip(0).limit(99);
  return orderStatuses;
};

const findOrderStatusById = async (id) => {
  return OrderStatus.findOne({ id: parseInt(id) });
};

/**
 * Get order status by id
 * @param {ObjectId} id
 * @returns {Promise<OrderStatus>}
 */
const getOrderStatusById = async (id) => {
  return OrderStatus.findById(id);
};

/**
 * Get order status by text
 * @param {string} text
 * @returns {Promise<OrderStatus>}
 */
const getOrderStatusByText = async (text) => {
  return OrderStatus.findOne({ text });
};

/**
 * Update order status by id
 * @param {ObjectId} orderStatusId
 * @param {Object} updateBody
 * @returns {Promise<OrderStatus>}
 */
const updateOrderStatusById = async (orderStatusId, updateBody) => {
  const orderStatus = await getOrderStatusById(orderStatusId);
  if (!orderStatus) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order status not found');
  }
  if (updateBody.text && (await OrderStatus.isTextTaken(updateBody.text, orderStatusId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Text already taken');
  }
  Object.assign(orderStatus, updateBody);
  await orderStatus.save();
  return orderStatus;
};

/**
 * Delete order status by id
 * @param {ObjectId} orderStatusId
 * @returns {Promise<OrderStatus>}
 */
const deleteOrderStatusById = async (orderStatusId) => {
  const orderStatus = await getOrderStatusById(orderStatusId);
  if (!orderStatus) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order status not found');
  }
  await orderStatus.remove();
  return orderStatus;
};

module.exports = {
  createOrderStatus,
  queryOrderStatuses,
  getOrderStatusById,
  getOrderStatusByText,
  updateOrderStatusById,
  deleteOrderStatusById,
  findOrderStatusById,
};
