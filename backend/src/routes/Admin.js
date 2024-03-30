const { Router } = require('express');
const adminController = require('../controllers/AdminController');

const router = Router();

// returns all the topics with user specified WHERE clause
router.get('/topic', adminController.getAdminTopics);

module.exports = router;