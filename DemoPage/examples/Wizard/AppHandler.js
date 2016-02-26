'use strict'

import React  from 'react'
import Router from 'react-router'
var RouteHandler = Router.RouteHandler;

export default React.createClass({
  displayName: 'AppHandler',

  mixins: [Router.State],

  render: function() {
    return <RouteHandler/>;
  }
});
