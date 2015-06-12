"use strict";

var React                = require('react');
var TopBar               = require('../../../layout/TopBar');
var Masthead             = require('../../../layout/Masthead');
var UserAuth             = require('../../../layout/UserAuth');
var LoadingProgress      = require('../../../helpers/LoadingProgress');
var PageForm             = require('../../../layout/PageForm');
var Button               = require('../../../buttons/Button');
var TextInput            = require('../../../forms/TextInput');
var Highlight            = require('react-highlight');
var backgroundImagePath  = ('../images/alt_charity_bg--blur.jpg');
var separatorImagePath   = ('../images/separator_grey.png');
var imagePath            = './images/';

module.exports = React.createClass({
  displayName: 'PageFormExample',

  render: function() {
    var formInput = [<TextInput
          className="hui-TextInput"
          id="demo_input_readonly"
          value="This is a readonly text input"
          readOnly={ true } />,
          <Button kind="secondary" label="Sign In" icon="chevron-right"/>];

    return (
    <div>
      <h3 className="DemoPage__h3">LoadingProgress</h3>
      <p className="DemoPage__p">The LoadingProgress Bar should be consistent across all pages.</p>
      <h4 className="DemoPage__h4">LoadingProgress propTypes</h4>
      <ul className="DemoPage__ul">
        <li className="DemoPage__li">
          <span className="DemoPage__bold">inProgress:</span> Whether loading is in progress or not.
        </li>
      </ul>
      <div className="DemoPage__example">
        <TopBar>
          <Masthead
            appName={ "Example" }
            href="/"
            imagePath={ imagePath } />
          <UserAuth signUpUrl="#" signInUrl="#"/>
        </TopBar>
        <LoadingProgress inProgress={ false }/>
        <PageForm
          pageName={ "Example" }
          backgroundImagePath={ backgroundImagePath }
          separatorImagePath={ separatorImagePath }
          children={ formInput }/>
      </div>

      <h4 className="DemoPage__h4">React Example</h4>
      <Highlight className='html'>
          { '<LoadingProgress>\n' }
          { 'inProgress={ true }/>\n'}
      </Highlight>
     
      <h4 className="DemoPage__h4">HTML Example</h4>
      <Highlight className='html'>
        { '<div class="hui-LoadingProgress">\n' }
        { '<div class="hui-LoadingProgress__bar"></div></div>\n' }
      </Highlight>
    </div>
    );
  }
});
