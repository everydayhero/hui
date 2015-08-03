'use strict';

var React    = require('react');
var Progress = require('./Progress');

module.exports = React.createClass({
  displayName: 'Wizard',

  getDefaultProps: function() {
    return {
      steps: []
    };
  },

  render: function() {
    var props = this.props;

    return (
      <div className="hui-Wizard">
        <Progress total={ props.steps.length } active={ props.active } onChange={ props.onChange } />
        { props.steps.length > 0 && props.steps[props.active] }
      </div>
    );
  }
});
