'use strict';

var React                = require('react');
var LoadingProgress      = require('../../../atoms/LoadingProgress');
var Button               = require('../../../buttons/Button');
var timeout;

module.exports = React.createClass({
  displayName: 'PageFormExample',

  getInitialState: function() {
    return {
      inProgress: false
    };
  },

  triggerLoad: function() {
    var component = this;
    component.setState({ inProgress: true });

    clearTimeout(timeout);

    timeout = setTimeout(function() {
      component.setState({ inProgress: false });
    }, 1000);
  },

  render: function() {
    return (
      <div>
        <h3 className="DemoPage__h3" id="LoadingProgress">LoadingProgress</h3>
        <Button kind="secondary" onClick={ this.triggerLoad }>Trigger Load</Button>
        <div className="DemoPage__example">
          <LoadingProgress inProgress={ this.state.inProgress }/>
        </div>
      </div>
    );
  }
});
