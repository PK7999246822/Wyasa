const express = require('express');
const router = express.Router();
const middleware = require('../Middleware/middleware')
const UserController = require('../Controllers/UserController')

router.post('/User',UserController.CreatSleep)
router.post('/login',UserController.loginUser)
router.post('/add/:userId',middleware.authentication,UserController.Question)

module.exports = router;