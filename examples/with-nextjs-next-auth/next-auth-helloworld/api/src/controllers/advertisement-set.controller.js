const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const {
  advertisementService,
  categoryService,
  imageFileService,
  restaurantLogService,
  advertisementCatService,
  advertisementSetService,
} = require('../services');

const createAdvertisement = catchAsync(async (req, res) => {
  const advertisement = await advertisementService.createAdvertisement(req.body);

  res.status(httpStatus.CREATED).send(advertisement);
});

const getCategories3 = catchAsync(async (req, res) => {
  let categories = await categoryService.getCategories();
  // categories = categories.slice(0, 2);

  for (let j = 0; j < categories.length; j++) {
    const category = categories[j];
    for (let i = 0; i < category.images.length; i++) {
      const url = await imageFileService.getImageFileUrlById(category.images[i]);
      category.images[i] = { url };
    }
  }

  res.send(categories);
});

const getAll = catchAsync(async (req, res) => {
  // let result = await advertisementService.getAdvertisements(req.query);
  let { result, count } = await advertisementSetService.getAll(req.query);

  res.header('Access-Control-Expose-Headers', 'x-total-count');
  res.setHeader('X-Total-Count', count);

  res.send(result);
});

const getById = catchAsync(async (req, res) => {
  let { advertisementSetId } = req.params;
  const result = await advertisementSetService.getById(advertisementSetId);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Advertisement Cat not found');
  }

  res.send(result);
});

const updateById = catchAsync(async (req, res) => {
  const { advertisementSetId } = req.params;
  const result = await advertisementSetService.updateById(advertisementSetId, req.body);

  await restaurantLogService.internalCreateRestaurantLog({
    log_type: 'INFO',
    description: 'update advertisement, content: ',
    meta: req.body,
  });

  res.send(result);
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

const deleteAdvertisement = catchAsync(async (req, res) => {
  await advertisementService.deleteAdvertisementById(req.params.advertisementId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getAll,
  getById,
  createAdvertisement,
  updateById,
  deleteAdvertisement,
  // activateAdvertisement,
  // deActivateAdvertisement,
};
