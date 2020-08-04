const express = require('express');
const auth = require('../middlewares/auth');
const userContoller = require('../controllers/user');

const router = new express.Router();

router.post('/', userContoller.createUser);
router.post('/login', userContoller.login);
router.post('/logout', auth, userContoller.logout);
router.post('/logoutAll', auth, userContoller.logoutAll);
router.get('/me', auth, userContoller.getCurrentUser);
router.patch('/me', auth, userContoller.updateCurrentUser);
router.delete('/me', auth, userContoller.deleteCurrentUser);

module.exports = router;
