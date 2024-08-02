const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../src/app');
const config = require('../../src/config/config');
const setupTestDB = require('../utils/setupTestDB');

// const { insertProducts, product1 } = require('../fixtures/products.fixture');
const { insertOrders, order1 } = require('../fixtures/orders.fixture');

jest.setTimeout(15000);

setupTestDB();

describe('orders routes', () => {
  describe('GET /v1/orders/1', () => {
    test('helloworld test to orders route', async () => {
      config.env = 'production';

      // await insertProducts([product1]);
      await insertOrders([order1]);

      const res = await request(app).get('/v1/orders/1').send().expect(httpStatus.OK);
      expect(Array.isArray(res.body)).toBe(false);
      expect(res.body).toHaveProperty('amount');

      config.env = process.env.NODE_ENV;
    });
  });

  describe('GET /v1/orders', () => {
    test('helloworld test to orders route', async () => {
      config.env = 'production';

      // await insertProducts([product1]);
      await insertOrders([order1]);

      const res = await request(app).get('/v1/orders').send().expect(httpStatus.OK);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body[0]).toHaveProperty('amount');

      config.env = process.env.NODE_ENV;
    });
  });
});
