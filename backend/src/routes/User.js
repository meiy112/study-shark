const { Router } = require('express');
const userController = require('../controllers/UserController');

const router = Router();

// returns the user's information 
router.get('/', userController.getUser);

// updates the user's email 
router.put('/email', userController.putUserEmail);

// updates the user's school
router.put('/school', userController.putUserSchool);

module.exports = router;