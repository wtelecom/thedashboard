'use strict';

angular.module('thedashboardApp')
  .factory('Plugin', function Plugin($http, $q, $cacheFactory, $injector) {
    var cache = $cacheFactory('Plugin');

    // Get enable plugins
    function prepareData(cb) {
      
      var deferred = $q.defer();

      $http.get(apiPrefix + '/data/plugins/info', {}).
        success(function(data) {
          if (data.response === "error") { return data.data; }
          cache.put("plugins", data.data);
          deferred.resolve(cb(deferred));
        }).
        error(function(err) {
          console.log(err);
        });
      return deferred.promise;
    }

    return {
      cache: cache,

      // Requests broker
      broker: function(name) {
        if (!cache.get("plugins")) {
          var promise = prepareData(this[name]);
          return promise;
        } else {
          return this[name]();
        }
      },

      // TODO: This must be improved, always must call to this method in order
      // to work with Plugin service methods
      // Returns all acquisitor plugins availables
      getAcquisitorPlugins: function(deferred) {
        ((!deferred) ? deferred = $q.defer() : deferred = deferred);
        var plugins = cache.get("plugins");
        if (plugins) {
            var acquisitorPlugins = _.filter(plugins, function(plugin) {
              if (plugin.name === "acquisitor") {
                return true;
              } else {
                return false;
              }
            });
            deferred.resolve(acquisitorPlugins);
          } else {
            deferred.resolve({})
          }
          return deferred.promise;
      },

      // Returns the acquisitor plugin active
      getAcquisitor: function() {
          if (cache.get("plugins")) {
            var plugins = cache.get("plugins");
            return _.result(_.find(plugins, {'name': 'acquisitor', 'enable': true}), 'pluginName');
          }
          return null;
      },

      // Set current acquisitor service instance
      // CAUTION: This method is valid only for the visualizator editor screen
      setAcquisitorInstance: function() {
        if (cache.get("acquisitorService")) {
          return cache.get("acquisitorService");
        } else {
          cache.put("acquisitorService", $injector.get(this.getAcquisitor() + "Acquisitor"));
          return cache.get("acquisitorService");
        }
      },

      // Get current setAcquisitorInstance service instance
      // CAUTION: This method is valid only for the visualizator editor screen
      getAcquisitorInstance: function() {
        if (cache.get("acquisitorService")) {
          return cache.get("acquisitorService");
        } else {
          return this.setAcquisitorInstance();
        }
      },

      // Returns all visualizator plugins availables
      getVisualizatorPlugins: function() {
        if (cache.get("plugins")) {
            var plugins = cache.get("plugins");
            var visualizatorPlugins = _.filter(plugins, function(plugin) {
              if (plugin.name === "visualizator") {
                return true;
              } else {
                return false;
              }
            });

            return visualizatorPlugins;
          }
          return null;
      },

      // Returns the visualizator plugin active
      getVisualizator: function() {
        if (cache.get("plugins")) {
          var plugins = cache.get("plugins");
          return _.result(_.find(plugins, {'name': 'visualizator', 'enable': true}), 'pluginName');
        }
        return null;
      },

      // Set current visualizator service instance
      // CAUTION: This method is valid only for the visualizator editor screen
      setVisualizatorInstance: function() {
        if (cache.get("visualizatorService")) {
          return cache.get("visualizatorService");
        } else {
          cache.put("visualizatorService", $injector.get(this.getVisualizator() + "Visualizator"));
          return cache.get("visualizatorService");
        }
      },

      // Get current visualizator service instance
      // CAUTION: This method is valid only for the visualizator editor screen
      getVisualizatorInstance: function() {
        if (cache.get("visualizatorService")) {
          return cache.get("visualizatorService");
        } else {
          return this.setVisualizatorInstance();
        }
      },

      // Returns all eventor plugins availables
      getEventorPlugins: function() {
        if (cache.get("plugins")) {
            var plugins = cache.get("plugins");
            var eventorPlugins = _.filter(plugins, function(plugin) {
              if (plugin.name === "eventor") {
                return true;
              } else {
                return false;
              }
            });

            return eventorPlugins;
          }
          return null;
      },

      // Returns the visualizator plugin active
      getEventor: function() {
          if (cache.get("plugins")) {
            var plugins = cache.get("plugins");
            return _.result(_.find(plugins, {'name': 'eventor', 'enable': true}), 'pluginName');
          }
          return null;
      },

      // Set enable only one plugin of the type
      setPluginEnable: function(type, name, cb) {
        $http.post(apiPrefix + '/data/plugins/enable/' + type + '/' + name)
          .success(function(data) {
            return cb(data);
          })
          .error(function(err) {
            return cb(err);
          });
      },
    };
  });
