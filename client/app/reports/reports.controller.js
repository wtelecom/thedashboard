'use strict';

angular.module('thedashboardApp')
.controller('ReportsCtrl', function ($scope) {
})
.controller('ReportsCreateCtrl', function ($scope, $rootScope, $modal) {
  $rootScope.sectionName = "Reports";
  $rootScope.sectionDescription = "Create a new Report";
})
.controller('ReportsOpenCtrl', function ($scope, $rootScope, Settings, $location) {
  $rootScope.sectionName = "Reports";
  $rootScope.sectionDescription = "Open a report";

  var settingsPromise = Settings.broker('reports', 'getData', {});
  settingsPromise.then(function(reports) {
    $scope.reports = reports;
  });

  $scope.routeTo = function ( path ) {
    $location.path( path );
  };
})
