const Joi = require('joi');
const { objectId } = require('./custom.validation');

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

const createVehicle = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    isActive: Joi.bool().required(),
    description: Joi.string().required(),
    images: Joi.array().items(Joi.string()).required(),
    createdAt: Joi.date().required(),
    price: Joi.number().required(),
    category_id: Joi.number().required(),
  }),
};

const getVehicles = {
  query: Joi.object().keys({
    name: Joi.string(),
    isActive: Joi.bool(),
    description: Joi.string(),
    images: Joi.array().items(Joi.string()),
    createdAt: Joi.date(),
    price: Joi.number(),
    category_id: Joi.number(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getVehicle = {
  params: Joi.object().keys({
    vehicleId: Joi.string().custom(objectId),
  }),
};

const updateVehicle = {
  params: Joi.object().keys({
    vehicleId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      isActive: Joi.bool(),
      description: Joi.string(),
      images: Joi.array().items(Joi.string()),
      createdAt: Joi.date(),
      price: Joi.number(),
      category_id: Joi.number(),
    })
    .min(1),
};

const deleteVehicle = {
  params: Joi.object().keys({
    vehicleId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createVehicle,
  getVehicles,
  getVehicle,
  updateVehicle,
  deleteVehicle,
};
