const express = require('express');
const auth = require('../middlewares/auth');
const userContoller = require('../controllers/user');

const router = new express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

router.post('/', userContoller.createUser);

/**
 * @swagger
 *
 * /api/users/login:
 *   post:
 *     tags:
 *        - Users
 *     description: Login
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in:  body
 *         required: true
 *         type: object
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: users
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.post('/login', userContoller.login);
router.post('/logout', auth, userContoller.logout);
router.post('/logoutAll', auth, userContoller.logoutAll);
router.get('/me', auth, userContoller.getCurrentUser);
router.patch('/me', auth, userContoller.updateCurrentUser);
router.delete('/me', auth, userContoller.deleteCurrentUser);

module.exports = router;
