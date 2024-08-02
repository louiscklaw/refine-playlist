const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const { courierService, courierStatusService, storeService, vehicleService } = require('../services');
const logger = require('../config/logger');

const createCourier = catchAsync(async (req, res) => {
  let createBody = req.body;

  let courierStatus = await courierStatusService.getCourierStatusByText('Offline');
  createBody['status'] = { _id: courierStatus.id };

  createBody['vehicle']['_id'] = createBody['vehicle']['id'];
  delete createBody['vehicle']['id'];

  createBody['store']['_id'] = createBody['store']['id'];
  delete createBody['store']['id'];

  const courier = await courierService.createCourier(createBody);

  res.status(httpStatus.CREATED).send(courier);
});

const getCouriers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await courierService.queryCouriers(filter, options);
  res.send(result);
});

// const getCouriersAdvanced = catchAsync(async (req, res) => {
//   try {
//     const { _end, _start, q } = req.query;
//     var couriers = await courierService.queryCouriersAdvanced({ _end, _start, q });

//     for (var i = 0; i < couriers.length; i++) {
//       let courier = couriers[i];
//       const status = await courierStatusService.getCourierStatusById(courier['_doc'].status);
//       const store = await storeService.getStoreById(courier['_doc'].store);
//       var vehicle = await vehicleService.getVehicleById(courier['_doc'].vehicle);

//       courier['_doc'].status = status;
//       courier['_doc'].store = store;
//       courier['_doc'].vehicle = vehicle;
//     }

//     res.send(couriers);
//   } catch (error) {
//     logger.error({ req });
//   }
// });

const getCouriersAdvanced = catchAsync(async (req, res) => {
  var couriers = await courierService.queryCouriersAdvanced(req.query);
  res.send(couriers);
});

const getCourier = catchAsync(async (req, res) => {
  const courier = await courierService.getCourierById(req.params.courierId);

  if (!courier) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Courier not found');
  }

  res.send(courier);
});

const updateCourier = catchAsync(async (req, res) => {
  try {
    let { courierId } = req.params;
    const courier = await courierService.updateCourierById(courierId, req.body);
    res.send(courier);
  } catch (error) {
    console.log(error);
  }
});

const deleteCourier = catchAsync(async (req, res) => {
  await courierService.deleteCourierById(req.params.courierId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCourier,
  getCouriers,
  getCourier,
  updateCourier,
  deleteCourier,
  getCouriersAdvanced,
};
