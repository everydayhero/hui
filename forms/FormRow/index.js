"use strict";

var React      = require('react');
var Classnames = require('classnames');

module.exports = React.createClass({
  displayName: 'FormRow',

  propTypes: {
    label: React.PropTypes.string,
    htmlFor: React.PropTypes.string,
    children: React.PropTypes.oneOfType([
      React.PropTypes.node,
      React.PropTypes.element,
      React.PropTypes.array,
    ]),
    hint: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element,
      React.PropTypes.bool
    ])
  },

  renderLabel: function() {
    var props = this.props;

    if (props.label) {
      return (
        <label
          className="hui-FormRow__label"
          htmlFor={ props.htmlFor }>
            { props.label }
        </label>
      );
    }
  },

  renderHelpText: function() {
    var props = this.props;

    if (props.hint) {
      return (
        <label
          className="hui-FormRow__hint"
          htmlFor={ props.htmlFor }>
            { props.hint }
        </label>
      );
    }
  },

  hasLabels: function() {
    var props = this.props;

    return (props.hint || props.label);
  },

  renderLabels: function() {
    var props = this.props;
    var classNameProp = props.className || '';

    var classes = Classnames({
      'hui-FormRow__labels': props.hint|| props.labelTop,
      'hui-FormRow__labels--noHelp': !props.hint && !props.labelTop
    });

    if (classNameProp) {
      classes += ' ' + classNameProp + 'Labels';
    }

    if (this.hasLabels()) {
      return (
        <div className={ classes }>
          { this.renderLabel() }
          { this.renderHelpText() }
        </div>
      );
    }
  },

  render: function() {
    var props = this.props;
    var classNameProp = props.className || '';
    var classes = 'hui-FormRow ' + classNameProp;

    var contentClass = Classnames({
      'hui-FormRow__content': this.hasLabels(),
      'hui-FormRow__content--nolabel': !this.hasLabels()
    });

    if (classNameProp) {
      contentClass += ' ' + classNameProp + 'Content';
    }

    return (
      <div className={ classes }>
        { this.renderLabels() }
        <div className={ contentClass }>
          { props.children }
        </div>
      </div>
    );
  }
});
