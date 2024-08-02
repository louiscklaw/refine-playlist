const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const {
  orderService,
  customerService,
  vehicleService,
  courierService,
  storeService,
  orderStatusService,
  productService,
  userService,
} = require('../services');

const getPendingOrder = catchAsync(async (req, res) => {
  const pending_order_len = await orderService.queryPendingOrder();
  res.send({ pendingOrder: pending_order_len });
});

const createOrder = catchAsync(async (req, res) => {
  const order = await orderService.createOrder(req.body);
  res.status(httpStatus.CREATED).send(order);
});

const getOrders = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['userRel', 'statusId', 'storeId', 'courierId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await orderService.queryOrders(filter, options);
  res.send(result);
});

const getOrderByUserId = catchAsync(async (req, res) => {
  res.send({ hello: 'world' });
});

const getOrder = catchAsync(async (req, res) => {
  let order = await orderService.getOrderById(req.params.orderId);

  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }

  res.send(order);
});

const updateOrderStatus = catchAsync(async (req, res) => {
  console.log('helloworld ');

  const order = await orderService.updateOrderById(req.params.orderId, req.body);
  res.send(order);
});

const updateOrder = catchAsync(async (req, res) => {
  // NOTE: currently handle update order status only, only this page consume it.
  const order = await orderService.updateOrderById(req.params.orderId, req.body);

  res.send(order);
});

const deleteOrder = catchAsync(async (req, res) => {
  await orderService.deleteOrderById(req.params.orderId);
  res.status(httpStatus.NO_CONTENT).send();
});

// const getOrdersAdvanced_old = catchAsync(async (req, res) => {
//   const { _end, _start, q } = req.query;
//   let orders = await orderService.queryOrdersAdvanced({ _end, _start, q });
//   orders = orders.slice(0, 1);

//   let products_list = await productService.getProducts();

//   for (let i = 0; i < orders.length; i++) {
//     let order = orders[i]['_doc'];

//     let customer = await customerService.getCustomerById(order['customer']);
//     order['customer'] = customer;

//     let store = await storeService.getStoreById(order['store']);
//     order['store'] = store;

//     let courier = await courierService.getCourierById(order['courier']);
//     order['courier'] = courier;

//     let orderstatus = await orderStatusService.getOrderStatusById(order['status']);
//     order['status'] = orderstatus;

//     let products = [];
//     for (let i = 0; i < order['products'].length; i++) {
//       products.push(products_list.filter((product) => product['id'] == order['products'][i])[0]);
//     }
//     order['products'] = products;
//   }

//   res.send(orders);
// });

const getAll = catchAsync(async (req, res) => {
  let orders = [];
  let count = 0;

  if (Object.keys(req.query).includes('customer.id')) {
    console.log('query customer id');
    orders = await orderService.queryOrdersByUserId(req.query);
  } else if (Object.keys(req.query).includes('q') && req.query.q != '') {
    let result = await orderService.filterByContain(req.query.q);
    orders = result;
    count = orders.length;

    console.log('filter order by contain' + req.query.q);
  } else {
    console.log('default');
    let result = await orderService.queryAllOrders(req.query);
    orders = result.orders;
    count = result.count;
  }

  res.header('Access-Control-Expose-Headers', 'x-total-count');
  res.setHeader('X-Total-Count', count);
  res.send(orders);
});

const getOrdersWithSorted = catchAsync(async (req, res) => {
  const { _end, _start, q } = req.query;
  const result = await orderService.queryOrdersAdvanced({ _end, _start, q });
  res.send(result);
});

const getOrdersWithStatusText = catchAsync(async (req, res) => {
  const { _end, _start, q } = req.query;
  const result = await orderService.queryOrdersAdvanced({ _end, _start, q });
  res.send(result);
});

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  getAll,
  getOrdersWithSorted,
  getOrdersWithStatusText,
  getPendingOrder,
  updateOrderStatus,
  getOrderByUserId,
};
