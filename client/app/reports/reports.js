'use strict';

angular.module('thedashboardApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.reports', {
        url: 'reports',
        views: {
          "section-view": {
            templateUrl: 'app/reports/reports.html',
            controller: 'ReportsOpenCtrl'
          }
        },
        ncyBreadcrumb: {
          label: 'Reports'
        }
      });
  });
