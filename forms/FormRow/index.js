"use strict";

var React = require('react');
var cx    = require('react/lib/cx');

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
          className="FormRow__label"
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
          className="FormRow__hint"
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
    var classes = cx({
      'FormRow__labels': props.hint|| props.labelTop,
      'FormRow__labels--noHelp': !props.hint && !props.labelTop
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
    var classes = 'FormRow ' + classNameProp;
    var contentClass = cx({
      'FormRow__content': this.hasLabels(),
      'FormRow__content--nolabel': !this.hasLabels()
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
