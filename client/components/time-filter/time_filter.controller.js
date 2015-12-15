'use strict';

angular.module('thedashboardApp')
  .controller('TimeFilterController', function ($scope, TimeFilter, $state, $location) {
    $scope.quickLists = TimeFilter.quicks;

    TimeFilter.registerObserver('visibility', updateVisibility);
    TimeFilter.registerObserver('quick', updateQuick);

    $scope.$on('$locationChangeStart', function(event) {
      setModeByUrl();
    });

    $scope.isVisible = false;
    $scope.now = new Date();

    $scope.absoluteDate = {
      from: new Date($scope.now.setFullYear($scope.now.getFullYear(), $scope.now.getMonth()-12)),
      to: new Date()
    };

    $scope.format = 'YYYY-MM-DD HH:mm:ss.SSS';

    setModeByUrl();

    function updateVisibility() {
      $scope.isVisible = TimeFilter.isVisible;
    }

    function updateQuick() {
      $scope.quick = TimeFilter.quick;
    }

    function setModeByUrl(){
      if($state.includes("main.reports")) {
        TimeFilter.setAbsolute($scope.absoluteDate);
        $scope.mode = 'absolute';
      } else {
        TimeFilter.setQuick('quick', $scope.quickLists[0][0]);
        $scope.mode = 'quick';
      }
    }

    //TimeFilter.setQuick('quick', $scope.quickLists[0][0]);

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

    $scope.setToNow = function() {
      $scope.absoluteDate.to = $scope.now
    };

  });
