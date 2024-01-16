const express = require('express');
const router = express.Router();
const userController = require('../controllers/userContoller');
const authMiddleware = require('../middlewares/auth');

// Define routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', authMiddleware, userController.profile);
router.put('/update-profile', authMiddleware, userController.updateProfile);
router.delete('/delete-account', authMiddleware, userController.deleteAccount);

module.exports = router;
