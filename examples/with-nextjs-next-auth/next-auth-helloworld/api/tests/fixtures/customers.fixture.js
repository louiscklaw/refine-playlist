const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const faker = require('faker');
const { Customer } = require('../../src/models');

const customer1 = {
  _id: mongoose.Types.ObjectId(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
  gender: faker.random.arrayElement(['male', 'female']),
  gsm: faker.phone.phoneNumber(),
  isActive: true,
  // avatar: [
  //   {
  //     name: faker.system.fileName(),
  //     percent: faker.datatype.number({ min: 1, max: 100 }),
  //     size: faker.datatype.number({ min: 100, max: 1000 }),
  //     status: faker.random.arrayElement(['success', 'error', 'warning']),
  //     type: faker.system.mimeType(),
  //     uid: faker.datatype.uuid(),
  //     url: faker.internet.url(),
  //   },
  // ],
  // addresses: [
  //   {
  //     text: faker.address.streetAddress(),
  //     coordinate: [faker.address.latitude(), faker.address.longitude()],
  //   },
  // ],
};

// const customer2 = {
//   _id: mongoose.Types.ObjectId(),
//   name: faker.name.findName(),
// };

const insertCustomers = async (cs) => {
  await Customer.insertMany(cs.map((c, idx) => ({ ...c, id: idx })));
};

module.exports = {
  insertCustomers,
  customer1,
  // customer2,
};
