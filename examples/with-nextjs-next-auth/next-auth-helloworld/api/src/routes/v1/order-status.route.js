const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');

const router = express.Router();

const orderStatusValidation = require('../../validations/order-status.validation');
const orderStatusController = require('../../controllers/order-status.controller');

router
  .route('/:orderStatusId')
  // TODO: auth('getOrderStatuses'), validate(orderStatusValidation.getOrderStatus),
  .get(orderStatusController.getOrderStatus)
  // TODO: auth('manageOrderStatus'), validate(orderStatusValidation.updateOrderStatus),
  .patch(orderStatusController.updateOrderStatus)
  // TODO: auth('manageOrderStatus'), validate(orderStatusValidation.deleteOrderStatus),
  .delete(orderStatusController.deleteOrderStatus);

router
  .route('/')
  // TODO: auth('manageOrderStatus'), validate(orderStatusValidation.createOrderStatus),
  .post(orderStatusController.createOrderStatus)
  // TODO: validate(orderStatusValidation.getOrderStatuses),
  .get(orderStatusController.getOrderStatuses);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Order Statuses
 *   description: Order Status management and retrieval
 */
/**
 * @swagger
 * /orderStatuses:
 *   post:
 *     summary: Create an order status
 *     description: Only admins can create other order statuses.
 *     tags: [Order Statuses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *             example:
 *               text: Cancelled
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/OrderStatus'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all order statuses
 *     description: all users can retrieve all order statuses.
 *     tags: [Order Statuses]
 *     parameters:
 *       - in: query
 *         name: text
 *         schema:
 *           type: string
 *         description: Order status text
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
 *         description: Maximum number of order statuses
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
 *                     $ref: '#/components/schemas/OrderStatus'
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
 * /orderStatuses/{orderStatusId}:
 *   get:
 *     summary: Get a order status
 *     description: Logged in users can fetch only their own user information. Only admins can fetch other order statuses.
 *     tags: [Order Statuses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderStatusId
 *         required: true
 *         schema:
 *           type: string
 *         description: Order Status id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/OrderStatus'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a order status
 *     description: Logged in users can only update their own information. Only admins can update other order statuses.
 *     tags: [Order Statuses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderStatusId
 *         required: true
 *         schema:
 *           type: string
 *         description: Order Status id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *             example:
 *               text: Completed
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/OrderStatus'
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
 *     summary: Delete a order status
 *     description: Logged in users can delete only themselves. Only admins can delete other order statuses.
 *     tags: [Order Statuses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderStatusId
 *         required: true
 *         schema:
 *           type: string
 *         description: Order Status id
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
