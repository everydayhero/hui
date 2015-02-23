"use strict";

var React             = require('react');
var DatePickerPeriods = require('../DatePickerPeriods');
var Calendar          = require('../Calendar');

module.exports = React.createClass({
  displayName: 'hui-DatePicker',

  propTypes: {
    onChange: React.PropTypes.func,
    className: React.PropTypes.string,
    value: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    var value = this.props.value;

    return {
      year: value.year(),
      month: value.month()
    };
  },

  setYear: function(year) {
    this.setState({
      year: year
    });
  },

  setMonth: function(month) {
    this.setState({
      month: month
    });
  },

  render: function() {
    var props = this.props;
    var value = props.value;
    var classes = 'hui-DatePicker ' + props.className;
    var state = this.state;

    return (
      <div className={ classes }>
        <DatePickerPeriods
          type="year"
          date={ value }
          current={ state.year }
          onClick={ this.setYear } />

        <DatePickerPeriods
          type="month"
          date={ value }
          current={ state.month }
          onClick={ this.setMonth } />

        <Calendar
          date={ value }
          month={ state.month }
          year={ state.year }
          onSelectDate={ this.props.onChange } />
      </div>
    );
  }
});
