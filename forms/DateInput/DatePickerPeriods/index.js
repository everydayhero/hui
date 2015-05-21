"use strict";

var React            = require('react');
var DatePickerPeriod = require('../DatePickerPeriod');
var Icon             = require('../../../Helpers/Icon');

module.exports = React.createClass({
  displayName: 'DatePickerPeriods',

  propTypes: {
    onClick: React.PropTypes.func,
    onChange: React.PropTypes.func,
    type: React.PropTypes.string,
    date: React.PropTypes.object.isRequired,
    current: React.PropTypes.number
  },

  navigate: function(i) {
    var type = this.props.type;
    var current = this.props.date[type]() + i;

    if (this.props.onChange) { this.props.onChange(current); }
  },

  onChange: function(current) {
     if (this.props.onChange) { this.props.onChange(current); }
  },

  onForward: function(e) {
    e.preventDefault();
    this.navigate(+1);
  },

  onBack: function(e) {
    e.preventDefault();
    this.navigate(-1);
  },

  getMonth: function(i) {
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[i];
  },

  renderPeriods: function() {
    var periods = [];
    var props = this.props;
    var current = props.date[props.type]() - 1;

    for (var i = 0; i < 3; i++) {
      var next = current + i;
      var label = next;
      if (props.type === 'month') {
        next = (next < 0) ? 11 : next;
        next = (next > 11) ? 0 : next;
        label = this.getMonth(next);
      }

      periods.push(
        <DatePickerPeriod
          key={ i }
          value={ next }
          date={ props.date }
          type={ props.type }
          current={ props.current }
          onSelect={ this.onChange }>
            { label }
        </DatePickerPeriod>
      );
    }
    return periods;
  },

  render: function() {
    return (
      <div className="hui-DatePickerPeriods">
        <a href="#" tabIndex="-1" className="hui-DatePickerPeriods__back" onClick={ this.onBack }><Icon icon="chevron-left"/></a>
          <div className="hui-DatePickerPeriods__periods">
            { this.renderPeriods() }
          </div>
        <a href="#" tabIndex="-1" className="hui-DatePickerPeriods__forward" onClick={ this.onForward }><Icon icon="chevron-right"/></a>
      </div>
    );
  }
});
