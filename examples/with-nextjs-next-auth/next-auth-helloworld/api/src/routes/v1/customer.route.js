const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const Joi = require('joi');

const catchAsync = require('../../utils/catchAsync');

const router = express.Router();

const customerValidation = require('../../validations/customer.validation');
const customerController = require('../../controllers/customer.controller');

// http://192.168.10.89:3031/v1/customers
// getOrders

// http://192.168.10.89:3031/v1/customers/668584bc3723fa66f0863eda
router
  .route('/:customerId')
  // TODO: validate(customerValidation.getCustomer),
  .get(customerController.getCustomer)
  // TODO: auth('manageOrder'), validate(customerValidation.updateCustomer),
  .patch(customerController.updateCustomer)
  // TODO: auth('manageCustomer'), validate(customerValidation.deleteCustomer),
  .delete(customerController.deleteCustomer);

router
  .route('/')
  // TODO: validate(customerValidation.getCustomers),
  .get(customerController.getAll)
  // TODO: auth('manageCustomer'), validate(customerValidation.createCustomer),
  .post(customerController.createCustomer);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Customer management and retrieval
 */

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a customer
 *     description: Only admins can create other customers.
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Customer'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all customers
 *     description: all users can retrieve all customers.
 *     tags: [Customers]
 *     parameters:
 *       - in: query
 *         name: firstName
 *         schema:
 *           type: string
 *         description: First name
 *       - in: query
 *         name: lastName
 *         schema:
 *           type: string
 *         description: Last name
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Status
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
 *         description: Maximum number of customers
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
 *                     $ref: '#/components/schemas/Customer'
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
 * /customers/{id}:
 *   get:
 *     summary: Get a customer
 *     description: Logged in users can fetch only their own customer information. Only admins can fetch other customers.
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Customer'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a customer
 *     description: Logged in users can only update their own information. Only admins can update other customers.
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCustomer'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Customer'
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
 *     summary: Delete a customer
 *     description: Logged in users can delete only themselves. Only admins can delete other customers.
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer id
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
