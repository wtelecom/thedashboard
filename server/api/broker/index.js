'use strict';

var express = require('express');
var controller = require('./broker.controller');

var router = express.Router();

router.post('/task/:type', controller.task);

module.exports = router;