const Joi = require('joi');
const { objectId } = require('./custom.validation');

// sample data
// [
//   {
//     "id": 5,
//     "text": "Cancelled"
//   }
// ]

const createStatus = {
  body: Joi.object().keys({
    text: Joi.string().required(),
  }),
};

const getStatuses = {
  query: Joi.object().keys({
    text: Joi.string(),
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
      text: Joi.string(),
    })
    .min(1),
};

const deleteStatus = {
  params: Joi.object().keys({
    statusId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createStatus,
  getStatuses,
  getStatus,
  updateStatus,
  deleteStatus,
};
