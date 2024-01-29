const express = require('express');
const router = express.Router();
const userController = require('../controllers/transactionController');
const authMiddleware = require('../middlewares/auth');

// Define routes
router.post('/add', userController.register);
router.post('/update', userController.login);
router.get('/delete', authMiddleware, userController.profile);
router.put('/get', authMiddleware, userController.updateProfile);

module.exports = router;
