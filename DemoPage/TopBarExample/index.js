/** @jsx React.DOM */
"use strict";

var React      = require('react');
var TopBar     = require('../../layout/TopBar');
var Masthead   = require('../../layout/Masthead');
var Highlight  = require('react-highlight');
var pkg        = require('../../package');
var imagePath  = '/images-' + pkg.version + '/';

module.exports = React.createClass({
  displayName: 'TopBarExample',

  render: function() {
    return (
    <div>
      <h3>TopBar and MastHead</h3>
      <p>The top bar should be consitent across all applications and include a MastHead.</p>
      <h4>MastHead propTypes</h4>
      <ul>
        <li>appName: Optional application name to appear beside logo</li>
        <li>href: Path to navigate user when clicking on logo)</li>
        <li>imagePath: Path to logo image assests. 'hui_edh_logo.gif' & 'hui_edh_logo.svg' to optimise logo for screen resolutions and svg support.</li>
      </ul>
      <div className="DemoPage__example">
        <TopBar>
          <Masthead
            appName={ "Example" }
            href="/"
            imagePath={ imagePath } />
        </TopBar>
      </div>

      <h4>React Example</h4>
      <Highlight className='html'>
        { '<TopBar>\n' }
        { '  <Masthead appName={ "Example" } href="/" imagePath={ imagePath } />\n' }
        { '</TopBar>\n' }
      </Highlight>
    </div>
    );
  }
});
