'use strict';

angular.module('thedashboardApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.reports', {
        url: 'reports',
        views: {
          "section-view": {
            templateUrl: 'app/reports/templates/reports.html',
            controller: 'ReportsCtrl',
          }
        },
        ncyBreadcrumb: {
          label: 'Reports'
        }
      })
      .state('main.reports.create', {
        url: '/create',
        views: {
          "reports-child": {
            templateUrl: 'app/reports/templates/reports-create.html',
            controller: 'ReportsCreateCtrl'
          }
        },
        ncyBreadcrumb: {
          label: 'Create'
        }
      })
      .state('main.reports.open', {
        url: '/open/:id',
        views: {
          "reports-child": {
            templateUrl: 'app/reports/templates/reports-open.html',
            controller: 'ReportsOpenCtrl'
          }
        },
        ncyBreadcrumb: {
          label: 'Open'
        }
      });
  });
