const Joi = require('joi');
const { objectId } = require('./custom.validation');

// http://192.168.10.89:3031/v1/dailyRevenue?&end=2024-07-03T23%3A59%3A59%2B08%3A00&start=2024-06-27T00%3A00%3A00%2B08%3A00

const getNewCustomers = {
  query: Joi.object().keys({
    end: Joi.string(),
    start: Joi.string(),
  }),
};

module.exports = {
  getNewCustomers,
};
