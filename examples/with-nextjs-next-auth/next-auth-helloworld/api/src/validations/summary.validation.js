const Joi = require('joi');
const { objectId } = require('./custom.validation');

// sample data
// [
//   {
//     "id": "sales",
//     "sales": "71,465",
//     "percent": 32,
//     "target": "225,000"
//   }
// ]

const createSummary = {
  body: Joi.object().keys({
    id: Joi.string().required(),
    sales: Joi.string().required(),
    percent: Joi.number().required(),
    target: Joi.string().required(),
  }),
};

const getSummaries = {
  query: Joi.object().keys({
    id: Joi.string(),
    sales: Joi.string(),
    percent: Joi.number(),
    target: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getSummary = {
  params: Joi.object().keys({
    summaryId: Joi.string().custom(objectId),
  }),
};

const updateSummary = {
  params: Joi.object().keys({
    summaryId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      id: Joi.string(),
      sales: Joi.string(),
      percent: Joi.number(),
      target: Joi.string(),
    })
    .min(1),
};

const deleteSummary = {
  params: Joi.object().keys({
    summaryId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createSummary,
  getSummaries,
  getSummary,
  updateSummary,
  deleteSummary,
};
