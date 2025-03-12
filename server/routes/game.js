const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const auth = require('../middleware/auth');

router.post('/results', auth, gameController.saveGameResult);
router.get('/history', auth, gameController.getGameHistory);
router.get('/results/:id', auth, gameController.getGameResult);

module.exports = router;