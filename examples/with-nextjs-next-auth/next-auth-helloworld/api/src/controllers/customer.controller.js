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

const getAll1 = catchAsync(async (req, res) => {
  let customers = [];
  let count = 0;

  const { _end, _start, q } = req.query;
  const result = await customerService.queryCustomersAdvanced({ _end, _start, q });
  res.send(result);
});

const getAll = catchAsync(async (req, res) => {
  let customers = [];
  let count = 0;

  if (Object.keys(req.query).includes('customer.id')) {
    // console.log('query customer id');
    // orders = await customerService. queryOrdersByUserId(req.query);
    // NOTE: obsoleted path
  } else if (Object.keys(req.query).includes('q') && req.query.q != '') {
    let result = await customerService.filterByContain(req.query.q);
    orders = result;
    count = orders.length;

    console.log('filter order by contain' + req.query.q);
  } else {
    console.log('default');
    const { _end, _start, q } = req.query;
    let result = await customerService.queryCustomersAdvanced({ _end, _start, q });
    customers = result.customers;
    count = result.count;
  }

  res.header('Access-Control-Expose-Headers', 'x-total-count');
  res.setHeader('X-Total-Count', count);
  res.send(customers);
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
  getAll,
  getCustomersWithSorted,
  getCustomersWithStatusText,
};
