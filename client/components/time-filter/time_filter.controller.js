'use strict';

angular.module('thedashboardApp')
  .controller('TimeFilterController', function ($scope, TimeFilter, $state, $location) {

    TimeFilter.registerObserver('visibility', updateVisibility);
    TimeFilter.registerObserver('quick', updateQuick);

    if($state.includes("main.reports")) {
      $scope.mode = 'absolute';
    } else {
      $scope.mode = 'quick';
    }

    $scope.$on('$locationChangeStart', function(event) {
      if($state.includes("main.reports")) {
        $scope.mode = 'absolute';
      } else {
        $scope.mode = 'quick';
      }
    });

    $scope.isVisible = false;

    function updateVisibility() {
      $scope.isVisible = TimeFilter.isVisible;
    }
    function updateQuick() {
      $scope.quick = TimeFilter.quick;
    }
    $scope.quickLists = TimeFilter.quicks;

    TimeFilter.setQuick('quick', $scope.quickLists[0][0]);

    $scope.setMode = function(mode) {
      $scope.mode = mode;
    }

    $scope.setQuick = function(quick) {
      TimeFilter.setQuick('quick', quick);
      TimeFilter.toogle('visibility');
    }

    $scope.selectAbsoluteDates = function() {
      TimeFilter.setAbsolute($scope.absoluteDate);
      TimeFilter.toogle('visibility');
    }

    $scope.now = new Date();

    $scope.absoluteDate = {
      from: new Date($scope.now.setFullYear($scope.now.getFullYear(), $scope.now.getMonth()-12)),
      to: new Date().setDate(new Date().getDate()-1)
    };

    $scope.format = 'YYYY-MM-DD HH:mm:ss.SSS';

    $scope.setToNow = function() {
      $scope.absoluteDate.to = new Date();
    };

  });
