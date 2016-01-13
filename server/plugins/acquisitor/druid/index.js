/**
 * Druid acquisition engine
 */

var Druid = require('druid-query'),
    Query = require('./lib/query');

module.exports = DruidPlugin;

function DruidPlugin(acquisitor, data) {

  // Plugin needs its acquisitor parent
  this.acquisitor = acquisitor;

  // isConnected true if the plugin is in use
  this.isConnected = false;

  // Druid data needed to stablish the connection
  this.data = data;

  // Plugin name
  this.name = 'druid';

  // Druid connection
  this.connection = null;

  // Druid query lib
  this.queryClient = null;
}

// Return a new Druid connection
DruidPlugin.prototype.connect = function() {
  this.isConnected = true;
  this.connection = new Druid(this.data.url, this.data.path, this.data.extra);
  this.connection.once('ready', function() {
        console.log("are you ready!!!!!!!!!!");
      });
  this.connection.zk.on('connected', function() {
    console.log("connected to ZK, that's great!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  });
  this.connection.zk.on('disconnected', function() {
    console.log("disconnected from ZK, NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
  });
  this.connection.on('error', function(err) {
  console.log("**************************************************************" + err);
});
  this.queryClient = new Query(this.connection);
}

// Close the Druid connection
DruidPlugin.prototype.close = function(cb) {
  this.isConnected = false;
  this.connection.end();
  console.log('Druid connection closed');
  cb();
};
