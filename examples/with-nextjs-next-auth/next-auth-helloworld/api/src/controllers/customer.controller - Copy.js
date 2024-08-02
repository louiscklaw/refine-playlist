const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const { customerService } = require('../services');

const createCustomer = catchAsync(async (req, res) => {
  const customer = await customerService.createCustomer(req.body);
  res.status(httpStatus.CREATED).send(customer);
});

const getCustomers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['userRel', 'statusId', 'storeId', 'courierId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await customerService.queryCustomers(filter, options);
  res.send(result);
});

const getCustomer = catchAsync(async (req, res) => {
  const customer = await customerService.getCustomerById(req.params.customerId);
  if (!customer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Customer not found');
  }
  res.send(customer);
});

const updateCustomer = catchAsync(async (req, res) => {
  const customer = await customerService.updateCustomerById(req.params.customerId, req.body);
  res.send(customer);
});

const deleteCustomer = catchAsync(async (req, res) => {
  await customerService.deleteCustomerById(req.params.customerId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getAll = catchAsync(async (req, res) => {
  const { _end, _start, q } = req.query;
  const result = await customerService.queryCustomersAdvanced({ _end, _start, q });
  res.send(result);
});

const getCustomersWithSorted = catchAsync(async (req, res) => {
  const { _end, _start, q } = req.query;
  const result = await customerService.queryCustomersAdvanced({ _end, _start, q });
  res.send(result);
});

const getCustomersWithStatusText = catchAsync(async (req, res) => {
  const { _end, _start, q } = req.query;
  const result = await customerService.queryCustomersAdvanced({ _end, _start, q });
  res.send(result);
});

module.exports = {
  createCustomer,
  getCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomersAdvanced: getAll,
  getCustomersWithSorted,
  getCustomersWithStatusText,
};
