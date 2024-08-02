// const Joi = require('joi');
// const { objectId } = require('./custom.validation');
//
// TODO: update to handle media
// const createProduct = {
//   body: Joi.object().keys({
//     name: Joi.string().required(),
//     isActive: Joi.bool().required(),
//     description: Joi.string().required(),
//     images: Joi.array().items(Joi.string()).required(),
//     createdAt: Joi.date().required(),
//     price: Joi.number().required(),
//     category_id: Joi.number().required(),
//   }),
// };

// const getProduct = {
//   params: Joi.object().keys({
//     productId: Joi.string().custom(objectId),
//   }),
// };

// const getProducts = {
//   query: Joi.object().keys({
//     name: Joi.string(),
//     isActive: Joi.bool(),
//     description: Joi.string(),
//     images: Joi.array().items(
//       Joi.object().keys({
//         url: Joi.string(),
//         thumbnailUrl: Joi.string(),
//         name: Joi.string(),
//         status: Joi.string(),
//         type: Joi.string(),
//         uid: Joi.string(),
//       })
//     ),
//     createdAt: Joi.date(),
//     price: Joi.number(),
//     category_id: Joi.number(),
//     sortBy: Joi.string(),
//     limit: Joi.number().integer(),
//     page: Joi.number().integer(),
//   }),
// };

// const updateProduct = {
//   params: Joi.object().keys({
//     productId: Joi.required().custom(objectId),
//   }),
//   body: Joi.object()
//     .keys({
//       name: Joi.string(),
//       isActive: Joi.bool(),
//       description: Joi.string(),
//       images: Joi.array().items(
//         Joi.object().keys({
//           // TODO: temporary solution, it should be without _id
//           _id: Joi.string().optional(),
//           url: Joi.string(),
//           thumbnailUrl: Joi.string(),
//           name: Joi.string(),
//           status: Joi.string(),
//           type: Joi.string(),
//           uid: Joi.string(),
//         })
//       ),
//       createdAt: Joi.date(),
//       price: Joi.number(),
//       category: Joi.object().keys({
//         // TODO: temporary solution, it should be without _id
//         _id: Joi.string().optional(),
//         id: Joi.number(),
//         title: Joi.string(),
//         isActive: Joi.bool(),
//       }),
//     })
//     .min(1),
// };

// const deleteProduct = {
//   params: Joi.object().keys({
//     productId: Joi.string().custom(objectId),
//   }),
// };

// // http://192.168.10.89:3031/v1/products?_end=10&_start=0&q=
// const getProductsAdvanced = {
//   query: Joi.object().keys({
//     _end: Joi.number().integer(),
//     _start: Joi.number().integer(),
//     q: Joi.string().allow(''),
//   }),
// };

module.exports = {
  // createProduct,
  // getProduct,
  // getProducts,
  // updateProduct,
  // deleteProduct,
  // getProductsAdvanced,
};
