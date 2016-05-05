var _ = require('lodash'),
  typesFn = new (require('../../../../acquisitor/mysql/lib/parser'))();


module.exports = MysqlC3Parser;


function MysqlC3Parser(data, raw, promise) {
  this.data = data;
  this.raw = raw;
  this.promise = promise;
}

MysqlC3Parser.prototype.rawParser = function() {
  if (this.raw.chartType) {
    switch(this.raw.chartType) {
      case 'bar':
        var graph = new (require('../graphics/' + this.raw.chartType))(this.data, this.raw, this.promise, typesFn.types);
        graph.dataset();
        break;
      case 'area':
        var graph = new (require('../graphics/' + this.raw.chartType))(this.data, this.raw, this.promise, typesFn.types);
        graph.dataset();
        break;
      case 'pie':
        var graph = new (require('../graphics/' + this.raw.chartType))(this.data, this.raw, this.promise, typesFn.types);
        graph.dataset();
        break;
      case 'line':
        var graph = new (require('../graphics/' + this.raw.chartType))(this.data, this.raw, this.promise, typesFn.types);
        graph.dataset();
        break;
      default:
        break;
    }
  }
};

// Sometimes it's necessary treat data
// This method, prepare the content to the visualizator
MysqlC3Parser.prototype.preTreatment = function() {
  return new Error("NOT IMPLEMENTED");
};