const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createProduct = {
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

const getProducts = {
  query: Joi.object().keys({
    name: Joi.string(),
    isActive: Joi.bool(),
    description: Joi.string(),
    images: Joi.array().items(
      Joi.object().keys({
        _id: Joi.string().optional(),
        url: Joi.string(),
        thumbnailUrl: Joi.string().optional(),
        name: Joi.string(),
        status: Joi.string().optional(),
        type: Joi.string().optional(),
        uid: Joi.string().optional(),
        size: Joi.number().optional(),
        lastModified: Joi.number().optional(),
      })
    ),
    createdAt: Joi.date(),
    price: Joi.number(),
    category_id: Joi.number(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      isActive: Joi.bool(),
      description: Joi.string(),
      images: Joi.array().items(
        Joi.object().keys({
          // TODO: temporary solution, it should be without _id
          _id: Joi.string().optional(),
          url: Joi.string(),
          thumbnailUrl: Joi.string().optional(),
          name: Joi.string(),
          status: Joi.string().optional(),
          type: Joi.string().optional(),
          uid: Joi.string().optional(),
          size: Joi.number().optional(),
          lastModified: Joi.number().optional(),
        })
      ),
      createdAt: Joi.date(),
      price: Joi.number(),
      category: Joi.object().keys({
        // TODO: temporary solution, it should be without _id
        _id: Joi.string().optional(),
        id: Joi.number(),
        title: Joi.string(),
        isActive: Joi.bool(),
      }),
    })
    .min(1),
};

const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

// http://192.168.10.89:3031/v1/products?_end=10&_start=0&q=
const getProductsAdvanced = {
  query: Joi.object().keys({
    _end: Joi.number().integer(),
    _start: Joi.number().integer(),
    q: Joi.string().allow(''),
  }),
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductsAdvanced,
};
