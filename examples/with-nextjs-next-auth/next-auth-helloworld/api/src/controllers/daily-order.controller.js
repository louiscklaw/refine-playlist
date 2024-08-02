const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

// sample data
// [
//   {
//     "id": "sales",
//     "sales": "71,465",
//     "percent": 32,
//     "target": "225,000"
//   }
// ]

const { summaryService } = require('../services');

const createSummary = catchAsync(async (req, res) => {
  const summary = await summaryService.createSummary(req.body);
  res.status(httpStatus.CREATED).send(summary);
});

const getSummaries = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await summaryService.querySummaries(filter, options);
  res.send(result);
});

const getSummary = catchAsync(async (req, res) => {
  const summary = await summaryService.getSummaryById(req.params.summaryId);
  if (!summary) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Summary not found');
  }
  res.send(summary);
});

const updateSummary = catchAsync(async (req, res) => {
  const summary = await summaryService.updateSummaryById(req.params.summaryId, req.body);
  res.send(summary);
});

const deleteSummary = catchAsync(async (req, res) => {
  await summaryService.deleteSummaryById(req.params.summaryId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getDailyOrders = catchAsync(async (req, res) => {
  res.send({
    data: [
      {
        date: '2024-06-26T00:00:00.000Z',
        value: 33,
      },
      {
        date: '2024-06-27T00:00:00.000Z',
        value: 51,
      },
      {
        date: '2024-06-28T00:00:00.000Z',
        value: 42,
      },
      {
        date: '2024-06-29T00:00:00.000Z',
        value: 46,
      },
      {
        date: '2024-06-30T00:00:00.000Z',
        value: 47,
      },
      {
        date: '2024-07-01T00:00:00.000Z',
        value: 46,
      },
      {
        date: '2024-07-02T00:00:00.000Z',
        value: 42,
      },
    ],
    trend: 150,
    total: 223,
  });
});

module.exports = {
  getDailyOrders,
};
