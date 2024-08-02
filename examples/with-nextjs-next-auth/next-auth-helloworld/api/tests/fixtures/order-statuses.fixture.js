const mongoose = require('mongoose');
const faker = require('faker');
const { OrderStatus } = require('../../src/models');

const orderStatus1 = {
  id: 1,
  text: faker.random.arrayElement(['pending', 'processing', 'shipped', 'delivered', 'canceled']),
};

const insertOrderStatuses = async (os) => {
  await OrderStatus.insertMany(os);
};

module.exports = {
  insertOrderStatuses,
  orderStatus1,
};
