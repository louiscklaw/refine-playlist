const express = require('express');
const router = express.Router();

const catchAsync = require('../../utils/catchAsync');

const getHelloworld = catchAsync(async (req, res) => {
  res.send({ hello: 'world' });
});

router.route('/').get(getHelloworld);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Helloworld
 *   description: Category management and retrieval
 */

/**
 * @swagger
 * /helloworld:
 *   get:
 *     summary: Get all helloworld
 *     description: all users can retrieve all helloworld.
 *     tags: [Helloworld]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Category title
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
 *         description: Maximum number of helloworld
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
 *                     $ref: '#/components/schemas/Category'
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
