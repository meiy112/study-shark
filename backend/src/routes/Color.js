const { Router } = require('express');
const colorController = require('../controllers/ColorController');

const router = Router();

// returns colors in the databse
router.get('/', colorController.getAllColors);

module.exports = router;