var squel = require('squel'),
    _ = require('lodash');

module.exports = SQLParser;

function SQLParser() {
  this.data = null;
  this.query = squel.select();
}

SQLParser.prototype.run = function() {
  inspector = new SQLInspector(this.data, this.query);

  inspector.datasource();
  inspector.fields();  
  inspector.aggregations();
  inspector.groups();
  inspector.orders();
  inspector.limit();

  console.log(this.query.toString());
  return this.query.toString();
};

function SQLInspector(data, query) {
  this.data = data;
  this.query = query;
  var parent = this;
  
  //Check the type of the first field. If it's timestamp, prepare for a TimeSeries query...
  var timeFields = _.filter(this.data.datasource.fields, function(row) {
    //parent.query.where(key + ' < NOW()');
    if (row.type === 'timestamp') {
      parent.query.where(row.name + ' < NOW()');
      parent.query.where(row.name + ' > DATE_SUB(NOW(), INTERVAL 10 DAY)');
    }
    return row.type === 'timestamp';
  });

  var keys = Object.keys(this.data.fields);
  
  var timeSeries = _.find(timeFields, function(row) {
    return keys.indexOf(row.name) !== -1;
  });
  //timeSeries.name...

  // Set query datasource
  this.datasource = function() {
    if (this.data.datasource) {
      this.query.from(this.data.datasource.name);
    }
  };

  // Set query fields
  this.fields = function() {
    if (this.data.fields) {
      _.forEach(this.data.fields, function(value, key) {
        if (timeSeries && timeSeries.name === key) {
          parent.query.field('DATE_FORMAT(' + key + ', "%Y-%m-%d %H") AS TimeSeriesDateField');

          //With date:
          parent.query.where(key + ' < NOW()');
          //Lasts rows:
          parent.query.order(' TimeSeriesDateField ', false);

        } else {
          parent.query.field(key);
        }
      });
    }
  };

  // Set query aggregations
  this.aggregations = function() {
    if (this.data.aggregations) {
      _.forEach(this.data.aggregations, function(aggregation, index) {
        if (!_.isEmpty(aggregation))
          parent.query.field(aggregation.type.type + '(' + aggregation.field.name + ') AS ' + ((aggregation.name) ? '"' + aggregation.name + '"' : 'agg' + index));
      });
    }
  };

  // Set query groups
  this.groups = function() {
    if (this.data.groups) {
      _.forEach(this.data.groups, function(group) {
        if (!_.isEmpty(group)) {
          if (group.field.scope == 'aggregation') {
            parent.query.having(group.field.name);
          } else {
            switch(group.field.type) {
              case 'timestamp':
                parent.query.group('TimeSeriesDateField');
                break;
              default:
                parent.query.group(group.field.name);
                break;
            }
          }
        }
      });
    }
  };

  // Set query orders
  this.orders = function() {
    if (this.data.orders) {
      _.forEach(this.data.orders, function(order) {
        if (!_.isEmpty(order))
          parent.query.order(' "' + order.field.name + '" ', ((order.type == 'asc') ? true : false));
      });
    }
  };

  // Set query limit
  this.limit = function() {
    if (this.data.limit) {
      parent.query.limit(this.data.limit);
    }
  };  
}