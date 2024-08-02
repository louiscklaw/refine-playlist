const Joi = require('joi');
const { objectId } = require('./custom.validation');

// sample data
// [
//   {
//     "id": 1,
//     "text": "Pending"
//   },
//   {
//     "id": 2,
//     "text": "Ready"
//   },
//   {
//     "id": 3,
//     "text": "On The Way"
//   },
//   {
//     "id": 4,
//     "text": "Delivered"
//   },
//   {
//     "id": 5,
//     "text": "Cancelled"
//   }
// ]

const createOrderStatus = {
  body: Joi.object().keys({
    text: Joi.string().required(),
  }),
};

const getOrderStatuses = {
  query: Joi.object().keys({
    text: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getOrderStatus = {
  params: Joi.object().keys({
    orderStatusId: Joi.string().custom(objectId),
  }),
};

const updateOrderStatus = {
  params: Joi.object().keys({
    orderStatusId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      text: Joi.string(),
    })
    .min(1),
};

const deleteOrderStatus = {
  params: Joi.object().keys({
    orderStatusId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createOrderStatus,
  getOrderStatuses,
  getOrderStatus,
  updateOrderStatus,
  deleteOrderStatus,
};
