const { Router } = require('express');
const topicController = require('../controllers/TopicController');
const studyMaterialController = require('../controllers/StudyMaterialController');

const router = Router();

// returns all the user's topics 
router.get('/', topicController.getUserTopics);

// returns all featured topics with a given subject
router.get('/featured', topicController.getFeaturedTopics);

// returns a given topic's general info
router.get('/:id/general-info', topicController.getUserTopicsGeneral);

// returns all tags associated with a topic
router.get('/:id/tags', topicController.getUserTopicsTags);

// returns a given topic's settings info
router.get('/:id/settings', topicController.getTopicSettings);

// returns all public study material sorted by most recent creation date
router.get('/studymaterial/featured', studyMaterialController.getFeaturedStudyMaterial);

// returns a list of filtered and sorted study material from the given topicId
router.get('/:id/studymaterial', studyMaterialController.getFilteredSortedStudyMaterial);

// posts all the user's topics in homepage format 
router.post('/home-page', topicController.postUserTopicsHomepage);

// posts a new topic from user
router.post('/', topicController.postTopic);

// updates given topic 
router.put('/:id', topicController.putTopic);

// deletes a given topic
router.delete('/:id', topicController.deleteTopic);

// deletes a given study material from the given topic
router.delete('/:id/studymaterial/:title', studyMaterialController.deleteStudyMaterial);

module.exports = router;