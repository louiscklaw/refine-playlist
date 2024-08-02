const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');

const router = express.Router();

const productValidation = require('../../validations/product.validation');
const productController = require('../../controllers/product.controller');

router
  .route('/:productId')
  // TODO: auth('getProducts'), resume validate(productValidation.getProduct),
  .get(productController.getProduct)
  // TODO: need to add auth('manageProducts'),  resume validate(productValidation.updateProduct),
  .patch(productController.updateProduct)
  // TODO: resume validate(productValidation.deleteProduct),
  .delete(productController.deleteProduct);

router
  .route('/')
  // TODO resume validate(productValidation.getProductsAdvanced),
  .get(productController.getProductsAdvanced)
  // TODO resume auth('manageProducts'), validate(productValidation.createProduct),
  .post(productController.createProduct);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management and retrieval
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a product
 *     description: Only admins can create other products.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - category_id
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: integer
 *                 minimum: 0
 *               category_id:
 *                 type: integer
 *                 minimum: 1
 *             example:
 *               name: Garlic Bread
 *               description: Warm, buttery bread seasoned with garlic and herbs, toasted to perfection.
 *               price: 6
 *               category_id: 1
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Product'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all products
 *     description: all users can retrieve all products.
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Product name
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
 *         description: Maximum number of products
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
 *                     $ref: '#/components/schemas/Product'
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

// sample data
// [
// {
// id: 79,
// name: 'Pepsi',
// isActive: false,
// description: 'Refreshing Pepsi served ice cold.',
// images: [
//     {
//         url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/pepsi.jpg',
//         thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/pepsi-thumbnail.jpg',
//         name: 'Pepsi',
//         status: 'done',
//         type: 'image/jpg',
//         uid: '09240f6f-0ece-4b4a-a593-f0f7ac04b3b2'
//     }
// ],
// createdAt: '2024-05-15T11:55:46.008Z',
// price: 2,
// category: {
//     id: 9
// }
// },
// ]

/**
 * @swagger
 * /products/{productId}:
 *   get:
 *     summary: Get a product
 *     description: Logged in users can fetch only their own user information. Only admins can fetch other statuses.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Product'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a product
 *     description: Logged in users can only update their own information. Only admins can update other statuses.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                     thumbnailUrl:
 *                       type: string
 *                     name:
 *                       type: string
 *                     status:
 *                       type: string
 *                       enum: ['done', 'error', 'removed', 'uploading', 'success']
 *                     type:
 *                       type: string
 *                     uid:
 *                       type: string
 *               price:
 *                 type: integer
 *                 minimum: 0
 *
 *             example:
 *               name: Garlic Bread
 *               description: Warm test test
 *               price: 6
 *               images: [{
 *                 url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/pepsi.jpg',
 *                 thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/pepsi-thumbnail.jpg',
 *                 name: 'Pepsi',
 *                 status: 'done',
 *                 type: 'image/jpg',
 *                 uid: '09240f6f-0ece-4b4a-a593-f0f7ac04b3b2'
 *               }]
 *               isActive: true
 *               category:  { id: 2 }
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Product'
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
 *     summary: Delete a product
 *     description: Logged in users can delete only themselves. Only admins can delete other statuses.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product id
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
