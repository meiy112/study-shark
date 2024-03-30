const { Router } = require('express');
const adminController = require('../controllers/AdminController');

const router = Router();

// // returns all the user's topics 
// router.get('/', topicController.getUserTopics);

// // posts all the user's topics in homepage format 
// router.post('/home-page', topicController.postUserTopicsHomepage);

// // deletes a given study material from the given topic
// router.delete('/:id/studymaterial/:title', studyMaterialController.deleteStudyMaterial);

module.exports = router;