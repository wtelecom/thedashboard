'use strict';

var express = require('express');
var controller = require('./data.controller');

var router = express.Router();

// Plugins routes
// router.get('/sources/:name', controller.sources);
router.get('/plugins/info', controller.pluginsInfo);
// router.post('/plugins', controller.config);
// router.put('/plugins', controller.config);

// Visualization routes
router.post('/visualization', controller.visualization);

// Dashboard routes
router.post('/dashboard', controller.dashboard);

module.exports = router;