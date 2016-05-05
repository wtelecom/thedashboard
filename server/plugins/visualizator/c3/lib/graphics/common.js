var _ = require('lodash');

function prepareColumns(raw, data, types) {
  var graphData = [];

  //Getting query columns from data:
  var firstRow = data[0];
  var fields = Object.keys(data[0]);
  var tsDateIndex = fields.indexOf('TimeSeriesDateField');
  
  if (tsDateIndex !== -1) {
    console.log('Time Series Found');

    //First row, X axis with dates values
    var groupTimes = _.groupBy(data, function(row){
      return row[Object.keys(row)[tsDateIndex]];
    });
    var timeSeriesX = Object.keys(groupTimes);
    var firstFieldName = Object.keys(raw.fields)[tsDateIndex];
    graphData.push([firstFieldName].concat(timeSeriesX));

    //One or two groups?
    if (raw.groups.length > 1) {
      var tsValueIndex = fields.indexOf(raw.aggregations[0].name);
      var tsGroupIndex = _.find([0, 1, 2], function(i){
        return i !== tsDateIndex && i !== tsValueIndex;
      });

      //tsDateIndex: Index for Time axis...
      //tsGroupIndex: Index for the field to group to
      //tsValueIndex: Index for the field with the value

      var groupColumns = _.groupBy(data, function(row){
        return row[Object.keys(row)[tsGroupIndex]];
      });

      //Black magic:

      //Add another row for each different value of the second column:
      _.forEach(groupColumns, function(columnData, name) {
        var columnValues = [];
        //Add one field for each timeSeriesX value:
        _.forEach(timeSeriesX, function(timeValue) {
          var timeRow = _.find(columnData, function(row) {
            return row[Object.keys(row)[tsDateIndex]] == timeValue;
          });
          //Third column as the real value (0 if not present for this timeValue):
          var value = timeRow?timeRow[Object.keys(timeRow)[tsValueIndex]]:0;
          columnValues.push(value);
        });
        var row_name = (name !== 'undefined')?name:raw.aggregations[0].name;
        graphData.push([row_name].concat(columnValues));
      });  
    } else {
      
      _.forEach(raw.aggregations, function(agg) {
        var fieldName = agg.name;
        var columnValues = _.map(data, function(row){
          return row[fieldName];
        });

        graphData.push([fieldName].concat(columnValues));
      });
    }

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

  return graphData;
}

exports.prepareColumns = prepareColumns;