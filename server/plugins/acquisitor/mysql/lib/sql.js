var squel = require('squel'),
    _ = require('lodash');

module.exports = SQLParser;

function SQLParser() {
  this.data = null;
  this.query = squel.select();
}

SQLParser.prototype.run = function() {
  inspector = new SQLInspector(this.data, this.query);
  
  console.log(this.data);

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
        parent.query.field(key);
      });
    }
  };

  // Set query aggregations
  this.aggregations = function() {
    if (this.data.aggregations) {
      _.forEach(this.data.aggregations, function(aggregation, index) {
        parent.query.field(aggregation.type.type + '(' + aggregation.field.name + ') AS agg' + index);
      });
    }
  };

  // Set query groups
  this.groups = function() {
    if (this.data.groups) {
      _.forEach(this.data.groups, function(group) {
        if (group.field.scope == 'aggregation') {
          parent.query.having(group.field.name);
        } else {
          switch(group.field.type) {
            case 'timestamp':
              parent.query.group(
                "YEAR(" + group.field.name + 
                "), MONTH(" + group.field.name + 
                "), DAY(" + group.field.name + 
                "), HOUR(" + group.field.name + 
                "), MINUTE(" + group.field.name + 
                "), SECOND(" + group.field.name + ")"
              );
              break;
            default:
              parent.query.group(group.field.name);
              break;
          }
        }
      });
    }
  };

  // Set query orders
  this.orders = function() {
    if (this.data.orders) {
      _.forEach(this.data.orders, function(order) {
        parent.query.order(order.field.name, ((order.type == 'asc') ? true : false));
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