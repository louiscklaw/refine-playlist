const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const logger = require('../config/logger');

const { Order, Product, Customer, Store, Vehicle, OrderStatus } = require('../models');

/**
 * Create a order
 * @param {Object} orderBody
 * @returns {Promise<Order>}
 */
const createOrder = async (orderBody) => {
  return Order.create(orderBody);
};

/**
 * Query for orders
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryOrders = async (filter, options) => {
  const orders = await Order.paginate(filter, options);
  return orders;
};

const queryPendingOrder = async (filter, options) => {
  const pending_order = await Order.find({ 'status.id': 1 });
  const pending_order_len = pending_order.length;
  return pending_order_len;
};
const filterByContain = async (containing_text) => {
  const result = await Order.find({
    $or: [
      //
      { orderNumber: containing_text },
      { 'customer.name': { $regex: new RegExp(containing_text, 'i') } },
    ],
  });

  return result;
};

// const queryOrdersAdvanced = async (options) => {
//   options._end = options._end ? parseInt(options._end) : 100;
//   options._start = options._start ? parseInt(options._start) : 0;

//   let start = options._start;
//   let end = options._end;
//   let limit = end - start;

//   const orders = await Order.find().sort({ createdAt: -1 }).skip(parseInt(start)).limit(limit);

//   return orders;
// };

const queryOrdersAdvanced = async (options) => {
  let start = typeof options._start === 'number' ? Number(options._start) : 0;
  let end = typeof options._end === 'number' ? Number(options._end) : 10;
  let limit = end - start;

  const count = await Order.countDocuments();
  const orders = await Order.find().sort({ createdAt: -1 }).skip(parseInt(start)).limit(limit);
  orders.count = count;
  return orders;
};

const queryAllOrders = async (options) => {
  let start = typeof options._start === 'number' ? Number(options._start) : 0;
  let end = typeof options._end === 'number' ? Number(options._end) : 10;
  let limit = end - start;

  const count = await Order.countDocuments();
  const orders = await Order.find()
    .populate('customer')
    .populate('products')
    .populate('status')
    .populate('store')
    .populate('courier')
    .sort({ createdAt: -1 })
    .skip(parseInt(start))
    .limit(limit)
    .exec();

  return { orders, count };
};

const queryOrdersByUserId = async (options) => {
  try {
    let start = typeof options._start === 'number' ? Number(options._start) : 0;
    let end = typeof options._end === 'number' ? Number(options._end) : 10;
    let limit = end - start;

    const ObjectId = require('mongodb').ObjectId;
    const orders = await Order.find({ customer: new ObjectId(options['customer.id']) })
      .populate('customer')
      .populate('products')
      .populate('status')
      .populate('store')
      .populate('courier')
      .sort({ createdAt: -1 })
      .skip(parseInt(start))
      .limit(limit)
      .exec();

    return { orders, count: orders.length };
  } catch (error) {
    logger.error('faulty options', options);
    logger.error(error);
    return [];
  }
};

const findOrderById = async (id) => {
  return Order.findOne({ id: parseInt(id) });
};

/**
 * Get order by id
 * @param {ObjectId} id
 * @returns {Promise<Order>}
 */
const getOrderById = async (id) => {
  return Order.findById(id)
    .populate('customer')
    .populate('products')
    .populate('status')
    .populate('store')
    .populate('courier')
    .exec();
};

/**
 * Update order by id
 * @param {ObjectId} orderId
 * @param {Object} updateBody
 * @returns {Promise<Order>}
 */
const updateOrderById = async (orderId, updateBody) => {
  let order = await Order.findById(orderId).populate('status');

  // // update id field to _id
  updateBody['status'] = { ...updateBody['status'], _id: updateBody['status']['id'] };
  // console.log(updateBody);

  if (order) {
    //   // not allowed updated from outside
    delete updateBody['events'];
    updateBody['events'] = order.events;
    //   console.log({ t1: order.status._id, t2: updateBody['status']['_id'] });
    if (order.status._id != updateBody['status']['id']) {
      //     // order status has changed, append to events
      updateBody['events'].push({
        date: new Date().toISOString(),
        status: updateBody['status']['text'],
      });
    } else {
      // order status is the same, no need to push event
    }

    Object.assign(order, updateBody);
    await order.save();
    return order;
  } else {
    // order not found
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
};

/**
 * Delete order by id
 * @param {ObjectId} orderId
 * @returns {Promise<Order>}
 */
const deleteOrderById = async (orderId) => {
  const order = await findOrderById(orderId);

  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }

  await order.remove();

  return order;
};

module.exports = {
  createOrder,
  queryOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
  queryOrdersAdvanced,
  queryPendingOrder,
  queryOrdersByUserId,
  queryAllOrders,
  filterByContain,
};
