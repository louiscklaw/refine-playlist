const allRoles = {
  // the one that consume restaurant
  restaurant_client: ['getUsers', 'getProducts'],
  // the one that manage restaurant e.g. menu
  restaurant_admin: ['getUsers', 'getProducts'],
  user: ['getProducts'],
  admin: ['getUsers', 'manageUsers', 'getProducts', 'manageProducts'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
