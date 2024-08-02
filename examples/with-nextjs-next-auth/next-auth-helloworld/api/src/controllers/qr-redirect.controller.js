const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const { categoryService, imageFileService, qrRedirectService } = require('../services');
const { QrRedirect } = require('../models');

const createQrRedirect = catchAsync(async (req, res) => {
  const category = await qrRedirectService.createQrRedirect(req.body);

  res.status(httpStatus.CREATED).send(category);
});

const getQrRedirects = catchAsync(async (req, res) => {
  let qr_redirects = await qrRedirectService.getQrRedirects();
  // qr_redirects = qr_redirects.slice(0, 2);

  res.send(qr_redirects);
});

const getQrRedirect = catchAsync(async (req, res) => {
  const qr_redirect = await qrRedirectService.getQrRedirectById(req.params.categoryId);

  if (!qr_redirect) {
    throw new ApiError(httpStatus.NOT_FOUND, 'qr_redirect not found');
  }

  // for (let i = 0; i < qr_redirect.images.length; i++) {
  //   const image = await imageFileService.getImageMetaById(qr_redirect.images[i]);
  //   qr_redirect.images[i] = image;
  // }

  res.send(qr_redirect);
});

const updateQrRedirect = catchAsync(async (req, res) => {
  console.log(req.body);
  let { description: escaped_description } = req.body;
  req.body.description = escaped_description.replace(/&lt;/g, '<');

  const category = await qrRedirectService.updateQrRedirectById(req.params.categoryId, req.body);
  res.send(category);
});

const deleteQrRedirect = catchAsync(async (req, res) => {
  await qrRedirectService.deleteQrRedirectById(req.params.categoryId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createQrRedirect,
  getQrRedirects,
  getQrRedirect,
  updateQrRedirect,
  deleteQrRedirect,
};
