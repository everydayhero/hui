'use strict';

import React from 'react'
import filepicker from '../../lib/filepicker'
import Button from '../../buttons/Button'

module.exports = React.createClass({
  displayName: 'AvatarInput',

  propTypes: {
    errors: React.PropTypes.array,
    id: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    options: React.PropTypes.object,
    services: React.PropTypes.arrayOf(React.PropTypes.string),
    value: React.PropTypes.object,
    pageName: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      options: {
        imageDim: [600, 600],
        cropRatio: 1 / 1,
        mimetype: ['image/*'],
        services: ['CONVERT', 'COMPUTER'],
        debug: global.ENV.TEST_MODE
      },
      buttonLabel: 'Upload Image',
      value: {},
      pageName: ''
    };
  },

  getInitialState: function() {
    return {
      hasError: false,
      focused: false
    };
  },

  browse: function(e) {
    var props = this.props;
    var options = props.options;

    e.preventDefault();
    if (!props.disabled) {
      filepicker.pick(options, this.onChange, this.focus);
    }
  },

  focus: function() {
    this.refs.browse_files.getDOMNode().focus();
  },

  onChange: function(file) {
    var onChange = this.props.onChange;
    if (onChange) {
      onChange(file);
    }
    this.focus();
  },

  renderPageName: function() {
    var pageName = this.props.pageName;
    return pageName && (<p className="hui-AvatarInput__pageName">{ pageName }</p>);
  },

  renderAvatar: function() {
    var file = this.props.value;

    if (file.url) {
      return <img className="hui-AvatarInput__preview" src={ file.url } alt={ file.filename } />;
    } else {
      return <span className="hui-AvatarInput__preview"/>;
    }
  },

  render: function() {
    var props = this.props;

    return (
      <div className="hui-AvatarInput" >
        <div className="hui-AvatarInput__card" onClick={ this.browse }>
          { this.renderAvatar() }
          { this.renderPageName() }
        </div>
        <div className="hui-AvatarInput__buttons">
          <Button kind="cta" href="#" ref="browse_files" onClick={ this.browse } >
            { props.buttonLabel }
          </Button>
        </div>
      </div>
    );
  }
});
