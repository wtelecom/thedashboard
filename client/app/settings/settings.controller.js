'use strict';

angular.module('thedashboardApp')
  .controller('SettingsDashboardCtrl', function ($scope) {

  })
  .controller('SettingsTabController', function ($scope, $cacheFactory, Plugin, $http, $injector, queryService, Settings) {
    $scope.plugins = {};
    $scope.config = {
      acquisitor: {},
      visualizator: {}
    };
    // Initializing plugins tab
    initTabPlugins();

    function initTabPlugins() {
      var pluginsAcquisitorPromise = Plugin.broker('getAcquisitorPlugins');
      pluginsAcquisitorPromise.then(function(acquisitorPlugins) {
        $scope.plugins.acquisitors = acquisitorPlugins;
        $scope.plugins.acquisitorActive = Plugin.getAcquisitor();
        $scope.plugins.visualizators = Plugin.getVisualizatorPlugins();
        $scope.plugins.visualizatorActive = Plugin.getVisualizator();
        $scope.plugins.eventors = Plugin.getEventorPlugins();
        $scope.plugins.eventorActive = Plugin.getEventor();
        $scope.plugins.acquisitorSetup = Plugin.getAcquisitorSetup();

        // Setting acquisitor config variables 
        $scope.config.acquisitor = Plugin.getAcquisitorConfig();
        $scope.visualizatorService = $injector.get($scope.plugins.visualizatorActive + "Visualizator");
      });
    }

    $scope.acquisitorSelectChange = function() {
      var name = $scope.plugins.acquisitorActive;
      Plugin.setPluginEnable('acquisitor', name, function(data) {
        initTabPlugins();
      });
    };

    $scope.acquisitorSetConfig = function(field, value) {
      var name = $scope.plugins.acquisitorActive;
      Plugin.setPluginConfig('acquisitor', name, field, value, function(data){
      });
    }

    $scope.visualizatorSelectChange = function() {
      var name = $scope.plugins.visualizatorActive;
      Plugin.setPluginEnable('visualizator', name, function(data) {
      });
    };

    $scope.eventorSelectChange = function() {
      var name = $scope.plugins.eventorActive;
      Plugin.setPluginEnable('eventor', name, function(data) {
      });
    };

    // Dashboards
    var dashboardsPromise = Settings.broker(
      'dashboards',
      'getData',
      {}
    );

    dashboardsPromise.then(function(dashboards) {
      $scope.dashboards = dashboards;
    });

    $scope.selectedDashboards = [];
    $scope.toggleAllDashboards = function() {
      if ($scope.selectedDashboards.length === $scope.dashboards.length) {
        // all items selected
        $scope.selectedDashboards = [];
      } else {
        // 0/some items selected
        $scope.selectedDashboards = _.clone($scope.dashboards);
      }
    };

    $scope.deleteDashboard = function(dashboard) {
      queryService.deleteSetting(
        'dashboards',
        dashboard._id,
        function(data) {
          var index = $scope.dashboards.indexOf(dashboard);
          if (index > -1) {
            $scope.dashboards.splice(index, 1);
          }
        });
    };

    $scope.showDashboard = function(dashboard) {
      // TODO: show the dashboard
      console.log('Showing dashboard: ' + dashboard.name);
    };

    $scope.deleteAllDashboards = function() {
      var temp = _.clone($scope.selectedDashboards);
      _.each(temp, function(dashboard) {
        $scope.deleteDashboard(dashboard);
      });
      temp = null;
    };

    $scope.toggleDashboard = function(dashboard) {
      var index = $scope.selectedDashboards.indexOf(dashboard);
      if (index > -1) {
        $scope.selectedDashboards.splice(index, 1);
      } else {
        $scope.selectedDashboards.push(dashboard);
      }
    };


    // Visualizations
    var visualizationsPromise = Settings.broker(
      'visualizations',
      'getData',
      {}
    );
    visualizationsPromise.then(function(visualizations) {
       $scope.visualizations = visualizations;
     });

    $scope.selectedVisualizations = [];
    $scope.toggleAllVisualizations = function() {
      if ($scope.selectedVisualizations.length === $scope.visualizations.length) {
        // all items selected
        $scope.selectedVisualizations = [];
      } else {
        // 0/some items selected
        $scope.selectedVisualizations = _.clone($scope.visualizations);
      }
    };

    $scope.deleteVisualization = function(visualization) {
      queryService.deleteSetting(
        'visualization',
        visualization._id,
        function(data) {
          var index = $scope.visualizations.indexOf(visualization);
          if (index > -1) {
            $scope.visualizations.splice(index, 1);
          }
        });
    };

    $scope.deleteAllVisualizations = function() {
      var temp = _.clone($scope.selectedVisualizations);
      _.each(temp, function(visualization) {
        $scope.deleteVisualization(visualization);
      });
      temp = null;
    };

    $scope.toggleVisualization = function(visualization) {
      var index = $scope.selectedVisualizations.indexOf(visualization);
      if (index > -1) {
        $scope.selectedVisualizations.splice(index, 1);
      } else {
        $scope.selectedVisualizations.push(visualization);
      }
    };

    $scope.getIcon = function(visualization) {
      return $scope.visualizatorService.getIcon(visualization.json.chartType);
    }

  })
  .controller('SettingsTabDataSourcesController', function ($scope, queryService, socket, $injector, $cacheFactory, Plugin, Settings) {
    getPlugins();

    // Getting the visualizator and the acquisitor
    function getPlugins() {
      var pluginsAcquisitorPromise = Plugin.broker('getAcquisitorPlugins');
      pluginsAcquisitorPromise.then(function(acquisitorPlugins) {
        $scope.visualizatorService = $injector.get(Plugin.getVisualizator() + "Visualizator");
        $scope.acquisitorService = $injector.get(Plugin.getAcquisitor() + "Acquisitor");
        // Getting the datasources
        getDatasources(Plugin.getAcquisitor());
      });
    }

    function getDatasources(acquisitor) {
      var settingsPromise = Settings.broker('datasource', 'getData', {acquisitor: acquisitor});
      settingsPromise.then(function(datasources) {
        $scope.datasources = datasources;
      });
    }

    // TODO: Improve this "Pyramid Of Doom"
    $scope.updateDatasources = function() {
      queryService.createTask(
        'query',
        'setting',
        {action: "updateDatasources"},
        function(data) {
          if (data.response !== 'error') {
            createSocket("query-" + data.data.job, function(data) {
              console.log("Task %d event received", data.job);
              queryService.getSetting(
                data.job,
                function(taskData) {
                  if (taskData.response !== 'error') {
                    // This method must parse the datasources
                    // Every acquisitor has their own parser
                    var dataSources = $scope.acquisitorService.parse({
                      action: "updateDatasources",
                      data: taskData.data
                    });
                    //console.log(dataSources);
                    // If exists datasources, we get all fields
                    if (dataSources.length > 0) {
                      queryService.createTask(
                        'query',
                        'setting',
                        {action: "fieldsFromDatasources"},
                        function(dataChildTask) {
                          if (dataChildTask.response !== 'error') {
                            createSocket("query-" + dataChildTask.data.job, function(dataChildSocket) {
                              console.log("Task %d event received", dataChildSocket.job);
                              queryService.getSetting(
                                dataChildSocket.job,
                                function(taskChildData) {
                                  if (taskChildData.response !== 'error') {
                                    // This method must parse the fields
                                    // Every acquisitor has their own parser
                                    var fields = $scope.acquisitorService.parse({
                                      action: "fieldsFromDatasources",
                                      data: taskChildData.data,
                                      extra: dataSources
                                    });

                                    var mix = $scope.acquisitorService.parse({
                                      action: "composeDatasourcesInfo",
                                      data: fields,
                                      extra: dataSources
                                    });

                                    queryService.updateSetting(
                                      'datasource',
                                      mix,
                                      function(datasourcesData) {
                                        $scope.datasources = mix;
                                      }
                                    );
                                  }
                                }
                              );
                            });
                          }
                        }
                      );
                    }
                  }
                }
              );
            });
          }
        }
      );
    };

    function createSocket(name, cb) {
      console.log("Creating socket %s", name);
      socket.socket.on(name, function(data) {
        cb(data);
      });
    }
  });
