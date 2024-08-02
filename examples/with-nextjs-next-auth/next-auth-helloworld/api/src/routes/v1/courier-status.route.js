const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');

const router = express.Router();

const courierStatusValidation = require('../../validations/courier-status.validation');
const courierStatusController = require('../../controllers/courier-status.controller');

router
  .route('/:courierStatusId')
  // TODO: auth('getCourierStatus'),  validate(courierStatusValidation.getCourierStatus),
  .get(courierStatusController.getCourierStatus)
  // TODO: auth('manageCourierStatus'), validate(courierStatusValidation.updateCourierStatus),
  .patch(courierStatusController.updateCourierStatus)
  // TODO: auth('manageCourierStatus'),  validate(courierStatusValidation.deleteCourierStatus),
  .delete(courierStatusController.deleteCourierStatus);

router
  .route('/')
  // TODO: auth('manageCourierStatus'),  validate(courierStatusValidation.createCourierStatus),
  .post(courierStatusController.createCourierStatus)
  // TODO: validate(courierStatusValidation.getCourierStatuses),
  .get(courierStatusController.getCourierStatuses);

module.exports = router;

/**
 * @swagger
 * /courierStatuses:
 *   post:
 *     summary: Create a courier status
 *     description: Only admins can create other statuses.
 *     tags: [Courier Statuses]
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
 *               text: Completed
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/CourierStatus'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all courier statuses
 *     description: All users can retrieve all statuses.
 *     tags: [Courier Statuses]
 *     parameters:
 *       - in: query
 *         name: text
 *         schema:
 *           type: string
 *         description: Status text
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
 *         description: Maximum number of statuses
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
 *                     $ref: '#/components/schemas/CourierStatus'
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
 * /courierStatuses/{courierStatusId}:
 *   get:
 *     summary: Get a courier status
 *     description: Logged in users can fetch only their own user information. Only admins can fetch other statuses.
 *     tags: [Courier Statuses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courierStatusId
 *         required: true
 *         schema:
 *           type: string
 *         description: Status id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/CourierStatus'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a courier status
 *     description: Logged in users can only update their own information. Only admins can update other statuses.
 *     tags: [Courier Statuses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courierStatusId
 *         required: true
 *         schema:
 *           type: string
 *         description: Status id
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
 *                $ref: '#/components/schemas/CourierStatus'
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
 *     summary: Delete a courier status
 *     description: Logged in users can delete only themselves. Only admins can delete other statuses.
 *     tags: [Courier Statuses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courierStatusId
 *         required: true
 *         schema:
 *           type: string
 *         description: Status id
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
