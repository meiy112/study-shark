const { Router } = require('express');
const adminController = require('../controllers/AdminController');

const router = Router();

// returns all the topics with user specified WHERE clause
router.get('/topic', adminController.getAdminTopics);

// returns tuples given attribute list and table
router.post('/table', adminController.postAdminTable);

module.exports = router;