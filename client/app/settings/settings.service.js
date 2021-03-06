'use strict';

angular.module('thedashboardApp')
  .service('Settings', function Plugin($http, $q, $cacheFactory) {
    var cache = $cacheFactory('Settings');

    // Get setting data
    function prepareData(type, cb, extra) {
      var deferred = $q.defer();

      $http.get(
        apiPrefix + '/data/' + type,
        {
          params: ((extra) ? extra : {})
        }).
        success(function(data) {
          if (data.response === "error") { return data.data; }
          ((extra) ? cache.put(type + JSON.stringify(extra), data.data) : cache.put(type, data.data));
          return cb(((extra) ? type + JSON.stringify(extra) : type), deferred);
        }).
        error(function(err) {
          console.log(err);
        });
      return deferred.promise;
    }

    return {
      cache: cache,

      // Requests broker
      broker: function(type, name, data) {
        var element = ((data) ? type + JSON.stringify(data) : type);
        if (!cache.get(element)) {
          var promise = prepareData(type, this[name], data);
          return promise;
        } else {
          return ((data) ? this[name](type + JSON.stringify(data)) : this[name](type));
        }
      },

      // Returns proper data
      getData: function(type, deferred) {
        ((!deferred) ? deferred = $q.defer() : deferred = deferred);
        if (cache.get(type)) {
          deferred.resolve(cache.get(type));
        } else {
          deferred.resolve({});
        }
        return deferred.promise;
      },
    }
    
  });
