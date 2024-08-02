const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
var fs = require('fs');
var path = require('path');

const logger = require('../config/logger');

const { Customer } = require('../models');
const ImageFile = require('../models/image-file.model');
var mmm = require('mmmagic'),
  Magic = mmm.Magic;

const API_HOME = path.resolve(__dirname, '../../');

/**
 * Create a customer
 * @param {Object} file_path
 * @returns {Promise<Customer>}
 */
const createImageFile = async (filename) => {
  const uuid = require('uuid').v4();

  var magic = new Magic(mmm.MAGIC_MIME_TYPE);

  const mediaPath = path.join(API_HOME, 'uploads', filename);
  const mediaContent = fs.readFileSync(mediaPath);
  const mime_result = await new Promise((resolve, reject) => {
    magic.detectFile(mediaPath, function (err, result) {
      if (err) reject(err);
      else resolve(result);
    });
  });

  return ImageFile.create({
    uuid: uuid,
    type: mime_result,
    url: `http://192.168.10.89:3031/v1/media/${uuid}`,
    data: mediaContent,
  });
};

/**
 * Query for customers
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCustomers = async (filter, options) => {
  const customers = await Customer.paginate(filter, options);
  return customers;
};

const queryCustomersAdvanced = async (options) => {
  // const customers = await Customer.paginate(filter, options);
  const customers = await Customer.find()
    .sort({ createdAt: -1 })
    .skip(parseInt(options._start))
    .limit(parseInt(options._end));
  return customers;
};

/**
 * Get customer by id
 * @param {ObjectId} id
 * @returns {Promise<Customer>}
 */
const getImageFileById = async (id) => {
  return ImageFile.findById(id);
};

const getImageFileUrlById = async (id) => {
  let image_file = await ImageFile.findById(id);

  return image_file['url'];
};

const getImageMetaById = async (id) => {
  let image_file = await ImageFile.findById(id);
  return image_file.meta;
};

const getImageFileByUuid = async (uuid) => {
  return ImageFile.findOne({ uuid: uuid });
};

/**
 * Update customer by id
 * @param {ObjectId} customerId
 * @param {Object} updateBody
 * @returns {Promise<Customer>}
 */
const updateCustomerById = async (customerId, updateBody) => {
  // const customer = await getCustomerById(customerId);
  // if (!customer) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'Customer not found');
  // }
  // Object.assign(customer, updateBody);
  // await customer.save();
  // return customer;
};

/**
 * Delete customer by id
 * @param {ObjectId} customerId
 * @returns {Promise<Customer>}
 */
const deleteCustomerById = async (customerId) => {
  // const customer = await getCustomerById(customerId);
  // if (!customer) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'Customer not found');
  // }
  // await customer.remove();
  // return customer;
};

module.exports = {
  createImageFile,
  // queryImageFiles,
  getImageFileById,
  getImageMetaById,
  getImageFileByUuid,
  getImageFileUrlById,
  // updateImageFileById,
  // deleteImageFileById,
  // queryImageFilesAdvanced,
};
