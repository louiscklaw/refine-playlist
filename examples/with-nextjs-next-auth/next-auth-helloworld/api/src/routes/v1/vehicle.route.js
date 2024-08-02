const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');

const router = express.Router();

// sample data
// [
// {
//   "id": 67,
//   "name": "Garlic Bread",
//   "isActive": false,
//   "description": "Warm, buttery bread seasoned with garlic and herbs, toasted to perfection.",
//   "images": [ "5e982861-68ca-405e-941c-fcc9e160d70b" ],
//   "createdAt": "2024-04-04T04:18:23.076Z",
//   "price": 6,
//   "category_id": 1
// },
// {
//   "id": 67,
//   "name": "Garlic Bread",
//   "isActive": false,
//   "description": "Warm, buttery bread seasoned with garlic and herbs, toasted to perfection.",
//   "images": [ "5e982861-68ca-405e-941c-fcc9e160d70b" ],
//   "createdAt": "2024-04-04T04:18:23.076Z",
//   "price": 6,
//   "category_id": 1
// },
// ]
const vehicleValidation = require('../../validations/vehicle.validation');
const vehicleController = require('../../controllers/vehicle.controller');

router
  .route('/:vehicleId')
  // TODO: auth('getVehicles'), validate(vehicleValidation.getVehicle),
  .get(vehicleController.getVehicle)
  // TODO: auth('manageVehicles'), validate(vehicleValidation.updateVehicle),
  .patch(vehicleController.updateVehicle)
  // TODO: auth('manageVehicles'), validate(vehicleValidation.deleteVehicle),
  .delete(vehicleController.deleteVehicle);

router
  .route('/')
  // TODO: auth('manageVehicles'), validate(vehicleValidation.createVehicle),
  .post(vehicleController.createVehicle)
  // TODO: validate(vehicleValidation.getVehicles),
  .get(vehicleController.getVehicles);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Vehicles
 *   description: Vehicle management and retrieval
 */

/**
 * @swagger
 * /vehicles:
 *   post:
 *     summary: Create a vehicle
 *     description: Only admins can create other vehicles.
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Vehicle'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all vehicles
 *     description: all users can retrieve all vehicles.
 *     tags: [Vehicles]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Vehicle name
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
 *         description: Maximum number of vehicles
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
 *                     $ref: '#/components/schemas/Vehicle'
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
 * /vehicles/{id}:
 *   get:
 *     summary: Get a vehicle
 *     description: Logged in users can fetch only their own user information. Only admins can fetch other vehicles.
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Vehicle id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Vehicle'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a vehicle
 *     description: Logged in users can only update their own information. Only admins can update other vehicles.
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Vehicle id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Vehicle'
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
 *     summary: Delete a vehicle
 *     description: Logged in users can delete only themselves. Only admins can delete other vehicles.
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Vehicle id
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
