const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');


router.post('/register', upload.single('profilePicture'), authController.register);
router.post('/login', authController.login);
router.get('/me', auth, authController.getCurrentUser);

module.exports = router;