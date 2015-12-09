/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var PluginModel = require('../api/data/plugin.model');
var Dashboard = require('../api/data/dashboard.model');
var Visualization = require('../api/data/visualization.model');
var Report = require('../api/data/report.model');
var _ = require('lodash');
var pluginsConfig = require('./plugins');

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});



PluginModel.checkAndUpdate(pluginsConfig, function() {
  PluginModel.find({}, function(err, plugins) {
    if (plugins.length) {
      var visualizators = _.filter(plugins, function(v) {
        return v.name == 'visualizator'
      });
      var acquisitors = _.filter(plugins, function(v) {
        return v.name == 'acquisitor'
      });
      var chartTypes = ['area', 'bar', 'pie'];

      Dashboard.find({}).remove(function() {
        var nDashboards = 12;
        _.times(nDashboards, function(i) {
          Dashboard.create({
            name: 'Dashboard ' + (i + 1),
            visualizatorPlugin: visualizators[_.random(visualizators.length - 1)].pluginName,
            acquisitorPlugin: acquisitors[_.random(acquisitors.length - 1)].pluginName,
            visualizations: [],
            matrix: [],
            time: new Date()
          }, function() {
            if (i == nDashboards - 1) {
              console.log('finished populating dashboards');
            }
          });
        });
      });

      Visualization.find({}).remove(function() {
        var nVisualizations = 12;
        _.times(nVisualizations, function(i) {
          Visualization.create({
            name: 'Visualization ' + (i + 1),
            visualizatorPlugin: visualizators[_.random(visualizators.length - 1)].pluginName,
            acquisitorPlugin: acquisitors[_.random(acquisitors.length - 1)].pluginName,
            graphOptions: {chart: chartTypes[_.random(chartTypes.length - 1)]},
            query: {}
          }, function() {
            if (i == nVisualizations - 1) {
              console.log('finished populating visualizations');
            }
          });
        });
      });

      Report.find({}).remove(function() {
        var nReports = 12;
        _.times(nReports, function(i) {
          Report.create({
            name: 'Report ' + (i + 1),
            visualizatorPlugin: visualizators[_.random(visualizators.length - 1)].pluginName,
            acquisitorPlugin: acquisitors[_.random(acquisitors.length - 1)].pluginName,
            visualizations: [],
            matrix: [],
            time: { from: new Date(), to: new Date()},
            progress: 100
          }, function() {
            if (i == nReports - 1) {
              console.log('finished populating reports');
            }
          });
        });
      });

    }
  })
});
