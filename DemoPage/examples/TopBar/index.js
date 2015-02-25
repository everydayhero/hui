/** @jsx React.DOM */
"use strict";

var React      = require('react');
var TopBar     = require('../../../layout/TopBar');
var Masthead   = require('../../../layout/Masthead');
var Highlight  = require('react-highlight');
var pkg        = require('../../../package');
var imagePath  = '/images-' + pkg.version + '/';

module.exports = React.createClass({
  displayName: 'TopBarExample',

  render: function() {
    return (
    <div>
      <h3 className="DemoPage__h3">TopBar and MastHead</h3>
      <p className="DemoPage__p">The top bar should be consitent across all applications and include a MastHead. TopBarLinks are optional.</p>
      <h4 className="DemoPage__h4">MastHead propTypes</h4>
      <ul className="DemoPage__ul">
        <li className="DemoPage__li">
          <span className="DemoPage__bold">appName:</span> Optional application name to appear beside logo
        </li>
        <li className="DemoPage__li">
          <span className="DemoPage__bold">href:</span> Path to navigate user when clicking on logo)
        </li>
        <li className="DemoPage__li">
          <span className="DemoPage__bold">imagePath:</span> Path to logo image assests. 'hui_edh_logo@x2.gif' to optimise logo for screen resolutions.
        </li>
        <li className="DemoPage__li">
          <span className="DemoPage__bold">fixed:</span> Fix the TopBar postion.
        </li>
      </ul>
      <div className="DemoPage__example">
        <TopBar>
          <Masthead
            appName={ "Example" }
            href="/"
            imagePath={ imagePath } />
        </TopBar>
      </div>

      <h4 className="DemoPage__h4">React Example</h4>
      <Highlight className='html'>
        { '<TopBar>\n' }
        { '  <Masthead appName={ "Example" } href="/" imagePath={ imagePath } fixed={ true } />\n' }
        { '    <TopBarLink href="#how-to-use">How to use</TopBarLink>\n' }
        { '    <TopBarLink href="#examples">HUI examples</TopBarLink>\n' }
        { '</TopBar>\n' }
      </Highlight>

      <h4 className="DemoPage__h4">HTML Example</h4>
      <Highlight className='html'>
      { '<div class="hui-TopBar--fixed">\n' }
      { '  <h1 class="hui-Masthead">\n' }
      { '    <a href="/">\n' }
      { '      <img class="hui-Masthead__logo" src="/images-' + pkg.version + '/hui_edh_logo@x2.gif" alt="everydayhero HUI">\n' }
      { '      <span class="hui-Masthead__appName">HUI (◠‿◠)</span>\n' }
      { '    </a>\n' }
      { '  </h1>\n' }
      { '  <a class="hui-TopBarLink" href="#how-to-use">How to use</a>\n' }
      { '  <a class="hui-TopBarLink" href="#examples">HUI examples</a>\n' }
      { '</div>' }
      </Highlight>
    </div>
    );
  }
});
