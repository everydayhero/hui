'use strict'

import React from 'react'
import classnames from 'classnames'

export default React.createClass({
  displayName: 'PrimaryNav',

  propTypes: {
    reduce: React.PropTypes.bool
  },

  render() {
    var className = classnames({
      'Navigation--reduce': this.props.reduce
    }, 'Navigation');

    return (
      <div className={ className }>
        <div className="Navigation__wrap">
          { this.props.children }
        </div>
      </div>
    );
  }
});
