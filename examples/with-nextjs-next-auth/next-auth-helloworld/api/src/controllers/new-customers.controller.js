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

const getNewCustomers = catchAsync(async (req, res) => {
  console.log('something1123');
  req.query.color1 === 'red'; // true
  res.send({ d: req.query });
});

const getNewCustomers1 = catchAsync(async (req, res) => {
  res.send({
    data: [
      {
        date: '2024-06-26T00:00:00.000Z',
        value: 862,
      },
      {
        date: '2024-06-27T00:00:00.000Z',
        value: 1333,
      },
      {
        date: '2024-06-28T00:00:00.000Z',
        value: 969,
      },
      {
        date: '2024-06-29T00:00:00.000Z',
        value: 1152,
      },
      {
        date: '2024-06-30T00:00:00.000Z',
        value: 1249,
      },
      {
        date: '2024-07-01T00:00:00.000Z',
        value: 1072,
      },
      {
        date: '2024-07-02T00:00:00.000Z',
        value: 1048,
      },
    ],
    trend: 80,
    total: 5490,
  });
});

module.exports = {
  getNewCustomers,
};
