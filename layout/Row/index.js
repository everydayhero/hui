'use strict';

var _ = require('lodash');
var React = require('react');
var DOMInfo = require('../../mixins/DOMInfo');

module.exports = React.createClass({
  displayName: 'Row',

  mixins: [DOMInfo],

  propTypes: {
    className: React.PropTypes.string,
    level: React.PropTypes.oneOf(['banner', 'primary', 'secondary'])
  },

  getDefaultProps: function() {
    return {
      className: ''
    };
  },

  render: function() {
    var props = this.props;
    var classes = _.compact(['hui-Row', props.className, props.level, this.state.device]).join(' ');

    return (
      <div className={ classes }>
        { this.props.children }
      </div>
    );
  }
});
