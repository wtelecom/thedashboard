var _ = require('lodash');

module.exports = PieC3;

function PieC3(data, raw, promise, types) {
  this.graph = {};
  this.data = data;
  this.raw = raw;
  this.types = types;
  this.promise = promise;
}

function prepareColumns(raw, data, types) {
  var graphData = [];

  //Each data row must have the aggregation value and the variable...
  var fields = Object.keys(data[0]);
  var aggIndex = fields.indexOf(raw.aggregations[0].name);
  var groupIndex = (aggIndex === 0)?1:0;
  _.forEach(data, function(row) {
    graphData.push([row[Object.keys(row)[groupIndex]], row[Object.keys(row)[aggIndex]]]);
  });

  return graphData;
}

function prepareAxis(raw, graphData, data, types) {
  // var axis = {x: [], y: []};
  var axis = { x:{}, y:{} };
  
  if (raw.graph.x) {

    // TODO: When will exist more X axis
    // _.forEach(raw.graph.x, function(field) {
    //   var xData = {};
    //   if (field.field.type === 'timestamp') {
    //     xData.type = 'timeseries';
    //     xData.tick = {
    //       format: '%Y-%m-%d %H:%M:%S',
    //       rotate: 75
    //     };
    //   }
    //   ((xData) ? axis.x = xData : console.log("No X axis to push"));
    // });

    if (types(raw.graph.x.field.type) === 'timestamp') {
      var xData = {};
      xData.type = 'timeseries';
      xData.tick = {
        format: '%Y-%m-%d %H:%M:%S',
        rotate: 75
      };
      ((xData) ? axis.x = xData : console.log("No X axis to push"));
    } else if (types(raw.graph.x.field.type) === 'varchar') {
      var xData = {};
      xData.type = 'category';
      xData.categories = _.map(data, raw.graph.x.field.name);
      ((xData) ? axis.x = xData : console.log("No X axis to push"));
    } else {
      graphData.x = raw.graph.x.field.name;
    }

    
  }

  if (raw.graph.y) {

    // TODO: When will exist more Y axis
    // _.forEach(raw.graph.y, function(field) {
    //   var yData = {};
    //   if (field.field.type === 'timestamp') {
    //     yData.type = 'timeseries';
    //     yData.tick = {
    //       format: '%Y-%m-%d %H:%M:%S'
    //     };
    //   }
    //   ((yData) ? axis.y = yData : console.log("No Y axis to push"));
    // });

    if (types(raw.graph.y.field.type) === 'timestamp') {
      var yData = {};
      yData.type = 'timeseries';
      yData.tick = {
        format: '%Y-%m-%d %H:%M:%S',
        rotate: 75
      };
      ((yData) ? axis.y = yData : console.log("No Y axis to push"));
    } else if (types(raw.graph.y.field.type) === 'varchar') {
      var yData = {};
      yData.type = 'category';
      yData.categories = _.map(data, raw.graph.y.field.name);
      ((yData) ? axis.y = yData : console.log("No Y axis to push"));
    } else {
      graphData.y = raw.graph.y.field.name;
    }

  }

  return axis;
}

function prepareFields(raw, types) {
  var fields = [];
  var timeseriesField = null;

  _.forEach(raw.datasource.fields, function(field) {
    if (types(field.type) === 'timestamp') {
      timeseriesField = field.name;
    }
  });

  _.forEach(raw.fields, function(value, field) {
    if (timeseriesField) {
      if (field != timeseriesField) {
        fields.push(field);
      }
    } else {
      fields.push(field);
    }
  });

  if (!_.isEmpty(raw.aggregations)) {
    _.forEach(raw.aggregations, function(agg) {
      fields.push(agg.name);
    });
  }

  return fields;
}

PieC3.prototype.dataset = function() {
  // Data info
  this.graph.data = {
    type: 'pie',
    xFormat: '%Y-%m-%d %H:%M:%S',
    columns: prepareColumns(this.raw, this.data, this.types)
  }

  // Fields info (this is a fake option)
  this.graph.fields = prepareFields(this.raw, this.types);

  // Returns the graph data
  this.promise.resolve(this.graph);
}
