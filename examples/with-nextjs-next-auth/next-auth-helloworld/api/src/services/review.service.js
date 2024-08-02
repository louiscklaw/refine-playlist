const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const { Review, Courier } = require('../models');

/**
 * Create a review
 * @param {Object} reviewBody
 * @returns {Promise<Review>}
 */
const createReview = async (reviewBody) => {
  if (await Review.isCommentTaken(reviewBody.comment)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Comment already taken');
  }
  return Review.create(reviewBody);
};

/**
 * Query for reviews
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryReviews = async (filter, options) => {
  const reviews = await Review.paginate(filter, options);
  return reviews;
};

/**
 * Get review by id
 * @param {ObjectId} id
 * @returns {Promise<Review>}
 */
const getReviewById = async (id) => {
  return await Review.findById(id);
};

/**
 * Get review by comment
 * @param {string} comment
 * @returns {Promise<Review>}
 */
const getReviewByComment = async (comment) => {
  return Review.findOne({ comment });
};

/**
 * Update review by id
 * @param {ObjectId} reviewId
 * @param {Object} updateBody
 * @returns {Promise<Review>}
 */
const updateReviewById = async (reviewId, updateBody) => {
  const review = await getReviewById(reviewId);
  if (!review) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found');
  }
  if (updateBody.comment && (await Review.isCommentTaken(updateBody.comment, reviewId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Comment already taken');
  }
  Object.assign(review, updateBody);
  await review.save();
  return review;
};

/**
 * Delete review by id
 * @param {ObjectId} reviewId
 * @returns {Promise<Review>}
 */
const deleteReviewById = async (reviewId) => {
  const review = await getReviewById(reviewId);
  if (!review) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found');
  }
  await review.remove();
  return review;
};

const queryReviewsAdvanced = async (options) => {
  const reviews = await Review.find().sort({ createdAt: -1 }).skip(parseInt(options._start)).limit(parseInt(options._end));

  return reviews;
};

module.exports = {
  createReview,
  queryReviews,
  getReviewById,
  getReviewByComment,
  updateReviewById,
  deleteReviewById,
  queryReviewsAdvanced,
};
