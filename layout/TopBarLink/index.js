'use strict'

import React from 'react'

export default React.createClass({
  displayName: 'TopBarLink',

  render: function() {
    return (
      <a className="hui-TopBarLink"  {...this.props} >
        { this.props.children }
      </a>);
  }
});
