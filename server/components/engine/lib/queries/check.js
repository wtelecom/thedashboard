var visualizationQuery = require('./visualization'),
  Q = require('q');

module.exports = checkQuery;


function checkQuery(parent, queryData, task, cb) {
  // Check if the visualization can be reused
  // If not, execute the visualization query routine
  parent.persistor.getVisualizationResults(queryData).then(function(persistorData) {

    if (persistorData) {
      return parent.persistor.saveTaskResults(task, {
        visualization: persistorData.graph,
        query: persistorData.query,
        id: persistorData.id
      });
    } else {
      
      var deferred = Q.defer();
      deferred.resolve({visualization: true});
      return deferred.promise;
    }
  })
  .then(function(dataPersistor) {
    if (dataPersistor) {

      queryData.mongo.data.time.from = queryData.time.from;
      queryData.mongo.data.time.to   = queryData.time.to;
      queryData.mongo.data.redisTask  = task;
      visualizationQuery(parent, queryData.mongo.data, task, cb);
    } else {
      cb();
    }
  });
}
