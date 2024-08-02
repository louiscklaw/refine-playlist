const Joi = require('joi');
const { objectId } = require('./custom.validation');

// sample data
// [
//   {
//     "id": 1,
//     "text": "Available"
//   },
//   {
//     "id": 2,
//     "text": "Offline"
//   },
//   {
//     "id": 3,
//     "text": "On delivery"
//   }
// ]

const createCourierStatus = {
  body: Joi.object().keys({
    text: Joi.string().required(),
  }),
};

const getCourierStatuses = {
  query: Joi.object().keys({
    text: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCourierStatus = {
  params: Joi.object().keys({
    courierStatusId: Joi.string().custom(objectId),
  }),
};

const updateCourierStatus = {
  params: Joi.object().keys({
    courierStatusId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      text: Joi.string(),
    })
    .min(1),
};

const deleteCourierStatus = {
  params: Joi.object().keys({
    courierStatusId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCourierStatus,
  getCourierStatuses,
  getCourierStatus,
  updateCourierStatus,
  deleteCourierStatus,
};
