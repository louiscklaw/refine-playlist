const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const { Courier, Store, Vehicle } = require('../models');
const { isNumeric } = require('validator');
const { number } = require('joi');

/**
 * Create a courier
 * @param {Object} courierBody
 * @returns {Promise<Courier>}
 */
const createCourier = async (courierBody) => {
  if (await Courier.isTextTaken(courierBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }

  return Courier.create(courierBody);
};

/**
 * Query for couriers
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCouriers = async (filter, options) => {
  const couriers = await Courier.paginate(filter, options);
  return couriers;
};
/**
 * Get courier by id
 * @param {ObjectId} id
 * @returns {Promise<Courier>}
 */
const getCourierById = async (id) => {
  let result = await Courier.findById(id)
    .populate({ path: 'store' })
    .populate({ path: 'vehicle' })
    .populate({ path: 'status' })
    .sort({ createdAt: -1 })
    .limit(100)
    .exec();

  return result;
};

/**
 * Get courier by name
 * @param {string} name
 * @returns {Promise<Courier>}
 */
const getCourierByName = async (name) => {
  return Courier.findOne({ name });
};

/**
 * Update courier by id
 * @param {ObjectId} courierId
 * @param {Object} updateBody
 * @returns {Promise<Courier>}
 */
const updateCourierById = async (courierId, updateBody) => {
  const courier = await Courier.findById(courierId);

  if (!courier) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Courier not found');
  }

  // if (updateBody.name && (await Courier.isNameTaken(updateBody.name, courierId))) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  // }

  updateBody['vehicle']['_id'] = updateBody['vehicle']['id'];
  delete updateBody['vehicle']['id'];

  updateBody['store']['_id'] = updateBody['store']['id'];
  delete updateBody['store']['id'];

  updateBody['status']['_id'] = updateBody['status']['id'];
  delete updateBody['status']['id'];

  Object.assign(courier, updateBody);

  await courier.save();

  return courier;
};

/**
 * Delete courier by id
 * @param {ObjectId} courierId
 * @returns {Promise<Courier>}
 */
const deleteCourierById = async (courierId) => {
  const courier = await getCourierById(courierId);
  if (!courier) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Courier not found');
  }
  await courier.remove();
  return courier;
};

const queryCouriersAdvanced = async (options) => {
  let start = typeof options._start === 'number' ? Number(options._start) : 0;
  let end = typeof options._end === 'number' ? Number(options._end) : 10;
  let limit = end - start;

  const couriers = await Courier.find()
    .populate({ path: 'store' })
    .populate({ path: 'vehicle' })
    .populate({ path: 'status' })
    .sort({ createdAt: -1 })
    .skip(start)
    .limit(limit)
    .exec();

  return couriers;
};

module.exports = {
  createCourier,
  queryCouriers,
  getCourierById,
  getCourierByName,
  updateCourierById,
  deleteCourierById,
  queryCouriersAdvanced,
};
