const Joi = require('joi');
const { objectId } = require('./custom.validation');

// sample data
// [
//   {
//     "id": 1,
//     "product_id": 29,
//     "orderCount": 48
//   },
//   {
//     "id": 2,
//     "product": 32
//     "orderCount": 48
//   }
// ]

const createTrendingProduct = {
  body: Joi.object().keys({
    product_id: Joi.string().required(),
    orderCount: Joi.number().required(),
  }),
};

const getTrendingProducts = {
  query: Joi.object().keys({
    product_id: Joi.string(),
    orderCount: Joi.number(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getTrendingProduct = {
  params: Joi.object().keys({
    trendingProductId: Joi.string().custom(objectId),
  }),
};

const updateTrendingProduct = {
  params: Joi.object().keys({
    trendingProductId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      product_id: Joi.string(),
      orderCount: Joi.number(),
    })
    .min(1),
};

const deleteTrendingProduct = {
  params: Joi.object().keys({
    trendingProductId: Joi.string().custom(objectId),
  }),
};

// http://192.168.10.89:3031/v1/trendingProducts?_end=10&_start=0&q=
const getTrendingProductsAdvanced = {
  query: Joi.object().keys({
    _end: Joi.number().integer(),
    _start: Joi.number().integer(),
    q: Joi.string().allow(''),
  }),
};

module.exports = {
  createTrendingProduct,
  getTrendingProducts,
  getTrendingProduct,
  updateTrendingProduct,
  deleteTrendingProduct,
  getTrendingProductsAdvanced,
};
