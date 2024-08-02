const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

// sample data
// [
//   {
//     "id": 5,
//     "text": "Cancelled"
//   }
// ]

const { Status } = require('../models');

/**
 * Create a status
 * @param {Object} statusBody
 * @returns {Promise<Status>}
 */
const createStatus = async (statusBody) => {
  if (await Status.isTextTaken(statusBody.text)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Text already taken');
  }
  return Status.create(statusBody);
};

/**
 * Query for statuses
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryStatuses = async (filter, options) => {
  // const statuses = await Status.paginate(filter, options);
  const statuses = await Status.find().lean();
  return statuses;
};

/**
 * Get status by id
 * @param {ObjectId} id
 * @returns {Promise<Status>}
 */
const getStatusById = async (id) => {
  return Status.findById(id).lean();
};

/**
 * Get status by text
 * @param {string} text
 * @returns {Promise<Status>}
 */
const getStatusByText = async (text) => {
  return Status.findOne({ text });
};

/**
 * Update status by id
 * @param {ObjectId} statusId
 * @param {Object} updateBody
 * @returns {Promise<Status>}
 */
const updateStatusById = async (statusId, updateBody) => {
  const status = await getStatusById(statusId);
  if (!status) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Status not found');
  }
  if (updateBody.text && (await Status.isTextTaken(updateBody.text, statusId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Text already taken');
  }
  Object.assign(status, updateBody);
  await status.save();
  return status;
};

/**
 * Delete status by id
 * @param {ObjectId} statusId
 * @returns {Promise<Status>}
 */
const deleteStatusById = async (statusId) => {
  const status = await getStatusById(statusId);
  if (!status) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Status not found');
  }
  await status.remove();
  return status;
};

module.exports = {
  createStatus,
  queryStatuses,
  getStatusById,
  getStatusByText,
  updateStatusById,
  deleteStatusById,
};
