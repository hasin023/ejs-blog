const router = require('express').Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/dashboard', dashboardController.dashboardPage);

module.exports = router;