const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const { orderStatusService } = require('../services');

const createOrderStatus = catchAsync(async (req, res) => {
  const orderStatus = await orderStatusService.createOrderStatus(req.body);
  res.status(httpStatus.CREATED).send(orderStatus);
});

// const getOrderStatuses = catchAsync(async (req, res) => {
//   const filter = pick(req.query, ['name', 'role']);
//   const options = pick(req.query, ['sortBy', 'limit', 'page']);
//   const result = await orderStatusService.queryOrderStatuses(filter, options);
//   res.send(result);
// });

const getOrderStatuses = catchAsync(async (req, res) => {
  const result = await orderStatusService.queryOrderStatuses();
  console.log({ result });
  res.send(result);
});

const getOrderStatus = catchAsync(async (req, res) => {
  const orderStatus = await orderStatusService.getOrderStatusById(req.params.orderStatusId);

  if (!orderStatus) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order Status not found');
  }

  res.send(orderStatus);
});

const updateOrderStatus = catchAsync(async (req, res) => {
  const orderStatus = await orderStatusService.updateOrderStatusById(req.params.orderStatusId, req.body);
  res.send(orderStatus);
});

const deleteOrderStatus = catchAsync(async (req, res) => {
  await orderStatusService.deleteOrderStatusById(req.params.orderStatusId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createOrderStatus,
  getOrderStatuses,
  getOrderStatus,
  updateOrderStatus,
  deleteOrderStatus,
};
