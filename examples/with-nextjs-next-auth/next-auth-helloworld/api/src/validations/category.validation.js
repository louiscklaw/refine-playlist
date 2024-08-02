const Joi = require('joi');
const { objectId } = require('./custom.validation');

// sample data
// [
//   {
//     "id": 1,
//     "title": "🍟 Starters",
//     "isActive": true
//   },
//   {
//     "id": 2,
//     "title": "🍝 Pastas",
//     "isActive": true
//   },
//   {
//     "id": 10,
//     "title": "☕ Hot Drinks",
//     "isActive": true
//   }
// ]

const createCategory = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    isActive: Joi.bool().required(),
  }),
};

const getCategories = {
  query: Joi.object().keys({
    title: Joi.string().optional(),
    isActive: Joi.bool().optional(),
    sortBy: Joi.string().optional(),
    limit: Joi.number().integer().optional(),
    page: Joi.number().integer().optional(),
  }),
};

const getCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().custom(objectId),
  }),
};

const updateCategory = {
  params: Joi.object().keys({
    categoryId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      isActive: Joi.bool(),
    })
    .min(1),
};

const deleteCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
