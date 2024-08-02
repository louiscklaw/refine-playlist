const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { storeService } = require('../services');

// sample data
// [
//   {
//     "id": 1,
//     "title": "Camryn Ridge",
//     "email": "Bridget19@gmail.com",
//     "gsm": "(132) 035-3190",
//     "isActive": false,
//     "createdAt": "2023-11-26T12:49:17.153Z",
//     "address": {
//       "text": "11060 Adrain Lane, Brooklyn, NY 11686",
//       "coordinate": [
//         "40.67383279814411",
//         "-73.97836946535837"
//       ]
//     },
//     "products_id": [1,2,3,4,5]
//   }
// ]

const createStore = catchAsync(async (req, res) => {
  const store = await storeService.createStore(req.body);
  res.status(httpStatus.CREATED).send(store);
});

const getStores = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await storeService.queryStores(filter, options);
  res.send(result);
});

const getStore = catchAsync(async (req, res) => {
  const store = await storeService.getStoreById(req.params.storeId);
  if (!store) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Store not found');
  }
  res.send(store);
});

const updateStore = catchAsync(async (req, res) => {
  const store = await storeService.updateStoreById(req.params.storeId, req.body);
  res.send(store);
});

const deleteStore = catchAsync(async (req, res) => {
  await storeService.deleteStoreById(req.params.storeId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getStoresAdvanced = catchAsync(async (req, res) => {
  const { _end, _start, q } = req.query;
  const result = await storeService.queryStoresAdvanced({ _end, _start, q });
  res.send(result);
});

module.exports = {
  createStore,
  getStores,
  getStore,
  updateStore,
  deleteStore,
  getStoresAdvanced,
};
