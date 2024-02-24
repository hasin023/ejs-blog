const router = require('express').Router();
const authController = require('../controllers/authController');

router.get('/register', authController.registerPage);

module.exports = router;
