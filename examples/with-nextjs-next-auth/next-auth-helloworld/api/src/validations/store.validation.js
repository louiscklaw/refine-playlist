const Joi = require('joi');
const { objectId } = require('./custom.validation');

// sample data
// [
//   {
//     "id": 1,
//     "title": "Camryn Ridge",
//     "email": "Bridget19@gmail.com",
//     "gsm": "(132) 035-3190",
//     "isActive": false,
//     "createdAt": "2023-11-26T12:49:17.153Z",
//     "address": {
//       "text": "11060 Adrain Lane, Brooklyn, NY 11686",
//       "coordinate": [
//         "40.67383279814411",
//         "-73.97836946535837"
//       ]
//     },
//     "products_id": [1,2,3,4,5]
//   }
// ]

const createStatus = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    email: Joi.string().email().required(),
    gsm: Joi.string().required(),
    isActive: Joi.bool().required(),
    createdAt: Joi.date().required(),
    address: Joi.object()
      .keys({
        text: Joi.string().required(),
        coordinate: Joi.array().items(Joi.number()).length(2).required(),
      })
      .required(),
    products_id: Joi.array().items(Joi.number()).required(),
  }),
};

const getStatuses = {
  query: Joi.object().keys({
    title: Joi.string(),
    email: Joi.string(),
    gsm: Joi.string(),
    isActive: Joi.bool(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getStatus = {
  params: Joi.object().keys({
    statusId: Joi.string().custom(objectId),
  }),
};

const updateStatus = {
  params: Joi.object().keys({
    statusId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      email: Joi.string().email(),
      gsm: Joi.string(),
      isActive: Joi.bool(),
      address: Joi.object().keys({
        text: Joi.string(),
        coordinate: Joi.array().items(Joi.number()).length(2),
      }),
      products_id: Joi.array().items(Joi.number()),
    })
    .min(1),
};

const deleteStatus = {
  params: Joi.object().keys({
    statusId: Joi.string().custom(objectId),
  }),
};

// http://192.168.10.89:3031/v1/orders?_end=10&_start=0&q=
const getStoresAdvanced = {
  query: Joi.object().keys({
    _end: Joi.number().integer(),
    _start: Joi.number().integer(),
    q: Joi.string().allow(''),
  }),
};

module.exports = {
  createStatus,
  getStatuses,
  getStatus,
  updateStatus,
  deleteStatus,
  getStoresAdvanced,
};
