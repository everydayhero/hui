'use strict';

var React                = require('react');
var PageForm             = require('../../../layout/PageForm');
var Button               = require('../../../buttons/Button');
var TextInput            = require('../../../forms/TextInput');
var backgroundImagePath  = ('../images/alt_charity_bg--blur.jpg');
var separatorImagePath   = ('../images/separator_grey.png');

module.exports = React.createClass({
  displayName: 'PageFormExample',

  render: function() {
    return (
      <div>
        <h3 className="DemoPage__h3" id="PageForm">PageForm</h3>
        <p className="DemoPage__p">The PageForm should be consistent across all pages.</p>
        <h4 className="DemoPage__h4">PageForm propTypes</h4>
        <ul className="DemoPage__ul">
          <li className="DemoPage__li">
            <span className="DemoPage__bold">pageName:</span> Page name to appear at top of form.
          </li>
          <li className="DemoPage__li">
            <span className="DemoPage__bold">backgroundImagePath:</span> Path to background image.
          </li>
          <li className="DemoPage__li">
            <span className="DemoPage__bold">separatorImagePath:</span> Path to separator image.
          </li>
          <li className="DemoPage__li">
            <span className="DemoPage__bold">children:</span> Any elements to be added to the form.
          </li>
        </ul>
        <div className="DemoPage__example">
          <PageForm
            pageName={ "Example" }
            backgroundImagePath={ backgroundImagePath }
            separatorImagePath={ separatorImagePath } >
            <TextInput
              className="hui-TextInput"
              id="demo_input_readonly"
              value="This is a readonly text input"
              readOnly={ true } />
            <Button kind="secondary" label="Sign In" icon="chevron-right"/>
          </PageForm>
        </div>
      </div>
    );
  }
});
