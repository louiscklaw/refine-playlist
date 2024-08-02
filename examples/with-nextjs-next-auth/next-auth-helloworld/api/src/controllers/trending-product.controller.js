const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

// sample data
// [
//   {
//     "id": 1,
//     "product_id": 29,
//     "orderCount": 48
//   },
//   {
//     "id": 2,
//     "product_id": 32,
//     "orderCount": 48
//   }
// ]

const { trendingProductService } = require('../services');

const createTrendingProduct = catchAsync(async (req, res) => {
  const trendingProduct = await trendingProductService.createTrendingProduct(req.body);
  res.status(httpStatus.CREATED).send(trendingProduct);
});

const getTrendingProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['product_id', 'orderCount']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await trendingProductService.queryTrendingProducts(filter, options);
  res.send(result);
});

const getTrendingProduct = catchAsync(async (req, res) => {
  const trendingProduct = await trendingProductService.getTrendingProductById(req.params.trendingProductId);
  if (!trendingProduct) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Trending product not found');
  }
  res.send(trendingProduct);
});

const updateTrendingProduct = catchAsync(async (req, res) => {
  const trendingProduct = await trendingProductService.updateTrendingProductById(req.params.trendingProductId, req.body);
  res.send(trendingProduct);
});

const deleteTrendingProduct = catchAsync(async (req, res) => {
  await trendingProductService.deleteTrendingProductById(req.params.trendingProductId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getTrendingProductsAdvanced = catchAsync(async (req, res) => {
  const { _end, _start, q } = req.query;
  const result = await trendingProductService.queryTrendingProductsAdvanced({ _end, _start, q });
  res.send(result);
});

module.exports = {
  createTrendingProduct,
  getTrendingProducts,
  getTrendingProduct,
  updateTrendingProduct,
  deleteTrendingProduct,
  getTrendingProductsAdvanced,
};
