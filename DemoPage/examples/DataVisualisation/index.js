/** @jsx React.DOM */
"use strict";

var React     = require('react');
var Highlight = require('react-highlight');
var DataVisualisation = require('../../../graphs/DataVisualisation');

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
      yAccessor: function(data) {
        return data.pages;
      },
      legendLabels: ['Campaign 1', 'Campaign 2', 'Campaign 3'],
      delta: -0.12,
      total: 160000000,
      totalConverter: function(total) {
        return total;
      },
      title: 'Example Data',
      tipLabel: 'Pages'
    };
  },

  render: function() {
    if (this.state.hide) {
      return false;
    }

    return (
    <div>
      <h3 className="DemoPage__h3">DataVisualisation</h3>
      <p>The HUI data visualisation is a combination of a number of graph component. These componets can also be used independantly of the data visualisation.</p>
      <h4 className="DemoPage__h4">DataVisualisation propTypes</h4>
      <ul className="DemoPage__ul">
        <li className="DemoPage__li">
          <span className="DemoPage__bold">series:</span> Array of array of objects containing value and date.
        </li>
        <li className="DemoPage__li">
          <span className="DemoPage__bold">yAccessor:</span> Accesor for value on data object.
        </li>
        <li className="DemoPage__li">
          <span className="DemoPage__bold">stacked:</span> Defines a stacked line graph. Defaults to true.
        </li>
        <li className="DemoPage__li">
          <span className="DemoPage__bold">title:</span> Graph Title.
        </li>
        <li className="DemoPage__li">
          <span className="DemoPage__bold">total:</span> Total for defined period.
        </li>
        <li className="DemoPage__li">
          <span className="DemoPage__bold">legendLabels:</span> Array of legend labels with indexes matching series.
        </li>
        <li className="DemoPage__li">
          <span className="DemoPage__bold">tipLabel:</span> Defines the label of values on tooltip.
        </li>
        <li className="DemoPage__li">
          <span className="DemoPage__bold">delta:</span> The percentage difference from a comparative period.
        </li>
      </ul>
      <div className="DemoPage__example--visualisation">
        <DataVisualisation {...this.state} />
      </div>
      <h4 className="DemoPage__h4">React Example</h4>
      <Highlight className='html'>
        { '<DataVisualisation \n' }
        { '  series={ series } \n' }
        { '  yAccessor={ yAccessor } \n' }
        { '  total={ number } \n' }
        { '  title={ string } \n' }
        { '  legendLabels={ labels } \n' }
        { '  delta={ delta }/>' }
      </Highlight>

      <h4 className="DemoPage__h4">Example Series structure</h4>
      <Highlight>
        { '[\n' }
        { '  [\n' }
        { '     { date: "2014-01-31T14:00:00.000Z", \n' }
        { '       value: 20  \n' }
        { '     }, ...\n' }
        { '  ], ...\n' }
        { ']' }
      </Highlight>
    </div>
    );
  }
});
