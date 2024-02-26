const router = require('express').Router();
const authController = require('../controllers/authController');

router.get('/register', authController.registerPage);
router.get('/login', authController.loginPage);
router.post('/user-register', authController.registerUser);
router.post('/user-login', authController.loginUser);

module.exports = router;
