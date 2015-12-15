/**
 * Persistor engine
 */

'use strict';

var redis = require('redis'),
  _ = require('lodash'),
  Q = require('q'),
  timeUtil = require('./utils/time');

module.exports = Persistor;

function Persistor() {
  this.client = redis.createClient();

  this.client.on("error", function (err) {
    console.log("Error " + err);
  });
}

Persistor.prototype.saveTaskResults = function(task, data) {
  var deferred = Q.defer();
  var parent = this;

  this.client.mset(
    'task:' + task,
    JSON.stringify(data),
    function(err, response) {
      if (!err) {
        deferred.resolve();
      }
    }
  );

  return deferred.promise;
};


Persistor.prototype.saveReportResults = function(task, data) {
  var deferred = Q.defer();
  var parent = this;

  this.client.mset(
    'report:' + task,
    JSON.stringify(data),
    function(err, response) {
      if (!err) {
        deferred.resolve();
      }
    }
  );

  return deferred.promise;
};


Persistor.prototype.saveVisualization = function(data) {
  var deferred = Q.defer();
  var parent = this;

  this.client.mset(
    'visualization:' + data.id,
    JSON.stringify(data),
    function(err, response) {
      if (!err) {
        deferred.resolve();
      }
    }
  );

  return deferred.promise;
};

Persistor.prototype.getTaskResults = function(task, cb) {
  this.client.get("task:" + task, function(err, result) {
    cb(JSON.parse(result));
  });
};

Persistor.prototype.getReportData = function(id, cb) {
  this.client.get("report:" + id, function(err, result) {
    cb(JSON.parse(result));
  });
};

Persistor.prototype.getVisualizationResults = function(data) {
  var deferred = Q.defer();
  var TimeUtilInstance = new timeUtil();

  // TODO: Get a real value to set "Margin of Error"
  // For test purposes the ME has been established to 10 hours
  this.client.get("visualization:" + data.redis.id, function(err, result) {

    if (err) deferred.resolve(false);
    if (result) {
      var visualization = JSON.parse(result);
      deferred.resolve(
        (
          (
            TimeUtilInstance.check(data.time.to, visualization.time.to, 'hours', data.config.to) &&
            TimeUtilInstance.check(data.time.from, visualization.time.from, 'hours', data.config.from)
          )
          ? JSON.parse(result) : false
        )
      );
    } else {
      deferred.resolve(false);
    }
  });

  return deferred.promise;
};
