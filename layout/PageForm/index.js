'use strict';

var React      = require('react');
var Icon       = require('../../atoms/Icon');
var Separator  = require('../../atoms/Separator');

module.exports = React.createClass({
  displayName: 'PageForm',

  propTypes: {
    pageName: React.PropTypes.string.isRequired,
    backgroundImagePath: React.PropTypes.string,
    separatorImagePath: React.PropTypes.string,
    children: React.PropTypes.node
  },

  getDefaultProps: function() {
    return {
      backgroundImagePath: 'images/alt_charity_bg--blur.jpg',
      separatorImagePath: 'images/separator_grey.png'
    };
  },

  render: function() {
    var props = this.props;
    var formStyle = { backgroundImage: 'url(' + props.backgroundImagePath + ')' };

    return (
      <div style={ formStyle } className="hui-PageForm">
        <h2 className="hui-PageForm__title">{ props.pageName }</h2>
        <Icon icon="heart-o" className="hui-PageForm__icon"/>
        <Separator color="grey"
        separatorImagePath={ props.separatorImagePath }/>
        { props.children }
      </div>
    );
  }
});
