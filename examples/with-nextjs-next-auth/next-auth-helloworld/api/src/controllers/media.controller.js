const httpStatus = require('http-status');
// const pick = require('../utils/pick');
// const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
var mmm = require('mmmagic'),
  Magic = mmm.Magic;

const formidable = require('formidable');
const uuid = require('uuid').v4();
const fs = require('fs');
const path = require('path');

const logger = require('../config/logger');
const { imageFileService } = require('../services');
const ImageFile = require('../models/image-file.model');

// const { productService } = require('../services');

const createMedia = catchAsync(async (req, res) => {
  console.log(req.file.filename);

  let image_file = await imageFileService.createImageFile(req.file.filename);
  delete image_file['data'];

  // res.status(httpStatus.CREATED).send({ url: `http://192.168.10.89:3031/v1/media/${uuid}` });
  res.send(image_file);
});

const getMedia = catchAsync(async (req, res) => {
  const { uuid } = req.params;
  const image_file = await imageFileService.getImageFileByUuid(uuid);

  res.set('Content-Disposition', 'inline');
  res.contentType(image_file.type);
  res.send(image_file.data);
});

// const getMedias = catchAsync(async (req, res) => {
//   const filter = pick(req.query, ['name', 'isActive', 'description', 'images', 'createdAt', 'price', 'category_id']);
//   const options = pick(req.query, ['sortBy', 'limit', 'page']);
//   const result = await productService.queryMedias(filter, options);
//   res.send(result);
// });

// const updateMedia = catchAsync(async (req, res) => {
//   const media = await productService.updateMediaById(req.params.productId, req.body);
//   res.send(media);
// });

// const deleteMedia = catchAsync(async (req, res) => {
//   await productService.deleteMediaById(req.params.productId);
//   res.status(httpStatus.NO_CONTENT).send();
// });

// const getMediasAdvanced = catchAsync(async (req, res) => {
//   const { _end, _start, q } = req.query;
//   const result = await productService.queryMediasAdvanced({ _end, _start, q });
//   res.send(result);
// });

module.exports = {
  createMedia,
  getMedia,
  // getMedias,
  // updateMedia,
  // deleteMedia,
  // getMediasAdvanced,
};
