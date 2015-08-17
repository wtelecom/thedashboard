/**
 * Plugins configuration
 */

var config = require('./environment'),
    path = require('path');


var plugins = [
  {
    name: 'acquisitor',
    pluginName: 'druid',
    pluginTitle: 'Druid',
    active: true,
    config: {
      address: '10.128.19.58:2181,10.128.19.60:2181,10.128.19.65:2181/druid',
      parameters: '/discovery/broker',
      extra: {
        zookeeper: {
          sessionTimeout: 30000,
          spinDelay : 1000,
          retries : 10
        }
      }
    }
  },
  {
    name: 'acquisitor',
    pluginName: 'spark',
    pluginTitle: 'Spark',
    active: true,
    config: {
      url: 'jdbc:hive2://10.128.19.61:10000/default',
      user: '',
      password: '',
      libpath: path.join(config.root, 'server', 'plugins', 'acquisitor', 'spark', 'jar', 'custom-jdbc-hive-0.0.1.jar'),
      libs: [],
      drivername: 'org.apache.hive.jdbc.HiveDriver'
    }
  },
  {
    name: 'eventor',
    pluginName: 'kafka',
    pluginTitle: 'Kafka',
    active: true,
    config: {
      address: '10.128.19.58:2181,10.128.19.59:2181,10.128.19.60:2181/kafka',
      // TODO: Partition number could be required in a near future
      topics: [
        {topic: 'logstash.collectd'},
        {topic: 'logstash.netflow'}
      ],
      options: { autoCommit: true, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024*1024 }
    }
  },
  {
    name: 'visualizator',
    pluginName: 'c3',
    pluginTitle: 'C3',
    active: true,
    config: {}
  }
];

module.exports = plugins;
