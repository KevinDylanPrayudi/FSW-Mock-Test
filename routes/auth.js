var express = require('express');
var router = express.Router();

const CONTROLLER = require('../controllers/auth.controller');

/* GET users listing. */
router.post('/registration', CONTROLLER.registration);
router.post('/login', CONTROLLER.login);

module.exports = router;