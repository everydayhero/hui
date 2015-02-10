/** @jsx React.DOM */
"use strict";

var React      = require('react');
var LineGraph  = require('../../graphs/LineGraph');
var Highlight  = require('react-highlight');

function getSeries(tick) {
  var series = [[], [], []];
  var count = 0;

  while(count < 100) {
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
      series: getSeries(1)
    };
  },

  componentWillMount: function() {
    var component = this;
    var tick = 1;

    // setInterval(function() {
    //   tick++;
    //   component.setState({
    //     series: getSeries(tick)
    //   });
    // }, 100);
  },

  render: function() {
    if (this.state.hide) {
      return false;
    }

    return (
    <div>
      <h3>LineGraph</h3>
      <p>Words</p>
      <h4>LineGraph propTypes</h4>
      <ul>
      </ul>
      <div className="DemoPage__example--graph--lines">
        <LineGraph {...this.state} line={ true } area={ false } />
      </div>
      <div className="DemoPage__example--graph--stacked">
        <LineGraph {...this.state} stacked={ true } />
      </div>

      <h4>React Example</h4>
      <Highlight className='html'>
        { '<TopBar>\n' }
        { '  <Masthead appName={ "Example" } href="/" imagePath={ imagePath } />\n' }
        { '</TopBar>\n' }
      </Highlight>
    </div>
    );
  }
});
