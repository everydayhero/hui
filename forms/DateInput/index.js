"use strict";

var moment            = require('moment');
var React             = require('react');
var cx                = require('react/lib/cx');
var DatePicker        = require('./DatePicker');
var InputErrors       = require('../InputErrors');
var Icon              = require('../../Helpers/Icon');

module.exports = React.createClass({
  displayName: 'hui-DateInput',

  propTypes: {
    valueFormat: React.PropTypes.string,
    displayFormat: React.PropTypes.string,
    value: React.PropTypes.string,
    onChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    errors: React.PropTypes.array,
    id: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      valueFormat: "YYYY-MM-DD",
      displayFormat: "DD/MM/YYYY",
      value: ""
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
    var props = this.props;
    var value = date && date.format(props.valueFormat);

    this.setState({
      date: date || moment()
    });

    if (props.onChange) {
      var event = {
        target: {
          value: value
        }
      };
      props.onChange(event);
    }

    this.close();
  },

  clear: function(e) {
    e.preventDefault();
    this.onDateChange(null);
  },

  toggleOpen: function(e) {
    e.preventDefault();
    this.setState({
      open: !this.state.open
    });
  },

  close: function() {
    this.setState({open: false});
  },

  render: function() {
    var props = this.props;

    var classes = {
      "hui-DateInput": true,
      "hui-DateInput--empty": this.hasValue() === false
    };

    if (props.className) {
      classes[props.className] = true
    }

    return (
      <span className={ cx(classes) }>
        { this.renderInput() }
        <InputErrors errors={ props.errors } />
        { this.renderDatePicker() }
      </span>
    );
  },

  renderInput: function() {
    var icon;

    if (this.hasValue()) {
      icon = (
        <a href="#" className="hui-DateInput__icon" onClick={ this.clear }>
          <Icon icon="times"/>
        </a>
      );
    } else {
      icon = (
        <a href="#" className="hui-DateInput__icon" onClick={ this.toggleOpen }>
          <Icon icon="calendar"/>
        </a>
      );
    }

    return (
      <span className="hui-DateInput__input_wrapper">
        { this.renderPlaceholder() }
        <input
          className="hui-DateInput__input"
          onClick={ this.toggleOpen }
          value={ this.getDisplayValue() }
          readOnly={ true }
          id={ this.props.id } />
        { icon }
      </span>
    );
  },

  renderDatePicker: function() {
    var state = this.state;

    if (state.open) {
      return <DatePicker onChange={ this.onDateChange } value={ state.date } className="hui-DateInput__picker" />;
    }
  },

  renderPlaceholder: function() {
    var placeholder = this.props.placeholder;

    if (!this.hasValue() && placeholder) {
      return <label htmlFor={ this.props.id } className="hui-DateInput__placeholder">{ placeholder }</label>;
    }
  },

  hasValue: function() {
    return !!this.props.value;
  },

  getDisplayValue: function() {
    var props = this.props;

    if (this.hasValue()) {
      return moment(props.value, props.valueFormat).format(props.displayFormat);
    } else {
      return '';
    }
  }
});
