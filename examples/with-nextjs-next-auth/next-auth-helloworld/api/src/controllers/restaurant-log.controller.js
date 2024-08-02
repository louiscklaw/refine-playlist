const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { logService, imageFileService, userService, restaurantLogService } = require('../services');

const createRestaurantLog = catchAsync(async (req, res) => {
  const log = await logService.createLog(req.body);

  res.status(httpStatus.CREATED).send(log);
});

const getRestaurantLogs = catchAsync(async (req, res) => {
  let result = await restaurantLogService.getAll(req.query);

  let { restaurantLogs, count } = result;

  res.header('Access-Control-Expose-Headers', 'x-total-count');
  res.setHeader('X-Total-Count', count);

  res.send(restaurantLogs);
});

const getRestaurantLog = catchAsync(async (req, res) => {
  try {
    let { restaurantLogId } = req.params;
    let result = await restaurantLogService.getRestaurantLog(restaurantLogId);

    res.send(result);
  } catch (error) {
    ApiError('error during getting log');
  }
});

const getCategory = catchAsync(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.categoryId);

  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }

  for (let i = 0; i < category.images.length; i++) {
    const url = await imageFileService.getImageFileUrlById(category.images[i]);
    category.images[i] = { url };
  }

  res.send(category);
});

const updateCategory = catchAsync(async (req, res) => {
  const category = await categoryService.updateCategoryById(req.params.categoryId, req.body);
  res.send(category);
});

const activateCategory = catchAsync(async (req, res) => {
  let { categoryId } = req.params;
  const category = await categoryService.updateCategoryById(categoryId, {
    isActive: true,
  });
  res.send(category);
});

const deActivateCategory = catchAsync(async (req, res) => {
  let { categoryId } = req.params;
  const category = await categoryService.updateCategoryById(categoryId, {
    isActive: false,
  });
  res.send(category);
});
const deleteEvent = catchAsync(async (req, res) => {
  await categoryService.deleteEventById(req.params.eventId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createRestaurantLog,
  getRestaurantLogs,
  getRestaurantLog,
  // getLog,
  // updateLog,
  // deleteLog,
  // activateLog,
  // deActivateLog,
};
