

module.exports = settingQuery;


function settingQuery(parent, queryData, task, cb) {

  var data = {
    visualizatorPluginObj: null,
    VisualizatorPlugin: null,
  };

  switch(queryData.action) {
    case "updateDatasources":
      parent.acquisitor.queryClient.execQuery(queryData).then(function(queryResult) {
        // Saving task results in Redis
        return parent.persistor.saveTaskResults(task, queryResult);
      })
      // Emitting an event in order to update settings data
      .then(function(){
        cb();
      });
      break;
    case "fieldsFromDatasources":
      parent.acquisitor.queryClient.execQuery(queryData).then(function(queryResult) {
        // Saving task results in Redis
        return parent.persistor.saveTaskResults(task, queryResult);
      })
      // Emitting an event in order to update settings data
      .then(function(){
        cb();
      });
      break;
    default:
      break;
  }
}