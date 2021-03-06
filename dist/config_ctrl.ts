import _ from 'lodash';

export class LogzioConfigCtrl {
  static templateUrl = './partials/config.html';
  current: any;

  /** @ngInject */
  constructor($scope) {
    this.current.jsonData.timeField = this.current.jsonData.timeField || '@timestamp';
    this.current.jsonData.esVersion = this.current.jsonData.esVersion || 5;
    this.current.jsonData.maxConcurrentShardRequests = this.current.jsonData.maxConcurrentShardRequests || 256;
    this.current.jsonData.headers = this.current.jsonData.headers || [ { key : "", value: "" } ];
  }

  indexPatternTypes = [
    { name: 'No pattern', value: undefined },
    { name: 'Hourly', value: 'Hourly', example: '[logstash-]YYYY.MM.DD.HH' },
    { name: 'Daily', value: 'Daily', example: '[logstash-]YYYY.MM.DD' },
    { name: 'Weekly', value: 'Weekly', example: '[logstash-]GGGG.WW' },
    { name: 'Monthly', value: 'Monthly', example: '[logstash-]YYYY.MM' },
    { name: 'Yearly', value: 'Yearly', example: '[logstash-]YYYY' },
  ];

  esVersions = [{ name: '2.x', value: 2 }, { name: '5.x', value: 5 }, { name: '5.6+', value: 56 }];

  indexPatternTypeChanged() {
    var def = _.find(this.indexPatternTypes, {
      value: this.current.jsonData.interval,
    });
    this.current.database = def.example || 'es-index-name';
  }

  addHeader() {
    var addIndex = this.current.jsonData.headers.length;

    this.current.jsonData.headers.splice(addIndex, 0, { key : "", value: "" });
  }

  removeHeader($index) {
    this.current.jsonData.headers.splice($index, 1);
  }
}
