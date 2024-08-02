const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const categoryRoute = require('./category.route');
const statusRoute = require('./status.route');
const storeRoute = require('./store.route');
const vehicleRoute = require('./vehicle.route');
const courierRoute = require('./courier.route');
const courierStatusRoute = require('./courier-status.route');
const orderRoute = require('./order.route');
const customerRoute = require('./customer.route');
const summaryRoute = require('./summary.route');
const reviewRoute = require('./review.route');
const productRoute = require('./product.route');
const orderStatusRoute = require('./order-status.route');
const trendingProductRoute = require('./trending-product.route');
const qrRedirectRoute = require('./qr-redirect.route');
const eventRoute = require('./event.route');
const restaurantLogRoute = require('./restaurant-log.route');

const advertisementRoute = require('./advertisement.route');
const advertisementCatRoute = require('./advertisement-cat.route');
const advertisementSetRoute = require('./advertisement-set.route');

//
const dailyOrdersRoute = require('./daily-orders.route');
const dailyRevenueRoute = require('./daily-revenue.route');
const newCustomersRoute = require('./new-customers.route');
//
const mediaRoute = require('./media.route');
//
const helloworldRoute = require('./helloworld.route');

const router = express.Router();

const defaultRoutes = [
  { path: '/auth', route: authRoute },
  { path: '/users', route: userRoute },
  { path: '/helloworld', route: helloworldRoute },

  //
  { path: '/categories', route: categoryRoute },
  { path: '/couriers', route: courierRoute },
  { path: '/courierStatuses', route: courierStatusRoute },
  { path: '/customers', route: customerRoute },
  { path: '/helloworld', route: helloworldRoute },
  { path: '/orders', route: orderRoute },
  { path: '/orderStatuses', route: orderStatusRoute },
  { path: '/products', route: productRoute },
  { path: '/reviews', route: reviewRoute },
  { path: '/statuses', route: statusRoute },
  { path: '/stores', route: storeRoute },
  { path: '/summaries', route: summaryRoute },
  { path: '/trendingProducts', route: trendingProductRoute },
  { path: '/vehicles', route: vehicleRoute },
  { path: '/qr_redirects', route: qrRedirectRoute },
  { path: '/events', route: eventRoute },
  { path: '/restaurant_logs', route: restaurantLogRoute },

  { path: '/advertisements', route: advertisementRoute },
  { path: '/advertisement_cats', route: advertisementCatRoute },
  { path: '/advertisement_sets', route: advertisementSetRoute },

  //
  { path: '/dailyOrders', route: dailyOrdersRoute },
  { path: '/dailyRevenue', route: dailyRevenueRoute },
  { path: '/newCustomers', route: newCustomersRoute },

  // TODO: this is temp solution for handle file upload / download, should be seperated to different program/api
  { path: '/media', route: mediaRoute },
];

const devRoutes = [
  // routes available only in development mode
  { path: '/docs', route: docsRoute },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

router.use('/something', (req, res) => {
  console.log('something111');
  req.query.color1 === 'red'; // true
  req.query.color2 === 'blue'; // true
  res.send({ d: req.query });
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
