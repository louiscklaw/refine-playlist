const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const { courierStatusService } = require('../services');

const createCourierStatus = catchAsync(async (req, res) => {
  const courierStatus = await courierStatusService.createCourierStatus(req.body);
  res.status(httpStatus.CREATED).send(courierStatus);
});

const getCourierStatusesOld = catchAsync(async (req, res) => {
  // const filter = pick(req.query, ['name', 'role']);
  // const options = pick(req.query, ['sortBy', 'limit', 'page']);
  // const result = await courierStatusService.queryCourierStatuses(filter, options);
  // res.send(result);
});

const getCourierStatuses = catchAsync(async (req, res) => {
  // const filter = pick(req.query, ['name', 'role']);
  // const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await courierStatusService.queryCourierStatuses();
  res.send(result);
});

const getCourierStatus = catchAsync(async (req, res) => {
  const courierStatus = await courierStatusService.getCourierStatusById(req.params.courierStatusId);
  if (!courierStatus) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Courier status not found');
  }
  res.send(courierStatus);
});

const updateCourierStatus = catchAsync(async (req, res) => {
  const courierStatus = await courierStatusService.updateCourierStatusById(req.params.courierStatusId, req.body);
  res.send(courierStatus);
});

const deleteCourierStatus = catchAsync(async (req, res) => {
  await courierStatusService.deleteCourierStatusById(req.params.courierStatusId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCourierStatus,
  getCourierStatuses,
  getCourierStatus,
  updateCourierStatus,
  deleteCourierStatus,
};
