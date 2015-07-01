"use strict";

var React     = require('react');
var Button    = require('../../../buttons/Button');

module.exports = React.createClass({
  displayName: 'ButtonExample',

  render: function() {
    return (
    <div>
      <h3 className="DemoPage__h3" id="Buttons">Button</h3>

      <h3 className="DemoPage__h3">CTA Button</h3>
      <p className="DemoPage__p">The call to action (CTA) is use for the most important and likely action a user should take. Idealy there would only be one CTA button in view. It does not have an inverse option.</p>

      <div className="DemoPage__group">
        <div className="DemoPage__example--button">
          <Button id="get-started" kind='cta' label='Get Started' icon='chevron-right'/>
        </div>
      </div>
      <div className="DemoPage__group">
        <h4 className="DemoPage__h4">Thin Example</h4>
        <div className="DemoPage__example--button">
          <Button kind='cta' label='Give' thin={ true } href="/give"/>
        </div>
      </div>

      <div className="DemoPage__group">
        <h4 className="DemoPage__h4">Disabled Example</h4>
        <div className="DemoPage__example--button">
          <Button kind='cta' label='Give' thin={ true } disabled={ true }/>
        </div>
      </div>

      <h3 className="DemoPage__h3">Primary Button</h3>
      <p className="DemoPage__p">The Primary button is reserved for important actions that are not CTAs. Idealy there would only be one primary button in view.</p>

      <div className="DemoPage__group">
        <div className="DemoPage__example--button">
          <Button kind='primary' label='Save' icon='chevron-right'/>
        </div>
      </div>

      <div className="DemoPage__group">
        <h4 className="DemoPage__h4">Inverse Example</h4>
        <div className="DemoPage__example--button--inverse">
          <Button kind='primary' inverse={ true } label='Sign Up' icon='chevron-right'/>
        </div>
      </div>

      <h3 className="DemoPage__h3">Secondary Button</h3>
      <p className="DemoPage__p">The Seconday button is reserved for less important actions. Multiply Seconday buttons can be in view.</p>

      <div className="DemoPage__group">
        <div className="DemoPage__example--button">
          <Button kind='secondary' label='Sign In' icon='chevron-right'/>
        </div>
      </div>

      <div className="DemoPage__group">
        <h4 className="DemoPage__h4">Inverse Example</h4>
        <div className="DemoPage__example--button--inverse">
          <Button kind='secondary' inverse={ true } label='Sign In' icon='chevron-right'/>
        </div>
      </div>

      <h3 className="DemoPage__h3">Tertiary Button</h3>
      <p className="DemoPage__p">The Tertiary button is reserved for less important actions. Multiply Tertiary buttons can be in view.</p>

      <div className="DemoPage__group">
        <div className="DemoPage__example--button">
          <Button kind='tertiary' label='Prev' icon='chevron-left' iconLeft={ true }/>
        </div>
      </div>

      <div className="DemoPage__group">
        <h4 className="DemoPage__h4">Inverse Example</h4>
        <div className="DemoPage__example--button--inverse">
          <Button kind='tertiary' inverse={ true } label='Edit' icon='edit'/>
        </div>
      </div>

      <h3 className="DemoPage__h3">Borderless Button</h3>
      <p className="DemoPage__p">The borderless button looks a bit more like a link.</p>

      <div className="DemoPage__group">
        <div className="DemoPage__example--button">
          <Button  borderless={ true } kind='cta' label='Download' icon='download'/>
        </div>
      </div>


      <div className="DemoPage__group">
        <div className="DemoPage__example--button--inverse">
          <Button  borderless={ true } kind='cta' label='Download' icon='download' inverse={ true }/>
        </div>
      </div>

      <div className="DemoPage__group">
        <h4 className="DemoPage__h4">Primary Example</h4>
        <div className="DemoPage__example--button">
          <Button borderless={ true } kind='primary'label='Download' icon='download' />
        </div>
      </div>

      <div className="DemoPage__group">
        <h4 className="DemoPage__h4">Primary Example Inverse</h4>
        <div className="DemoPage__example--button--inverse">
          <Button borderless={ true } kind='primary'label='Download' icon='download' inverse={ true } />
        </div>
      </div>

      <div className="DemoPage__group">
        <h4 className="DemoPage__h4">CTA disabled Example</h4>
        <div className="DemoPage__example--button">
          <Button borderless={ true } kind='cta' disabled={ true } label='Download' icon='download'/>
        </div>
      </div>
    </div>
    );
  }
});
