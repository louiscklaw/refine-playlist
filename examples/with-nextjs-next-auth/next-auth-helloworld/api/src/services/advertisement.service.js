const httpStatus = require('http-status');
const { Category } = require('../models');
const ApiError = require('../utils/ApiError');
const Advertisement = require('../models/advertisement.model');

/**
 * Create a advertisement
 * @param {Object} advertisementBody
 * @returns {Promise<Advertisement>}
 */
const createAdvertisement = async (advertisementBody) => {
  if (await Advertisement.isTitleTaken(advertisementBody.title)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Title already taken');
  }

  return Advertisement.create(advertisementBody);
};

const filterByContain = async (containing_text) => {
  const result = await Advertisement.find({
    $or: [
      // TODO: expand to other field
      { caption: { $regex: new RegExp(containing_text, 'i') } },
    ],
  });

  return result;
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
const queryAdvertisements = async (options) => {
  const advertisements = await Advertisement.find().lean();
  return advertisements;
};

const getAdvertisements = async (options) => {
  let start = typeof options._start === 'number' ? Number(options._start) : 0;
  let end = typeof options._end === 'number' ? Number(options._end) : 10;
  let limit = end - start;

  const advertisements = await Advertisement.find()
    //
    .sort({ createdAt: -1 })
    .skip(parseInt(start))
    .limit(limit)
    //
    .exec();

  console.log(advertisements);
  return { advertisements, count: advertisements.length };
};

/**
 * Get advertisement by id
 * @param {ObjectId} id
 * @returns {Promise<Status>}
 */
const getAdvertisementById = async (id) => {
  return (
    Advertisement.findById(id)
      //
      .exec()
  );
};

/**
 * Get advertisement by title
 * @param {string} title
 * @returns {Promise<Status>}
 */
const getAdvertisementByTitle = async (title) => {
  return Advertisement.findOne({ title });
};

/**
 * Update advertisement by id
 * @param {ObjectId} advertisementId
 * @param {Object} updateBody
 * @returns {Promise<Status>}
 */
const updateAdvertisementById = async (advertisementId, updateBody) => {
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
const deleteAdvertisementById = async (advertisementId) => {
  const advertisement = await getAdvertisementById(advertisementId);
  if (!advertisement) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Advertisement not found');
  }
  await advertisement.remove();
  return advertisement;
};

module.exports = {
  createAdvertisement,
  queryAdvertisements,
  getAdvertisementById,
  getAdvertisementByTitle,
  updateAdvertisementById,
  deleteAdvertisementById,
  getAdvertisements,
  filterByContain,
};
