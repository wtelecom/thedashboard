/**
 * Druid query lib
 */

var Druid = require('druid-query'),
  Q = require('q'),
  moment = require('moment'),
  _ = require('lodash');


module.exports = QueryReq;


// Druid query object
function QueryReq(connection) {
  this.connection = connection;
}

// Druid query executor
QueryReq.prototype.execQuery = function(data) {
  var parent = this,
    deferred = Q.defer();
  // If data object has an "action" property,
  // the query will be executed in raw mode
  if (data.action) {
    switch(data.action) {
      case "updateDatasources":
        showTables().then(function(dssResult) {
          deferred.resolve({
            rows: dssResult,
            query: null
          });
        });
        break;
      case "fieldsFromDatasources":
        showTables().then(function(dss) {
          getFields(dss).then(function(fields) {
            console.log(fields);
          });
        });
        break;
      default:
        break;
    }
  } else {
    // Data is parsed only when the results must be represented
    // Parser.parse(data);
  }

  function showTables() {
    var defer = Q.defer();
    parent.connection.reloadList(function(err) {
      defer.resolve(parent.connection.getDataSources());
    });
    return defer.promise;  
  }

  function getFields(dss) {
    var defer = Q.defer();
    var dsCount = dss.length;
    var dssList = [];
    _.forEach(dss, function(dataSource) {
      var fieldsQuery = new Druid.SegmentMetadataQuery();
      fieldsQuery.dataSource(dataSource);
      fieldsQuery.interval(moment().subtract(2, 'day').format(), moment().subtract(1, 'day').format());
      console.log(fieldsQuery);
      try {
      parent.connection.exec(fieldsQuery, function(err, results) {
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        // var dataSourceObject = {
        //   name: dataSource,
        //   fields: []
        // };
        // if (err) {
        //   console.log(err);
        //   dsCount -= 1;
        // } else {
        //   var fields = [];
        //   _.forEach(_.head(results).columns, function(value, key) {
        //     fields.push({
        //       name: key,
        //       type: value
        //     });
        //   });
        //   dataSourceObject.fields = fields;
        // }
        // dssList.push(dataSourceObject);
        // if (dsCount < 1) {
        //   console.log(dssList);
        //   defer.resolve();
        // }
      });
      }catch(e){
        console.log(e);
      }
    });
    return defer.promise;
  }

  return deferred.promise;
};



