"use strict";

var React      = require('react');

module.exports = React.createClass({
  displayName: 'FormRow',

  propTypes: {
    htmlFor: React.PropTypes.string,
    children: React.PropTypes.oneOfType([
      React.PropTypes.node,
      React.PropTypes.element,
      React.PropTypes.array,
    ]),
    tip: React.PropTypes.string
  },

  renderHelpText: function() {
    var props = this.props;

    if (props.tip) {
      return (
        <div className="hui-FormRow__tip">
          <label
            className="hui-FormRow__label"
            htmlFor={ props.htmlFor }>
              { props.tip }
          </label>
        </div>
      );
    }

    return false;
  },

  render: function() {
    return (
      <div className="hui-FormRow">
        { this.props.children }
        { this.renderHelpText() }
      </div>
    );
  }
});
