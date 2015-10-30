'use strict';

var React = require('react');
var cx    = require('classnames');

module.exports = React.createClass({
  displayName: 'Fieldset',

  propTypes: {
    legend: React.PropTypes.string,
    children: React.PropTypes.oneOfType([
      React.PropTypes.node,
      React.PropTypes.arrayOf(React.PropTypes.node)
    ]).isRequired
  },

  getInitialState: function() {
    return {
      focused: false
    };
  },

  onFocus: function() {
    this.setState({ focused: true });
  },

  onBlur: function() {
    this.setState({ focused: false });
  },

  renderLegend: function() {
    var props = this.props;

    if (props.legend) {
      return (
        <legend className="hui-Fieldset__legend">
            { props.legend }
        </legend>
      );
    } else {
      return false;
    }
  },

  render: function() {
    var props = this.props;
    var classes = cx({
      'hui-Fieldset': true,
      'hui-Fieldset--with-legend': props.legend,
      'hui-Fieldset--focused': this.state.focused
    });

    return (
      <fieldset className={ classes } onFocus={ this.onFocus } onBlur={ this.onBlur }>
        { this.renderLegend() }
        { props.children }
      </fieldset>
    );
  }
});
