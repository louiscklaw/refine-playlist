const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

// sample data
// [
//   {
//     "id": 1,
//     "text": "Available"
//   },
//   {
//     "id": 2,
//     "text": "Offline"
//   },
//   {
//     "id": 3,
//     "text": "On delivery"
//   }
// ]

const { CourierStatus } = require('../models');

/**
 * Create a courier status
 * @param {Object} courierStatusBody
 * @returns {Promise<CourierStatus>}
 */
const createCourierStatus = async (courierStatusBody) => {
  if (await CourierStatus.isTextTaken(courierStatusBody.text)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Text already taken');
  }
  return CourierStatus.create(courierStatusBody);
};

/**
 * Query for courier statuses
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCourierStatuses = async () => {
  // const courierStatuses = await CourierStatus.paginate(filter, options);
  const courierStatuses = await CourierStatus.find();
  return courierStatuses;
};

/**
 * Get courier status by id
 * @param {ObjectId} id
 * @returns {Promise<CourierStatus>}
 */
const getCourierStatusById = async (id) => {
  return CourierStatus.findById(id);
};

/**
 * Get courier status by text
 * @param {string} text
 * @returns {Promise<CourierStatus>}
 */
const getCourierStatusByText = async (text) => {
  return CourierStatus.findOne({ text });
};

/**
 * Update courier status by id
 * @param {ObjectId} courierStatusId
 * @param {Object} updateBody
 * @returns {Promise<CourierStatus>}
 */
const updateCourierStatusById = async (courierStatusId, updateBody) => {
  const courierStatus = await getCourierStatusById(courierStatusId);
  if (!courierStatus) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Courier status not found');
  }
  if (updateBody.text && (await CourierStatus.isTextTaken(updateBody.text, courierStatusId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Text already taken');
  }
  Object.assign(courierStatus, updateBody);
  await courierStatus.save();
  return courierStatus;
};

/**
 * Delete courier status by id
 * @param {ObjectId} courierStatusId
 * @returns {Promise<CourierStatus>}
 */
const deleteCourierStatusById = async (courierStatusId) => {
  const courierStatus = await getCourierStatusById(courierStatusId);
  if (!courierStatus) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Courier status not found');
  }
  await courierStatus.remove();
  return courierStatus;
};

module.exports = {
  createCourierStatus,
  queryCourierStatuses,
  getCourierStatusById,
  getCourierStatusByText,
  updateCourierStatusById,
  deleteCourierStatusById,
};
