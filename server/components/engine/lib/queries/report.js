var Q = require('q'),
    taskQuery = require('./task');

module.exports = reportQuery;

function reportQuery(parent, queryData, task, cb) {
  parent.persistor.getVisualizationResults(queryData).then(function(persistorData) {
      var deferred = Q.defer();
      deferred.resolve({visualization: true});
      return deferred.promise;
  })
  .then(function(dataPersistor) {
    if (dataPersistor) {
      queryData.mongo.data.time.from = queryData.time.from;
      queryData.mongo.data.time.to   = queryData.time.to;
      queryData.mongo.data.redisTask  = task;
      taskQuery(parent, queryData.mongo.data, task, cb);
    } else {
      cb();
    }
  });

}
