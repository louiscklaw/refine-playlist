const Joi = require('joi');
const { objectId } = require('./custom.validation');

// sample data
// [
// {
//   "id": 1,
//   "firstName": "Jacquelyn",
//   "lastName": "Price",
//   "fullName": "Jacquelyn Price",
//   "gender": "Female",
//   "gsm": "(682) 141-1082",
//   "createdAt": "2024-06-01T20:51:34.303Z",
//   "isActive": true,
//   "avatar": [
//     {
//       "name": "a0357223-48f9-4934-a854-37c426c60d12",
//       "percent": 100,
//       "size": 40088,
//       "status": "done",
//       "type": "image/jpeg",
//       "uid": "cc903562-0a91-4275-b1f1-cb8f76aaa871",
//       "url": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/781.jpg"
//     }
//   ],
//   "addresses": [
//     {
//       "text": "11741 Melissa Island, Lindenhurst, NY 11088",
//       "coordinate": ["40.64330479207367", "-73.96036511637116"]
//     },
//     {
//       "text": "11160 McDermott Mountains, Lindenhurst, NY 11827",
//       "coordinate": ["40.81981120494367", "-73.8489387340475"]
//     },
//     {
//       "text": "11518 Stephania Brooks, Massapequa, NY 11725",
//       "coordinate": ["40.711761421529296", "-74.00445441641631"]
//     }
//   ]
// }
// ]

const createCustomer = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    fullName: Joi.string().required(),
    gender: Joi.string().required(),
    gsm: Joi.string().required(),
    createdAt: Joi.date().required(),
    isActive: Joi.bool().required(),
    avatar: Joi.array()
      .items(
        Joi.object().keys({
          name: Joi.string().required(),
          percent: Joi.number().required(),
          size: Joi.number().required(),
          status: Joi.string().required(),
          type: Joi.string().required(),
          uid: Joi.string().required(),
          url: Joi.string().required(),
        })
      )
      .required(),
    addresses: Joi.array()
      .items(
        Joi.object().keys({
          text: Joi.string().required(),
          coordinate: Joi.array().items(Joi.number()).length(2).required(),
        })
      )
      .required(),
  }),
};

const getCustomers = {
  query: Joi.object().keys({
    firstName: Joi.string().allow('').optional(),
    lastName: Joi.string().allow('').optional(),
    fullName: Joi.string().allow('').optional(),
    gender: Joi.string().allow('').optional(),
    gsm: Joi.string().allow('').optional(),
    sortBy: Joi.string().allow('').optional(),
    limit: Joi.number().integer().optional(),
    page: Joi.number().integer().optional(),
    q: Joi.string().allow('').optional(),
    _end: Joi.number().integer().optional(),
    _start: Joi.number().integer().optional(),
  }),
};

const getCustomer = {
  params: Joi.object().keys({
    customerId: Joi.string().custom(objectId),
  }),
};

const updateCustomer = {
  params: Joi.object().keys({
    customerId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      fullName: Joi.string(),
      gender: Joi.string(),
      gsm: Joi.string(),
      avatar: Joi.array().items(
        Joi.object().keys({
          name: Joi.string(),
          percent: Joi.number(),
          size: Joi.number(),
          status: Joi.string(),
          type: Joi.string(),
          uid: Joi.string(),
          url: Joi.string(),
        })
      ),
      addresses: Joi.array().items(
        Joi.object().keys({
          text: Joi.string(),
          coordinate: Joi.array().items(Joi.number()).length(2),
        })
      ),
    })
    .min(1),
};

const deleteCustomer = {
  params: Joi.object().keys({
    customerId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCustomer,
  getCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
};
