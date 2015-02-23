"use strict";

var React     = require('react');
var FileInput = require('../FileInput');

module.exports = React.createClass({
  displayName: 'hui-ImageInput',

  propTypes: {
    id: React.PropTypes.string,
    onChange: React.PropTypes.func,
    errors: React.PropTypes.string,
    value: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      value: {}
    };
  },

  renderImage: function(image) {
    if (image && image.url && image.filename) {
      return (
        <img className="hui-ImageInput__img" src={ image.url } alt={ image.filename } />
      );
    } else {
      return null;
    }
  },

  render: function() {
    var props    = this.props;
    var image    = props.value;
    var onChange = props.onChange;

    return (
      <div className="hui-ImageInput__div">
        { this.renderImage(image) }
        <FileInput
          id={ props.id }
          onChange={ onChange }
          value={ image }
          errors={ props.errors } />
      </div>
    );
  },
});
