const express = require('express');
const userController = require('../controllers/userController')
const verifyUser = require('../middlewares/userAuthMiddleware')

const router = express.Router();

router.post('/user/register', userController.register)
router.post('/user/login', userController.login)
router.post('/user/logout', verifyUser, userController.logout)
router.post('/user/authenticate', userController.authenticate)


module.exports = router 


