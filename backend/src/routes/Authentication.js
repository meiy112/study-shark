const { Router } = require('express');
const authController = require('../controllers/AuthController');
const { userVerification } = require('../Middlewares/AuthMiddleware')

const router = Router();

// sign up 
router.post('/signup', authController.authSignUp);
// login 
router.post('/login', authController.authLogin);
// // home page? 
router.post('/', userVerification);

// the rest of your routes should look similar, for example:
// router.put('/:id', achievementLevelController.updateAchievementById);
// here id can be accesed by req.params.id in achievementLevelController

module.exports = router;