const express = require('express');
const router = express.Router();

const CONTROLLER = require('../controllers/users.controller');
const MIDDLEWARE = require('../middlewares/authorization.middleware');

router.use(MIDDLEWARE);
router.get('/', CONTROLLER.get);

module.exports = router;
