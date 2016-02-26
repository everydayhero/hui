'use strict'

import React from 'react'
import DataVisualisation from '../../../graphs/DataVisualisation'

function getSeries(tick) {
  var series = [[], [], [], []];
  var count = 0;

  while(count < 50) {
    var value = (Math.abs(Math.sin(count + tick) * 5100000));
    var value2 = (Math.abs(Math.cos(count + tick) * 5100000));
    var value3 = (Math.abs(Math.sin(count + 5 + tick) * 3000000));
    var value4 = (Math.abs(Math.sin(count + 5 + tick) * 3000000));

    series[0].push({
      date: new Date(2014, 1, count + tick, 0, 0, 0, 0).toISOString(),
      pages: value
    });

    series[1].push({
      date: new Date(2014, 1, count + tick, 0, 0, 0, 0).toISOString(),
      pages: value2
    });

    series[2].push({
      date: new Date(2014, 1, count + tick, 0, 0, 0, 0).toISOString(),
      pages: value3
    });

    series[3].push({
      date: new Date(2014, 1, count + tick, 0, 0, 0, 0).toISOString(),
      pages: value4
    });

    count++;
  }

  return series;
}

export default React.createClass({
  displayName: 'DataVisualisationExample',
  getInitialState: function() {
    return {
      series: getSeries(1),
      seriesValueKey: 'pages',
      legendLabels: ['Campaign 1', 'Campaign 2', 'Campaign 3', 'Campaign 4'],
      delta: -0.12,
      total: 160000000,
      tipLabel: 'Pages'
    };
  },

  render: function() {
    if (this.state.hide) {
      return false;
    }

    return (
    <div>
      <h3 className="DemoPage__h3" id="DataVisualisation">DataVisualisation</h3>
      <p>The HUI data visualisation is a combination of a number of graph component. These componets can also be used independantly of the data visualisation.</p>
      <div className="DemoPage__example--visualisation">
        <DataVisualisation {...this.state} title={ 'Example Data' } period={ 'LAST 7 DAYS' }  />
      </div>
      <div className="DemoPage__example--visualisation">
        <DataVisualisation {...this.state} title={ 'Example Loading Data' } period={ 'LAST 7 DAYS' } loading={ true } />
      </div>
      <div className="DemoPage__example--visualisation">
        <DataVisualisation {...this.state} title={ 'Example Empty Data' } period={ 'LAST 7 DAYS' } emptyState={ true } />
      </div>
    </div>
    );
  }
});
