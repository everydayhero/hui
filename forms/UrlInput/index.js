"use strict";

var React       = require('react');
var SelectInput = require('../SelectInput');
var Input       = require('../TextInput');
var i18nMixin   = require('../../../mixins/i18n');

module.exports = React.createClass({
  displayName: 'UrlInput',
  mixins: [i18nMixin],

  getInitialState: function() {
    return {
      protocol: '',
      path: ''
    };
  },

  componentWillMount: function() {
    this._updateState(this.props.value);
  },

  _handlePathChange: function(e) {
    var fullPath = this._updateState(e.target.value);
    this.props.onChange(fullPath.path && fullPath.protocol + fullPath.path);
  },

  _handleProtocolChange: function(e) {
    this.setState({ protocol: e.target.value });
    this.props.onChange(this.state.path && e.target.value + this.state.path);
  },

  _updateState: function(path) {
    var pathProtocol = path && path.match(/^https?:\/\//g);
    var newState = {
      protocol: path && this.state.protocol || 'http://',
      path: path && path.toLowerCase()
    };

    if (pathProtocol) {
      newState.protocol = pathProtocol[0];
      newState.path = path.substring(pathProtocol[0].length);
    }
    this.setState(newState);

    return newState;
  },

  render: function() {
    var props = this.props;
    var state = this.state;
    var id    = props.id;

    return (
      <div className="UrlInput">
        <SelectInput
          id={ id + '_protocol' }
          value={ state.protocol }
          className="UrlInput__protocol"
          onChange={ this._handleProtocolChange }
          options={[
            { value: 'http://', label: 'http://' },
            { value: 'https://', label: 'https://' }
          ]} />
        <Input
          id={ id + '_path' }
          placeholder={ props.placeholder }
          value={ state.path }
          onChange={ this._handlePathChange }
          className="UrlInput__path"
          errors={ props.errors } />
      </div>
    );
  }
});
