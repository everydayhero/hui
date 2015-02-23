/** @jsx React.DOM */
"use strict";

var React     = require('react');
var Highlight = require('react-highlight');
var DataVisualisation = require('../../graphs/DataVisualisation');

function getSeries(tick) {
  var series = [[], [], []];
  var count = 0;

  while(count < 50) {
    var value = (Math.abs(Math.sin(count + tick) * 5100000));
    var value2 = (Math.abs(Math.cos(count + tick) * 5100000));
    var value3 = (Math.abs(Math.sin(count + 5 + tick) * 3000000));

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

    count++;
  }

  return series;
}

module.exports = React.createClass({
  displayName: 'DataVisualisationExample',

  getInitialState: function() {
    return {
      series: getSeries(1),
      seriesValueKey: 'pages',
      legendLabels: ['Campaign 1', 'Campaign 2', 'Campaign 3'],
      total: 7000,
      title: 'Example Data'
    };
  },

  render: function() {
    if (this.state.hide) {
      return false;
    }

    return (
    <div>
      <h3 className="DemoPage__h2">DataVisualisation</h3>
      <h4 className="DemoPage__h4">DataVisualisation propTypes</h4>
      <ul className="DemoPage__ul">
        <li className="DemoPage__li">series</li>
        <li className="DemoPage__li">title</li>
        <li className="DemoPage__li">total</li>
        <li className="DemoPage__li">legendLabels</li>
      </ul>
      <div className="DemoPage__example">
        <DataVisualisation {...this.state} />
      </div>
      <h4 className="DemoPage__h4">React Example</h4>
      <Highlight className='html'>
        { '<DataVisualisation series={ series } seriesValueKey="pages" total={ number } title={ string } legendLabels={ labels } />' }
      </Highlight>
    </div>
    );
  }
});
