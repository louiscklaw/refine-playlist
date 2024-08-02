const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../src/app');
const config = require('../../src/config/config');
const { insertProducts, product1 } = require('../fixtures/products.fixture');
const setupTestDB = require('../utils/setupTestDB');

jest.setTimeout(15000);
setupTestDB();

describe('products routes', () => {
  // describe('GET /v1/products', () => {
  //   test('helloworld test to products route', async () => {
  //     config.env = 'production';
  //     await request(app)
  //       .get('/v1/products')
  //       .send()
  //       .expect(httpStatus.OK)
  //       .expect((res) => {
  //         expect(Array.isArray(res.body)).toBe(true);
  //       });

  //     config.env = process.env.NODE_ENV;
  //   });
  // });

  describe('GET /v1/products', () => {
    test('helloworld test to products route', async () => {
      await insertProducts([product1]);

      config.env = 'production';
      await request(app).get('/v1/products').send().expect(httpStatus.OK);
      config.env = process.env.NODE_ENV;
    });
  });
});
