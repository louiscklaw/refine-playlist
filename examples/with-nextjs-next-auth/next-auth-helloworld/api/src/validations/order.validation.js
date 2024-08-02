const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createOrder = {
  body: Joi.object().keys({
    text: Joi.string().required(),
  }),
};

const getOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId),
  }),
};

const updateOrder = {
  params: Joi.object().keys({
    orderId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      status: Joi.object().keys({
        id: Joi.number().integer(),
        text: Joi.string(),
      }),
    })
    .min(1),
};

const deleteOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId),
  }),
};

// http://192.168.10.89:3031/v1/orders?_end=10&_start=0&q=
const getOrdersAdvanced = {
  query: Joi.object().keys({
    _end: Joi.number().integer(),
    _start: Joi.number().integer(),
    q: Joi.string().allow('').optional(),
  }),
};

// http://192.168.10.89:3031/v1/orders?_end=10&_start=0&status.text=Pending
// http://192.168.10.89:3031/v1/orders?_end=7&_start=0&_sort=createdAt&_order=desc
const getOrders = {
  // text: Joi.string(),
  // sortBy: Joi.string(),
  // limit: Joi.number().integer(),
  // page: Joi.number().integer(),
  query: Joi.object().keys({
    _start: Joi.number().integer().optional(),
    _end: Joi.number().integer().optional(),
    'status.text': Joi.string().optional(),
    _sort: Joi.string().optional(),
    _order: Joi.string().allow('').optional(),
    q: Joi.string().allow('').optional(),
  }),
};

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  getOrdersAdvanced,
};
