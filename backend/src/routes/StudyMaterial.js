const { Router } = require('express');
const studyMaterialController = require('../controllers/StudyMaterialController');

const router = Router();

// posts a new studymaterial from user
router.post('/', studyMaterialController.postStudyMaterial);


module.exports = router;