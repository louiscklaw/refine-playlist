const Joi = require('joi');
const { objectId } = require('./custom.validation');

// sample data
// [
// {
//   "id": 1,
//   "name": "Stella Rolfson",
//   "email": "Beth.Baumbach@hotmail.com",
//   "gender": "Male",
//   "gsm": "(752) 945-0598",
//   "createdAt": "2023-09-06T06:18:35.744Z",
//   "accountNumber": 7088877265,
//   "licensePlate": "ZDZ 916",
//   "address": "11567 Mosciski Drive, Brooklyn, NY 11746",
//   "store_id": 9
//   "status_id": 3
//   "vehicle_id": 2,
//   "avatar_uid": "df24bc11-711e-4c16-987e-86b05ca6d5e4"
// }
// ]

const createCourier = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    gender: Joi.string().required(),
    gsm: Joi.string().required(),
    createdAt: Joi.date().required(),
    accountNumber: Joi.number().required(),
    licensePlate: Joi.string().required(),
    address: Joi.string().required(),
    store_id: Joi.number().required(),
    status_id: Joi.number().required(),
    vehicle_id: Joi.number().required(),
    avatar_uid: Joi.string().required(),
  }),
};

const getCouriers = {
  query: Joi.object().keys({
    text: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

// http://192.168.10.89:3031/v1/couriers?_end=10&_start=0&q=
const getCouriersAdvanced = {
  query: Joi.object().keys({
    _end: Joi.number().integer(),
    _start: Joi.number().integer(),
    q: Joi.string().allow(''),
  }),
};

const getCourier = {
  params: Joi.object().keys({
    courierId: Joi.string().custom(objectId),
  }),
};

const updateCourier = {
  params: Joi.object().keys({
    courierId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      email: Joi.string(),
      gender: Joi.string(),
      gsm: Joi.string(),
      createdAt: Joi.date(),
      accountNumber: Joi.number(),
      licensePlate: Joi.string(),
      address: Joi.string(),
      store_id: Joi.number(),
      status_id: Joi.number(),
      vehicle_id: Joi.number(),
      avatar_uid: Joi.string(),
    })
    .min(1),
};

const deleteCourier = {
  params: Joi.object().keys({
    courierId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCourier,
  getCouriers,
  getCourier,
  updateCourier,
  deleteCourier,
  getCouriersAdvanced,
};
