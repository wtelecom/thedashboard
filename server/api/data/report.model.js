'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReportSchema = new Schema({
  name: String,
  visualizatorPlugin: String,
  acquisitorPlugin: String,
  visualizations: [{ type: Schema.Types.ObjectId, ref: 'Visualization'}],
  matrix: [],
  time: Schema.Types.Mixed,
  progress: Number
});

module.exports = mongoose.model('Report', ReportSchema);
