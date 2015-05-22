"use strict";

var React                = require('react');
var PageForm             = require('../../../layout/PageForm');
var Button               = require('../../../buttons/Button');
var TextInput            = require('../../../forms/TextInput');
var Highlight            = require('react-highlight');
var backgroundImagePath  = ('../images/alt_charity_bg--blur.jpg');
var separatorImagePath   = ('../images/separator_grey.png');

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
      <h3 className="DemoPage__h3">PageForm</h3>
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
          separatorImagePath={ separatorImagePath }
          children={ formInput }/>
      </div>

      <h4 className="DemoPage__h4">React Example</h4>
      <Highlight className='html'>
          { 'var formInput = [<TextInput\n' }
          { 'className="hui-TextInput"\n' }
          { 'id="demo_input_readonly"\n' } 
          { 'value="This is a readonly text input"\n' }
          { 'readOnly={ true } />,\n' }
          { '<Button kind="secondary" label="Sign In" icon="chevron-right"/>];\n' }
          { '<PageForm\n'}
          { 'pageName={ "Example" }\n'}
          { 'backgroundImagePath={ backgroundImagePath }\n' }
          { 'separatorImagePath={ separatorImagePath }\n' }
          { 'children={ formInput }/>\n' }
      </Highlight>
     
      <h4 className="DemoPage__h4">HTML Example</h4>
      <Highlight className='html'>
      { '<div style="background-image:url(../images/alt_charity_bg--blur.jpg);" class="hui-PageForm">\n' }
      { '<h2 class="hui-PageForm__title">Example</h2>\n' }
      { '<span class="IconWrapper hui-PageForm__icon">\n' }
      { '<i class="Icon fa fa-heart-o"></i></span>\n' }
      { '<hr style="background-image:url(images/separator_grey.png);" class="Separator grey">\n' }
      { '<span class="hui-TextInput--readOnly hui-TextInput hui-TextInput">\n' }
      { '<input class="hui-TextInput__input hui-TextInput" id="demo_input_readonly" value="This is a readonly text input" readonly="" placeholder="" type="text" autocomplete="off" maxlength="10000">\n' }
      { '</span>\n' }
      { '<button class="hui-Button--secondary hui-Button--hasIcon hui-Button" tabindex="1" type="button">\n' }
      { '<i class="hui-Icon fa fa-chevron-right"></i>\n' }
      { '</span><span class="hui-Button__label">Sign In</span>\n' }
      { '</button>\n' }
      { '</div>\n' }
      </Highlight>
    </div>
    );
  }
});
