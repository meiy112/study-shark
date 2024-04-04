const { Router } = require('express');
const groupController = require('../controllers/GroupController');

const router = Router();

// returns all groups user has joined
router.get('/', groupController.getUserGroups);

// // returns all the topics with user specified WHERE clause
// router.get('/topic', adminController.getAdminTopics);

// // returns tuples given attribute list and table
// router.post('/table', adminController.postAdminTable);

module.exports = router;