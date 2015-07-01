'use strict';

var React      = require('react');
var TopBar     = require('../../../layout/TopBar');
var Masthead   = require('../../../layout/Masthead');
var UserAuth   = require('../../../layout/UserAuth');
var imagePath  = './images/';

module.exports = React.createClass({
  displayName: 'TopBarExample',

  render: function() {
    return (
    <div>
      <h3 className="DemoPage__h3" id="TopBar">TopBar and MastHead</h3>
      <p className="DemoPage__p">The top bar should be consistent across all applications and include a MastHead and UserAuth components. TopBarLinks are optional.</p>
      <div className="DemoPage__example">
        <TopBar>
          <Masthead
            appName={ "Example" }
            href="/"
            imagePath={ imagePath } />
          <UserAuth signUpUrl="#" signInUrl="#"/>
        </TopBar>
      </div>
    </div>
    );
  }
});
