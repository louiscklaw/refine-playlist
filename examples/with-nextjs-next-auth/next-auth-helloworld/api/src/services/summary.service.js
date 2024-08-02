const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

// sample data
// [
//   {
//     "id": "sales",
//     "sales": "71,465",
//     "percent": 32,
//     "target": "225,000"
//   }
// ]

const { Summary } = require('../models');

/**
 * Create a summary
 * @param {Object} summaryBody
 * @returns {Promise<Summary>}
 */
const createSummary = async (summaryBody) => {
  if (await Summary.isTextTaken(summaryBody.text)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Text already taken');
  }
  return Summary.create(summaryBody);
};

/**
 * Query for summaries
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const querySummaries = async (filter, options) => {
  const summaries = await Summary.paginate(filter, options);
  return summaries;
};

const getSummaries = async () => {
  const summaries = await Summary.find();
  return summaries;
};

/**
 * Get summary by id
 * @param {ObjectId} id
 * @returns {Promise<Summary>}
 */
const getSummaryById = async (id) => {
  return Summary.findById(id).lean();
};

/**
 * Get summary by text
 * @param {string} text
 * @returns {Promise<Summary>}
 */
const getSummaryByText = async (text) => {
  return Summary.findOne({ text });
};

/**
 * Update summary by id
 * @param {ObjectId} summaryId
 * @param {Object} updateBody
 * @returns {Promise<Summary>}
 */
const updateSummaryById = async (summaryId, updateBody) => {
  const summary = await getSummaryById(summaryId);
  if (!summary) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Summary not found');
  }
  if (updateBody.text && (await Summary.isTextTaken(updateBody.text, summaryId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Text already taken');
  }
  Object.assign(summary, updateBody);
  await summary.save();
  return summary;
};

/**
 * Delete summary by id
 * @param {ObjectId} summaryId
 * @returns {Promise<Summary>}
 */
const deleteSummaryById = async (summaryId) => {
  const summary = await getSummaryById(summaryId);
  if (!summary) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Summary not found');
  }
  await summary.remove();
  return summary;
};

module.exports = {
  createSummary,
  querySummaries,
  getSummaryById,
  getSummaryByText,
  updateSummaryById,
  deleteSummaryById,
  getSummaries,
};
