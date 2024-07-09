const express = require('express');
const router = express.Router();
const AuthenticationController = require('../controller/AuthenticationController');
const { verifyToken } = require('../utilities/AuthUtilities');

router.post('/SignUp', AuthenticationController.SignUp);
router.post('/SignIn', AuthenticationController.SignIn);
router.get('/token-refresh',AuthenticationController.refreshToken);
router.post('/logout', AuthenticationController.logout)
router.get('/userdetail', AuthenticationController.currentUserDetail);

module.exports = router