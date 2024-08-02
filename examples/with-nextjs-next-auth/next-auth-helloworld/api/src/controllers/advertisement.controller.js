const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { advertisementService, categoryService, imageFileService, restaurantLogService } = require('../services');

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

const getAll1 = catchAsync(async (req, res) => {
  let result = await advertisementService.getAdvertisements(req.query);

  let advertisements = result.advertisements;
  // categories = categories.slice(0, 2);

  let count = result.count;

  res.header('Access-Control-Expose-Headers', 'x-total-count');

  // FIXME: should use this
  // res.setHeader('X-Total-Count', result.advertisements.count);
  res.setHeader('X-Total-Count', count);

  res.send(advertisements);
});

const getAll = catchAsync(async (req, res) => {
  let advertisements = [];
  let count = 0;

  console.log('helloworld');

  if (Object.keys(req.query).includes('customer.id')) {
    // console.log('query customer id');
    // advertisements = await advertisementService.queryOrdersByUserId(req.query);
    // NOTE: obsoleted path
  } else if (Object.keys(req.query).includes('q') && req.query.q != '') {
    let result = await advertisementService.filterByContain(req.query.q);
    advertisements = result;
    count = advertisements.length;

    console.log('filter order by contain' + req.query.q);
  } else {
    console.log('default');
    let result = await advertisementService.getAdvertisements(req.query);
    advertisements = result.advertisements;
    count = result.count;
  }

  res.header('Access-Control-Expose-Headers', 'x-total-count');
  res.setHeader('X-Total-Count', count);
  res.send(advertisements);
});

const getAdvertisement = catchAsync(async (req, res) => {
  const advertisement = await advertisementService.getAdvertisementById(req.params.advertisementId);

  if (!advertisement) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Advertisement not found');
  }

  res.send(advertisement);
});

const updateAdvertisement = catchAsync(async (req, res) => {
  const advertisement = await advertisementService.updateAdvertisementById(req.params.advertisementId, req.body);

  await restaurantLogService.internalCreateRestaurantLog({
    log_type: 'INFO',
    description: 'update advertisement, content: ',
    meta: req.body,
  });

  res.send(advertisement);
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
  getAdvertisement,
  createAdvertisement,
  updateAdvertisement,
  deleteAdvertisement,
  // activateAdvertisement,
  // deActivateAdvertisement,
};
