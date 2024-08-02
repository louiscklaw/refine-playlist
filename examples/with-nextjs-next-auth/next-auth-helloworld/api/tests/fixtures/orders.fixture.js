const mongoose = require('mongoose');
const faker = require('faker');
const { Order } = require('../../src/models');

const order1 = {
  id: 1,
  user_id: faker.datatype.number({ min: 1, max: 10 }),
  amount: faker.datatype.number({ min: 1, max: 10 }),
  store_id: faker.datatype.number({ min: 1, max: 10 }),
  products: [
    {
      product_id: faker.datatype.uuid(),
      quantity: faker.random.number({ min: 1, max: 10 }),
    },
  ],
  total: faker.datatype.number({ min: 0, max: 10 }),
  status: {
    id: faker.datatype.number({ min: 1, max: 4 }),
    text: faker.random.arrayElement(['pending', 'processing', 'shipped', 'delivered', 'canceled']),
  },
  orderNumber: faker.datatype.number({ min: 0, max: 10 }),
  createdAt: faker.date.past(),
};

const insertOrders = async (os) => {
  await Order.insertMany(os);
};

module.exports = {
  insertOrders,
  order1,
};
