const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../src/app');
const config = require('../../src/config/config');
const { insertCustomers, customer1 } = require('../fixtures/customers.fixture');
const setupTestDB = require('../utils/setupTestDB');

jest.setTimeout(15000);
setupTestDB();

describe('customers routes', () => {
  // describe('GET /v1/customers', () => {
  //   test('helloworld test to customers route', async () => {
  //     config.env = 'production';
  //     await request(app)
  //       .get('/v1/customers')
  //       .send()
  //       .expect(httpStatus.OK)
  //       .expect((res) => {
  //         expect(Array.isArray(res.body)).toBe(true);
  //       });

  //     config.env = process.env.NODE_ENV;
  //   });
  // });

  describe('GET /v1/customers', () => {
    test('helloworld test to customers route', async () => {
      await insertCustomers([customer1]);

      config.env = 'production';
      await request(app).get('/v1/customers').send().expect(httpStatus.OK);
      config.env = process.env.NODE_ENV;
    });
  });
});
