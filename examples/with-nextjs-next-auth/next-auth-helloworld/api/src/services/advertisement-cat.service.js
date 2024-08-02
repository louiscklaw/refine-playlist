const httpStatus = require('http-status');
const { Category } = require('../models');
const ApiError = require('../utils/ApiError');
const Advertisement = require('../models/advertisement.model');
const AdvertisementCat = require('../models/advertisement-cat.model');
const { advertisementService } = require('.');

/**
 * Create a advertisement
 * @param {Object} advertisementBody
 * @returns {Promise<Advertisement>}
 */
const create = async (advertisementBody) => {
  if (await Advertisement.isTitleTaken(advertisementBody.title)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Title already taken');
  }

  console.log(advertisementBody);

  return Advertisement.create(advertisementBody);
};

/**
 * Query for advertisements
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const query = async (options) => {
  const advertisements = await Advertisement.find().lean();
  return advertisements;
};

const getAll = async (options) => {
  let start = typeof options._start === 'number' ? Number(options._start) : 0;
  let end = typeof options._end === 'number' ? Number(options._end) : 10;
  let limit = end - start;

  const result = await AdvertisementCat.find()
    //
    .sort({ createdAt: -1 })
    .skip(parseInt(start))
    .limit(limit)
    //
    .exec();

  return { result, count: result.length };
};

/**
 * Get advertisement by id
 * @param {ObjectId} id
 * @returns {Promise<Status>}
 */
const getById = async (id) => {
  return AdvertisementCat.findById(id)
  .exec();
};

/**
 * Get advertisement by title
 * @param {string} title
 * @returns {Promise<Status>}
 */
const getByTitle = async (title) => {
  return Advertisement.findOne({ title });
};

/**
 * Update advertisement by id
 * @param {ObjectId} advertisementId
 * @param {Object} updateBody
 * @returns {Promise<Status>}
 */
const updateById = async (advertisementId, updateBody) => {
  const advertisement = await Advertisement.findById(advertisementId);

  if (!advertisement) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Advertisement not found');
  }
  // if (updateBody.title && (await Advertisement.isTitleTaken(updateBody.title, advertisementId))) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Title already taken');
  // }

  updateBody.images.forEach((i) => {
    i['_id'] = i['id'];
  });

  Object.assign(advertisement, updateBody);

  await advertisement.save();
  return advertisement;
};
/**
 * Delete advertisement by id
 * @param {ObjectId} advertisementId
 * @returns {Promise<Status>}
 */
const deleteById = async (advertisementId) => {
  const advertisement = await getById(advertisementId);
  if (!advertisement) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Advertisement not found');
  }
  await advertisement.remove();
  return advertisement;
};

module.exports = {
  create,
  query,
  getById,
  getByTitle,
  updateById,
  deleteById,
  getAll,
};
