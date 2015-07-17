"use strict";

var moment            = require('moment');
var React             = require('react');
var DatePicker        = require('./DatePicker');
var TextInput         = require('../TextInput');
var classNamesArray   = require('../../lib/classNamesArray');

var dateFormats       = {
  uk: ["DD", "YYYY", "DD-MM", "MMM DD", "MMM Do", "DD-MM-YY", "DD-MM-YYYY", "MMM DD YY", "MMM Do YY", "MMM DD YYYY", "MMM Do YYYY", "Do MMM YYYY", "DD MMM YYYY", "YYYY-MM-DD"],
  us: ["MM", "YYYY", "MM-DD", "MMM DD", "MMM Do", "MM-DD-YY", "MM-DD-YYYY", "MMM DD YY", "MMM Do YY", "MMM DD YYYY", "MMM Do YYYY", "Do MMM YYYY", "DD MMM YYYY", "YYYY-MM-DD"],
};

dateFormats.au = dateFormats.uk;
dateFormats.nz = dateFormats.uk;
dateFormats.ie = dateFormats.uk;

module.exports = React.createClass({
  displayName: 'DateInput',

  propTypes: {
    valueFormat: React.PropTypes.string,
    displayFormat: React.PropTypes.string,
    value: React.PropTypes.string,
    onChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    errors: React.PropTypes.array,
    id: React.PropTypes.string,
    countryCode: React.PropTypes.string,
    minimumYear: React.PropTypes.number,
    layout: React.PropTypes.string,
    spacing: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      valueFormat: "YYYY-MM-DD",
      displayFormat: "DD/MM/YYYY",
      value: "",
      countryCode: 'uk',
      minimumYear: 1000,
      layout: 'quarter',
      spacing: 'loose'
    };
  },

  getInitialState: function() {
    return {
      open: false,
      date: moment()
    };
  },

  componentWillMount: function() {
    if (typeof document === 'object') {
      document.addEventListener('click', this._clickBody);
    }
  },

  componentWillUnmount: function() {
    if (typeof document === 'object') {
      document.removeEventListener('click', this._clickBody);
    }
  },

  _clickBody: function(e) {
    if (!this.state.open) {
      return;
    }

    var target = e.target;
    var node = this.getDOMNode();

    while (target) {
      if (target === node) {
        return;
      } else {
        target = target.parentNode;
      }
    }
    this.close();
  },

  onDateChange: function(date) {
    this.setDateValue(date);
    this.close();
  },

  setDateValue: function(date) {
    var props = this.props;
    var value = date && date.format(props.valueFormat);

    this.setState({
      date: date || moment()
    });

    if (props.onChange) {
      props.onChange(value);
    }
  },

  clear: function() {
    this.setDateValue(null);
  },

  toggleOpen: function(force) {
    this.setState({
      open: force !== null ? force : !this.state.open
    });
  },

  close: function() {
    var state = this.state;
    var date = this.state.date;

    if(state.tempValue) {
      this.setDateValue(date);
    }

    this.setState({ open: false, tempValue: null });
  },

  hasValue: function() {
    return !!this.props.value;
  },

  getDisplayValue: function() {
    var props = this.props;
    var state = this.state;

    if (state.open && !!state.tempValue) {
      return state.tempValue;
    }

    if (this.hasValue()) {
      return moment(props.value, props.valueFormat).format(props.displayFormat);
    }

    return '';
  },

  onTab: function() {
    this.close();
  },

  onFocus: function() {
    this.toggleOpen(true);
  },

  onIconClick: function(e) {
    e.preventDefault();

    if (this.hasValue()) {
      this.clear();
      this.close();
    } else {
      var input = this.refs.input.getDOMNode();
      input.getElementsByTagName('input')[0].focus();
    }
  },

  localisedValue: function () {
    var props = this.props;
    var dateFormat = dateFormats[props.countryCode];

    return moment(props.value, dateFormat).format(props.displayFormat)
  },

  onInputEdit: function(inputValue) {
    var props = this.props;
    var dateFormat = dateFormats[props.countryCode];
    var parsedDate = moment(inputValue, dateFormat);
    var currentDate = moment();

    if (parsedDate.isValid()) {
      if (parsedDate.year() < props.minimumYear) {
        parsedDate.year(currentDate.year());
      }
    }

    if (!inputValue) {
      this.clear();
      this.setState({ tempValue: null });
    } else if(inputValue !== this.localisedValue()) {
      this.setState({
        date: parsedDate.isValid() && parsedDate,
        tempValue: inputValue
      });
    }
  },

  onChangeSelection: function(date) {
    this.setDateValue(date);
  },

  renderInput: function() {
    var icon = this.hasValue() ? 'times' : 'calendar';

    return (
      <TextInput
        {...this.props}
        layout="full"
        spacing="compact"
        value={ this.getDisplayValue() }
        onTab={ this.onTab }
        onFocus={ this.onFocus }
        onChange={ this.onInputEdit }
        icon={ icon }
        ref="input"
        onIconClick={ this.onIconClick }/>
    );
  },

  renderDatePicker: function() {
    var state = this.state;

    if (state.open) {
      return <DatePicker onChange={ this.onDateChange } onChangeSelection={ this.onChangeSelection } date={ state.date } className="hui-DateInput__picker" />;
    }
  },

  render: function() {
    var props = this.props;
    var classes = classNamesArray([
      'hui-DateInput--' + props.layout,
      'hui-DateInput--' + props.spacing,
      'hui-DateInput',
    ]);

    return (
      <div className={ classes }>
        { this.renderInput() }
        { this.renderDatePicker() }
      </div>
    );
  },
});
