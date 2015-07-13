/**
 * Druid plugin engine
 */

var glob = require("glob");
var _ = require("lodash");


module.exports = Plugin;

function Plugin(app, plugins) {
  var currentPlugins = new Array();

  // Check if plugins array contains only one "name" key
  activePlugins = _.filter(plugins, function(plugin) {
    return ((plugin.active) ? true: false);
  });

  if (activePlugins.length > 0) {
    // Collect active plugins
    _.forEach(activePlugins, function(plugin) {
      var path = __dirname + '/' + plugin.name + '/' + plugin.pluginName;
      if (check(path)) {
        plugin.path = path;
        currentPlugins.push(plugin);
      } else {
        console.log(plugin.pluginName);
        throw new Error('You need add an index.js file in the ' + plugin.pluginName + ' plugin');
      }
    });

    // Check if path contains an index.js file
    function check(path) {
      files = glob.sync("index.js", {cwd: path, root: path});
      return ((files && files.length === 1) ? true : false);
    }
  }

  // Plugins setted express app
  app.set('plugins', currentPlugins);
  console.log('Plugins registered');
};

// Get all active plugins related with type
Plugin.prototype.activePlugins = function(plugins, type) {
  var activeP = new Array();
  if (plugins.length > 0) {
    _.forEach(plugins, function(p){
      if (p.active === true && p.name === type) {
        activeP.push(p);
      }
    });
  }
  return activeP;
}