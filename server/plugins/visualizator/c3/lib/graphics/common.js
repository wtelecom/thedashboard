var _ = require('lodash');

function prepareColumns(raw, data, types) {
  var graphData = [];

  //Getting query columns from data:
  var firstRow = data[0];
  var fields = Object.keys(data[0]);

  var tsDateIndex = fields.indexOf('TimeSeriesDateField');

  if (raw.groups.length > 1) {
    var keys = [0, 1, 2];

    if (tsDateIndex !== -1) {
      var groupTimes = _.groupBy(data, function(row){
        return row[Object.keys(row)[tsDateIndex]];
      });
      var timeSeriesX = Object.keys(groupTimes);
      var tsValueIndex = fields.indexOf(raw.aggregations[0].name);
      var tsGroupIndex = _.find([0, 1, 2], function(i){
        return i !== tsDateIndex && i !== tsValueIndex;
      });

      //tsDateIndex: Index for Time axis...
      //tsGroupIndex: Index for the field to group to
      //tsValueIndex: Index for the field with the value
      var keys = [tsDateIndex, tsGroupIndex, tsValueIndex];
    }

    graphData = multiGroups(raw, data, keys);

  } else {

    if (tsDateIndex !== -1) {
      //First row, X axis with dates values
      var groupTimes = _.groupBy(data, function(row){
        return row[Object.keys(row)[tsDateIndex]];
      });
      var timeSeriesX = Object.keys(groupTimes);
      var firstFieldName = Object.keys(raw.fields)[tsDateIndex];
      graphData.push([firstFieldName].concat(timeSeriesX));

      _.forEach(raw.aggregations, function(agg) {
        var fieldName = agg.name;
        var columnValues = _.map(data, function(row){
          return row[fieldName];
        });

        graphData.push([fieldName].concat(columnValues));
      });
    } else {
      _.forEach(raw.fields, function(value, field) {
        graphData.push([field].concat(_.map(data, field)));
      });

      _.forEach(raw.aggregations, function(agg) {
        if (types(agg.field.type) === 'timestamp') {
          var formattedDates = [];
          var tsArray = _.map(data, agg.name);
          _.forEach(tsArray, function(ts) {
            var fDate = new Date(ts);
            formattedDates.push(
              fDate.getFullYear() + '-' + 
              (0 + String(fDate.getMonth())).slice(-2) + '-' 
              + (0 + String(fDate.getDay())).slice(-2) + ' ' 
              + fDate.getHours() + ':' + fDate.getMinutes() + ':' 
              + fDate.getSeconds());
          });
          graphData.push([agg.name].concat(formattedDates));
        } else {
          graphData.push([agg.name].concat(_.map(data, agg.name)));
        }
      });
    }
  }

  return graphData;
}

function multiGroups(raw, data, keys) {
  var graphData = [];
  //keys[0]: First group to (X)
  //keys[1]: Secound group field to
  //keys[2]: Values

  //Getting query columns from data:
  var firstRow = data[0];
  var fields = Object.keys(data[0]);

  var fieldNames = [
    Object.keys(raw.fields)[keys[0]],
    Object.keys(raw.fields)[keys[1]],
    Object.keys(raw.fields)[keys[2]]
  ]

  //First row, X axis with dates values
  var groupX = _.groupBy(data, function(row){
    return row[Object.keys(row)[keys[0]]];
  });
  var X = Object.keys(groupX);
  graphData.push([fieldNames[0]].concat(X));

  var groupColumns = _.groupBy(data, function(row){
    return row[Object.keys(row)[keys[1]]];
  });

  //Black magic:

  //Add another row for each different value of the second column:
  _.forEach(groupColumns, function(columnData, name) {
    var columnValues = [];
    //Add one field for each timeSeriesX value:
    _.forEach(X, function(xValue) {
      var xRow = _.find(columnData, function(row) {
        return row[Object.keys(row)[keys[0]]] == xValue;
      });
      //Third column as the real value (0 if not present for this xValue):
      var value = xRow?xRow[Object.keys(xRow)[keys[2]]]:0;
      columnValues.push(value);
    });
    var row_name = (name !== 'undefined')?name:raw.aggregations[0].name;
    graphData.push([row_name].concat(columnValues));
  });  
    

  return graphData;
}

exports.prepareColumns = prepareColumns;