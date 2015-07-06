'use strict';

var React      = require('react');
var DateSelect = require('../');

module.exports = React.createClass({
  displayName: 'DateSelectWrapper',

  propTypes: {
    autoComplete: React.PropTypes.bool,
    storeLocally: React.PropTypes.bool,
    autoFocus: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    onFocus: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    includeBlank: React.PropTypes.bool,
    onTab: React.PropTypes.func,
    required: React.PropTypes.bool,
    spacing: React.PropTypes.string,
    layout: React.PropTypes.string,
    value: React.PropTypes.string,
    errors: React.PropTypes.array,
    errorMessage: React.PropTypes.string,
    months: React.PropTypes.array,
    monthLabel: React.PropTypes.string,
    yearLabel: React.PropTypes.string,
    dateLabel: React.PropTypes.string,
    promptValue: React.PropTypes.string,
    name: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      yearLabel: 'Year',
      monthLabel: 'Month',
      dateLabel: 'Date',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      layout: 'full',
      spacing: 'loose',
      format: 'YYYY-MM-DD',
      value: '',
      includeBlank: true,
      promptValue: '1980-01-01',
      errors: [],
      autoComplete: true,
      disabled: false,
      readOnly: false
    };
  },

  getInitialState: function() {
    return {
      value: null
    };
  },

  componentWillMount: function() {
    this.setState({ value: this.props.value });
  },

  onChange: function(value) {
    this.setState({ value });
  },

  render: function() {
    var state = this.state;
    var props = this.props;

    return (
      <div>
        <input type="hidden" value={ state.value } name={ props.name } />
        <DateSelect {...props} value={ state.value } onChange={ this.onChange } />
      </div>
    );
  }
});
