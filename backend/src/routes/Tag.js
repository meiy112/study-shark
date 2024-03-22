const { Router } = require('express');
const tagController = require('../controllers/TagController');

const router = Router();

// returns all tags that are associated with topics from the given user
router.get('/', tagController.getAllTagsOfTopicsFromUser);

module.exports = router;