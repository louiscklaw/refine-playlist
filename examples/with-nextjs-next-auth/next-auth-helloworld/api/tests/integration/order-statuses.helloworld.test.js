const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../src/app');
const config = require('../../src/config/config');
const setupTestDB = require('../utils/setupTestDB');

// const { insertProducts, product1 } = require('../fixtures/products.fixture');
const { insertOrderStatuses, orderStatus1 } = require('../fixtures/order-statuses.fixture');

jest.setTimeout(15000);

setupTestDB();

describe('orderStatuses routes', () => {
  describe('GET /v1/orderStatuses', () => {
    test('helloworld test to orderStatuses route', async () => {
      config.env = 'production';

      // await insertProducts([product1]);
      await insertOrderStatuses([orderStatus1]);

      const res = await request(app).get('/v1/orderStatuses').send().expect(httpStatus.OK);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body[0]).toHaveProperty('text');

      config.env = process.env.NODE_ENV;
    });
  });
});
