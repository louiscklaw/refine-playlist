const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');

const router = express.Router();

// sample data
// [
//   {
//     "id": 1,
//     "product_id": 29,
//     "orderCount": 48
//   },
//   {
//     "id": 2,
//     "product_id": 32
//     "orderCount": 48
//   }
// ]

const DailyOrderValidation = require('../../validations/daily-order.validation');
const DailyOrderController = require('../../controllers/daily-order.controller');

router.route('/').get(validate(DailyOrderValidation.getDailyOrders), DailyOrderController.getDailyOrders);

// router
//   .route('/:trendingProductId')
//   .get(
//     auth('getTrendingProducts'),
//     validate(trendingProductValidation.getTrendingProduct),
//     trendingProductController.getTrendingProduct
//   )
//   .patch(
//     auth('manageTrendingProduct'),
//     validate(trendingProductValidation.updateTrendingProduct),
//     trendingProductController.updateTrendingProduct
//   )
//   .delete(
//     auth('manageTrendingProduct'),
//     validate(trendingProductValidation.deleteTrendingProduct),
//     trendingProductController.deleteTrendingProduct
//   );

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: TrendingProducts
 *   description: TrendingProduct management and retrieval
 */

/**
 * @swagger
 * /trendingProducts:
 *   post:
 *     summary: Create a trending product
 *     description: Only admins can create other trending products.
 *     tags: [TrendingProducts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *             properties:
 *               product_id:
 *                 type: string
 *             example:
 *               product_id: 1234567890
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/TrendingProduct'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all trending products
 *     description: all users can retrieve all trending products.
 *     tags: [TrendingProducts]
 *     parameters:
 *       - in: query
 *         name: product_id
 *         schema:
 *           type: string
 *         description: Trending product product_id
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of trending products
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TrendingProduct'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /trendingProducts/{id}:
 *   get:
 *     summary: Get a trending product
 *     description: Logged in users can fetch only their own user information. Only admins can fetch other trending products.
 *     tags: [TrendingProducts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Trending product id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/TrendingProduct'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a trending product
 *     description: Logged in users can only update their own information. Only admins can update other trending products.
 *     tags: [TrendingProducts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Trending product id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: string
 *             example:
 *               product_id: 1234567890
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/TrendingProduct'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a trending product
 *     description: Logged in users can delete only themselves. Only admins can delete other trending products.
 *     tags: [TrendingProducts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Trending product id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
