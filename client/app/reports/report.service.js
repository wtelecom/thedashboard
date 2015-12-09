'use strict';

angular.module('thedashboardApp')
  .service('ReportService', function ReportService($http, socket, $q, queryService, Settings, TimeFilter) {
    var items = [];
    var currentRow = 0;
    var charts = {};
    return {
      addVisualization: function(taskReport, visualizatorService) {
        items.push({ sizeX: 12, sizeY: 3, row: currentRow, col: 0, id: taskReport.id, name: taskReport.name});
        currentRow += 1;
        queryService.getTaskData(
          taskReport.id,
          function(taskData) {
            console.log(taskData);
            visualizatorService.data(taskData.data.visualization);
            visualizatorService.onresize = function(){resize(taskReport)};
            visualizatorService.bind('#vis-' + taskReport.id);
            var chart = visualizatorService.render();
            charts[taskReport.id] = chart;
            resize(taskReport.id);
          }
        );
        //
        // function createSocket(name, cb) {
        //   console.log("Creating socket %s", name);
        //   socket.socket.on(name, function(data) {
        //     cb(data);
        //   });
        // }

        // This function use resize method of the c3js charts to modify its sizes.
        // Is used to adjust the chart to its containers
        // VERY IMPORTANT: all charts need to call this in its onresize function.
        function resize(chart_id, height) {
          if (!height) {
            height = getHeight(chart_id) + getRemainingHeight(chart_id);
          }
          charts[chart_id].resize({height: height - getRemainingHeight(chart_id)});
        }

        // This function return the height of a gridster item container.
        // Is used to know the height that should have the chart.
        // VERY IMPORTANT: all charts need to call this when its size is declared.
        function getHeight(chart_id) {
          var el = angular.element('#_' + chart_id)[0];
          var size = el.clientHeight - getRemainingHeight(chart_id);
          return size;
        }

        // This function return the remaining height between container and chart.
        function getRemainingHeight(chart_id) {
          var heading = angular.element('#_' + chart_id + ' .panel-heading')[0].clientHeight;
          var spacingTop = parseInt(angular.element('#_' + chart_id + ' .panel-body').css('padding-top').replace('px', ''));
          var spacingBottom = parseInt(angular.element('#_' + chart_id + ' .panel-body').css('padding-bottom').replace('px', ''));
          return heading + spacingTop + spacingBottom;
        }
      },
      loadReportVisualizations: function(reportId, visualizatorService) {

        var deferred = $q.defer();
        var settingsPromise = Settings.broker('reports', 'getData', {_id: reportId});
        var parent = this;

        settingsPromise.then(function(report) {
          _.forEach(report.matrix, function(taskReport) {
            parent.addVisualization(taskReport, visualizatorService);
          });
          deferred.resolve(items);
        });
        return deferred.promise;
      }
    }
});
