const Joi = require('joi');
const { objectId } = require('./custom.validation');

// sample data
// [
//   {
//     "id": 1,
//     "order_id": 622,
//     "user_id": 112,
//     "star": 4,
//     "createdAt": "2024-06-29T15:53:37.424Z",
//     "status": "pending",
//     "comment": [
//       "The box this comes in is 3 inch by 6 centimeter and weights 15 ounce!"
//     ]
//   }
// ]

const createReview = {
  body: Joi.object().keys({
    order_id: Joi.string().required(),
    user_id: Joi.string().required(),
    star: Joi.number().required(),
    comment: Joi.array().items(Joi.string()).required(),
  }),
};

// http://192.168.10.89:3031/v1/reviews?order.courier.id=1
const getReviews = {
  query: Joi.object().keys({
    'order.courier.id': Joi.string().optional(),
    order_id: Joi.string().optional(),
    user_id: Joi.string().optional(),
    star: Joi.number().optional(),
    createdAt: Joi.date().optional(),
    status: Joi.string().optional(),
    sortBy: Joi.string().optional(),
    limit: Joi.number().integer().optional(),
    page: Joi.number().integer().optional(),
  }),
};

const getReview = {
  params: Joi.object().keys({
    reviewId: Joi.string().custom(objectId),
  }),
};

const updateReview = {
  params: Joi.object().keys({
    reviewId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      order_id: Joi.string(),
      user_id: Joi.string(),
      star: Joi.number(),
      createdAt: Joi.date(),
      status: Joi.string(),
      comment: Joi.array().items(Joi.string()),
    })
    .min(1),
};

const deleteReview = {
  params: Joi.object().keys({
    reviewId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
};
