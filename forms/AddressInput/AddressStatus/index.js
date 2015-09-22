'use strict';

var React           = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var Icon            = require('../../helpers/Icon');

module.exports = React.createClass({
  displayName: 'AddressStatus',

  mixins: [PureRenderMixin],

  propTypes: {
    loading: React.PropTypes.bool,
    error: React.PropTypes.bool,
    success: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      loading: false,
      error: false,
      success: false
    };
  },

  getStatus: function() {
    return this.props.error ? 'error'
           : this.props.loading ? 'loading'
           : this.props.success ? 'success'
           : false;
  },

  render: function() {
    var status = this.getStatus();
    var classes = 'AddressStatus AddressStatus--' + status;
    var icons = {
      error: 'times',
      loading: 'refresh',
      success: 'chevron-down'
    };

    return status && <Icon className={ classes } icon={ icons[status] } />;
  }
});
