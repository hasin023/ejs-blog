const router = require('express').Router();
const authController = require('../controllers/authController');

router.get('/register', authController.registerPage);
router.post('/user-register', authController.registerUser);

module.exports = router;
