'use strict';

angular.module('thedashboardApp')
.controller('ReportsCtrl', function ($scope) {
})
.controller('ReportsNewCtrl', function ($scope, $rootScope) {
  $rootScope.sectionName = "Reports";
  $rootScope.sectionDescription = "Create a new Report";

})
.controller('ReportsOpenCtrl', function ($scope, $rootScope, Settings) {
  $rootScope.sectionName = "Reports";
  $rootScope.sectionDescription = "Open a report";

  var settingsPromise = Settings.broker('reports', 'getData', {});
  settingsPromise.then(function(reports) {
    $scope.reports = reports;
  });

})
