const { Router } = require('express');
const achievementLevelController = require('../controllers/AchievementLevelController');

const router = Router();

// returns a list of all achievement levels
router.get('/', achievementLevelController.getAllAchievementLevels);

// the rest of your routes should look similar, for example:
// router.put('/:id', achievementLevelController.updateAchievementById);
// here id can be accesed by req.params.id in achievementLevelController

module.exports = router;