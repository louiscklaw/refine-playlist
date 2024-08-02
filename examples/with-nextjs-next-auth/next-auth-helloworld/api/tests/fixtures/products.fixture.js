const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const faker = require('faker');
const { Product } = require('../../src/models');

const product1 = {
  _id: mongoose.Types.ObjectId(),
  isActive: faker.random.boolean(),
  name: faker.commerce.productName(),
  description: faker.lorem.sentence(),
  price: faker.commerce.price(),
  category: { id: faker.datatype.number({ min: 1, max: 5 }) },
};

const insertProducts = async (ps) => {
  await Product.insertMany(ps.map((p, idx) => ({ ...p, id: idx })));
};

module.exports = {
  insertProducts,
  product1,
};
