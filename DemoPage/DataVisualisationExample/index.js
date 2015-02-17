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
      value: value
    });

    series[1].push({
      date: new Date(2014, 1, count + tick, 0, 0, 0, 0).toISOString(),
      value: value2
    });

    series[2].push({
      date: new Date(2014, 1, count + tick, 0, 0, 0, 0).toISOString(),
      value: value3
    });

    count++;
  }

  return series;
}


module.exports = React.createClass({
  displayName: 'LineGraphExample',

  getInitialState: function() {
    return {
      series: getSeries(1),
      total: 7000,
      title: 'Example Data'
    };
  },

  componentWillMount: function() {
    var component = this;
    var tick = 1;

    // if(typeof document === 'object') {
    //   setInterval(function() {
    //     tick++;
    //     component.setState({
    //       series: getSeries(tick)
    //     });
    //   }, 100);
    // }
  },

  render: function() {
    if (this.state.hide) {
      return false;
    }

    return (
    <div>
      <h3>LineGraph</h3>
      <h4>LineGraph propTypes</h4>
      <ul>
        <li>series</li>
        <li>stacked</li>
        <li>lined</li>
        <li>gutter
          <ul>
            <li>left</li>
            <li>right</li>
            <li>bottom</li>
            <li>top</li>
          </ul>
        </li>
      </ul>
      <div className="DemoPage__example--graph--lines">
        <DataVisualisation {...this.state} />
      </div>
      <h4>React Example</h4>
      <Highlight className='html'>
        { '<LineGraph series={ series } line={ true } area={ false } />' }
      </Highlight>
    </div>
    );
  }
});
