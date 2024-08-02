const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

// sample data
// [
// {
//   "id": 67,
//   "name": "Garlic Bread",
//   "isActive": false,
//   "description": "Warm, buttery bread seasoned with garlic and herbs, toasted to perfection.",
//   "images": [ "5e982861-68ca-405e-941c-fcc9e160d70b" ],
//   "createdAt": "2024-04-04T04:18:23.076Z",
//   "price": 6,
//   "category_id": 1
// },
// {
//   "id": 67,
//   "name": "Garlic Bread",
//   "isActive": false,
//   "description": "Warm, buttery bread seasoned with garlic and herbs, toasted to perfection.",
//   "images": [ "5e982861-68ca-405e-941c-fcc9e160d70b" ],
//   "createdAt": "2024-04-04T04:18:23.076Z",
//   "price": 6,
//   "category_id": 1
// },
// ]

const { Vehicle } = require('../models');
const { isNumeric } = require('validator');

/**
 * Create a vehicle
 * @param {Object} vehicleBody
 * @returns {Promise<vehicle>}
 */
const createVehicle = async (vehicleBody) => {
  if (await Vehicle.isTextTaken(vehicleBody.text)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Text already taken');
  }
  return Vehicle.create(vehicleBody);
};

/**
 * Query for vehicles
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

const queryVehicles = async (options) => {
  //  filter,
  const vehicles = await Vehicle.find(options);

  return vehicles;
};

/**
 * Query for vehicles
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

const queryVehiclesLike = async (like_string) => {
  //  filter,
  // const vehicles = await Vehicle.find(options);

  vehicles = await Vehicle.find({
    $or: [
      { color: { $regex: like_string, $options: 'i' } },
      { engineSize: isNumeric(like_string) ? Number(like_string) : -1 },
      { model: { $regex: like_string, $options: 'i' } },
      { vehicleType: { $regex: like_string, $options: 'i' } },
      { year: isNumeric(like_string) ? Number(like_string) : -1 },
    ],
  });

  console.log('findme');

  return vehicles;
};

/**
 * Get vehicle by id
 * @param {ObjectId} id
 * @returns {Promise<vehicle>}
 */
const getVehicleById = async (id) => {
  return Vehicle.findById(id);
};

/**
 * Get vehicle by text
 * @param {string} text
 * @returns {Promise<vehicle>}
 */
const getVehicleByText = async (text) => {
  return Vehicle.findOne({ text });
};

/**
 * Update vehicle by id
 * @param {ObjectId} vehicleId
 * @param {Object} updateBody
 * @returns {Promise<vehicle>}
 */
const updateVehicleById = async (vehicleId, updateBody) => {
  const vehicle = await getVehicleById(vehicleId);
  if (!vehicle) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Vehicle not found');
  }
  if (updateBody.text && (await vehicle.isTextTaken(updateBody.text, vehicleId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Text already taken');
  }
  Object.assign(vehicle, updateBody);
  await vehicle.save();
  return vehicle;
};

/**
 * Delete vehicle by id
 * @param {ObjectId} vehicleId
 * @returns {Promise<vehicle>}
 */
const deleteVehicleById = async (vehicleId) => {
  const vehicle = await getVehicleById(vehicleId);
  if (!vehicle) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Vehicle not found');
  }
  await vehicle.remove();
  return vehicle;
};

module.exports = {
  createVehicle,
  queryVehicles,
  queryVehiclesLike,
  getVehicleById,
  getVehicleByText,
  updateVehicleById,
  deleteVehicleById,
};
