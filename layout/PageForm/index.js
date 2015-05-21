"use strict";

var React      = require('react');
var Icon       = require('./Icon');
var Separator  = require('./Separator');

module.exports = React.createClass({
  displayName: 'PageForm',

  propTypes: {
    pageName: React.PropTypes.string.isRequired,
    backgroundImagePath: React.PropTypes.string,
    children: React.PropTypes.node
  },

  render: function() {
    var formStyle = 
      { backgroundImage: "url(../images/alt_charity_bg--blur.jpg)" };
    
    if(this.props.backgroundImagePath){
      formStyle=
        { backgroundImage: "url(" + this.props.backgroundImagePath + ")" };}
    
    return (
      <div style={ formStyle } className="hui-PageForm">
        <h2 className="hui-PageForm__title">{ this.props.pageName }</h2>
        <Icon icon="heart-o" className="hui-PageForm__icon"/>
        <Separator color="grey"/>
        { this.props.children }
      </div>
    );
  }
});
