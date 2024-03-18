const { Router } = require('express');
const authController = require('../controllers/AuthController');
const { userVerification } = require('../Middlewares/AuthMiddleware')

const router = Router();

// sign up 
// post: { "username": "I have lost my cookies :(", "password": "no more cookies", "email": "cookieless@gmail.com" } 
// to sign up 
router.post('/signup', authController.authSignUp);

// login 
// post corresponding username and password in body { "username": "I have lost my cookies :(", "password": "no more cookies" } 
// to login
router.post('/login', authController.authLogin);

// verify user 
// post token from login or signup to verify 
// { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkkgaGF2ZSBsb3N0IG15IGNvb2tpZXMgOigiLCJpYXQiOjE3MTA3M
// jQyNDAsImV4cCI6MTcxMDk4MzQ0MH0.TnHmZoROTrBMSYcF2HePSxjYuQyWEDAurK_Gn61GQKI"} 
router.post('/', userVerification);

// the rest of your routes should look similar, for example:
// router.put('/:id', achievementLevelController.updateAchievementById);
// here id can be accesed by req.params.id in achievementLevelController

module.exports = router;