"use strict";

var React      = require('react');
var LineGraph  = require('../../../graphs/LineGraph');
var Highlight  = require('react-highlight');

function getSeries(tick) {
  var series = [[], [], []];
  var count = 0;

  while(count < 50) {
    var value = (Math.abs(Math.sin(count + tick) * 5100000));
    var value2 = (Math.abs(Math.cos(count + tick) * 5100000));
    var value3 = (Math.abs(Math.sin(count + 5 + tick) * 3000000));

    series[0].push({
      date: new Date(2014, 1, count + tick, 0, 0, 0, 0).toISOString(),
      funds_raised: value
    });

    series[1].push({
      date: new Date(2014, 1, count + tick, 0, 0, 0, 0).toISOString(),
      funds_raised: value2
    });

    series[2].push({
      date: new Date(2014, 1, count + tick, 0, 0, 0, 0).toISOString(),
      funds_raised: value3
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
      seriesValueKey: 'funds_raised',
      valueConverter: function(number) {
        return number / 100;
      }
    };
  },

  render: function() {
    if (this.state.hide) {
      return false;
    }

    return (
    <div>
      <h3 className="DemoPage__h3">LineGraph</h3>
      <p>The line graph can render a stacked or combination graph as well as option for area fill or line only.</p>
      <h4 className="DemoPage__h4">LineGraph propTypes</h4>
      <ul className="DemoPage__ul">
        <li className="DemoPage__li">
          <span className="DemoPage__bold">series:</span> Array of array of objects containing value and date.
        </li>
        <li className="DemoPage__li">
          <span className="DemoPage__bold">seriesValueKey:</span> Accesor for value on data object.
        </li>
        <li className="DemoPage__li">
          <span className="DemoPage__bold">valueConverter:</span> Convert to the value we want to display.
        </li>
        <li className="DemoPage__li">
          <span className="DemoPage__bold">stacked:</span> Defines a stacked line graph. Defaults to false.
        </li>
        <li className="DemoPage__li">
          <span className="DemoPage__bold">lined:</span> Defines line only graph with no area fill. Defaults to false.
        </li>
        <li className="DemoPage__li">
          <span className="DemoPage__bold">tipLabel:</span> Defines the label of values on tooltip.
        </li>
        <li className="DemoPage__li">
          <span className="DemoPage__bold">gutter:</span> Defines the area around the graph for x and y scales.
          <ul className="DemoPage__ul">
            <li className="DemoPage__li">left</li>
            <li className="DemoPage__li">right</li>
            <li className="DemoPage__li">bottom</li>
            <li className="DemoPage__li">top</li>
          </ul>
        </li>
        <li className="DemoPage__li">
          <span className="DemoPage__bold">totalFormat:</span> Format structure for tooltip totals (Leave blank to use default formating)
        </li>
      </ul>
      <div className="DemoPage__example--graph--lines">
        <LineGraph {...this.state} line={ true } area={ false } tipLabel='Fund raised' />
      </div>
      <div className="DemoPage__example--graph--stacked">
        <LineGraph {...this.state} stacked={ true } tipLabel='Fund raised' />
      </div>

      <h4 className="DemoPage__h4">React Example</h4>
      <Highlight className='html'>
        { '<LineGraph series={ series } seriesValueKey{ seriesValueKey } line={ true } tipLabel={ "Fund raised" } area={ false } />' }
      </Highlight>
    </div>
    );
  }
});
