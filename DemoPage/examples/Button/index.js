"use strict";

var React     = require('react');
var Button    = require('../../../buttons/Button');
var Highlight = require('react-highlight');

module.exports = React.createClass({
  displayName: 'ButtonExample',

  render: function() {
    return (
    <div>
      <h3 className="DemoPage__h3">Button</h3>
      <p></p>
      <h4 className="DemoPage__h4">Checkbox propTypes</h4>
      <ul className="DemoPage__ul">
        <li className="DemoPage__li">
          <span className="DemoPage__bold">id:</span> If you would like to render the button/link with a particular id, this is where you can do that.
        </li>
        <li className="DemoPage__li">
          <span className="DemoPage__bold">kind:</span> Button kind (cta, primary, secondary or tertiary, borderless).
        </li>
        <li className="DemoPage__li">
          <span className="DemoPage__bold">type:</span> Passed to button element (button (default), submit, reset).
        </li>
        <li className="DemoPage__li">
          <span className="DemoPage__bold">label:</span> Text inside button.
        </li>
        <li className="DemoPage__li">
          <span className="DemoPage__bold">href:</span> Optional.
        </li>
        <li className="DemoPage__li">
          <span className="DemoPage__bold">icon:</span> Optional FontAwesome font class to show. If this attribute is applied/removed the change will be animated.
        </li>
        <li className="DemoPage__li">
          <span className="DemoPage__bold">iconSpin:</span> Optional. Whether or not the icon should be spinning.
        </li>
        <li className="DemoPage__li">
          <span className="DemoPage__bold">inverse:</span> Invert button for use on images
        </li>
        <li className="DemoPage__li">
          <span className="DemoPage__bold">thin:</span> Optional thin version of button. Boolean, default false.
        </li>
        <li className="DemoPage__li">
          <span className="DemoPage__bold">iconLeft:</span> Render icon on the left. Icons should apear on the right unless there is a particular use case for the icon appearing on the left. For example a 'previous' button.Boolean, default false.
        </li>
        <li className="DemoPage__li">
          <span className="DemoPage__bold">uppercase:</span> Optional uppercase text (When appropriate).
        </li>
        <li className="DemoPage__li">
          <span className="DemoPage__bold">disabled:</span> Disable button. Boolean, default false.
        </li>
        <li className="DemoPage__li">
          <span className="DemoPage__bold">onClick:</span> On click/touch callback function.
        </li>
      </ul>

      <h3 className="DemoPage__h3">CTA Button</h3>
      <p className="DemoPage__p">The call to action (CTA) is use for the most important and likely action a user should take. Idealy there would only be one CTA button in view. It does not have an inverse option.</p>

      <div className="DemoPage__group">
        <div className="DemoPage__example--button">
          <Button id="get-started" kind='cta' label='Get Started' icon='chevron-right'/>
        </div>

        <h4 className="DemoPage__h4">React Example</h4>
        <Highlight>
          { '<Button kind="cta" label="Get Started" icon="chevron-right"/> '}
        </Highlight>

        <h4 className="DemoPage__h4">HTML Examples</h4>
        <Highlight className='html'>
          { '<button class="hui-Button hui-Button--cta hui-Button--hasIcon">\n'}
          { '  <span class="hui-Button__icon">\n'}
          { '    <i class="hui-Icon fa fa-chevron-right"></i>\n'}
          { '  </span>\n'}
          { '  <span class="hui-Button__label">Get Started</span>\n'}
          { '</button>\n'}
        </Highlight>

        <Highlight className='html'>
          { '<a class="hui-Button hui-Button--cta hui-Button--hasIcon" href="/foo">\n'}
          { '  <span class="hui-Button__icon">\n'}
          { '    <i class="hui-Icon fa fa-chevron-right"></i>\n'}
          { '  </span>\n'}
          { '  <span class="hui-Button__label">Get Started</span>\n'}
          { '</a>\n'}
        </Highlight>
      </div>

      <div className="DemoPage__group">
        <h4 className="DemoPage__h4">Thin Example</h4>
        <div className="DemoPage__example--button">
          <Button kind='cta' label='Give' thin={ true } href="/give"/>
        </div>

        <h4 className="DemoPage__h4">React Example</h4>
        <Highlight>
          { '<Button kind="cta" label="Give" thin={ true } href="/give" /> '}
        </Highlight>

        <h4 className="DemoPage__h4">HTML Example</h4>
        <Highlight className='html'>
          { '<button class="hui-Button hui-Button--cta hui-Button--thin">\n'}
          { '  <span class="hui-Button__label">Give</span>\n'}
          { '</button>\n'}
        </Highlight>
        <Highlight className='html'>
          { '<a href="/foo" class="hui-Button hui-Button--cta hui-Button--thin">\n'}
          { '  <span class="hui-Button__label">Give</span>\n'}
          { '</a>\n'}
        </Highlight>
      </div>

      <div className="DemoPage__group">
        <h4 className="DemoPage__h4">Disabled Example</h4>
        <div className="DemoPage__example--button">
          <Button kind='cta' label='Give' thin={ true } disabled={ true }/>
        </div>

        <h4 className="DemoPage__h4">React Example</h4>
        <Highlight>
          { '<Button kind="cta" label="Give" thin={ true } href="/give" disabled={ true }/> '}
        </Highlight>

        <h4 className="DemoPage__h4">HTML Example</h4>
        <Highlight className='html'>
          { '<button class="hui-Button hui-Button--cta hui-Button--thin hui-Button--disabled">\n'}
          { '  <span class="hui-Button__label">Give</span>\n'}
          { '</button>\n'}
        </Highlight>
        <Highlight className='html'>
          { '<a href="/foo" class="hui-Button hui-Button--cta hui-Button--thin hui-Button--disabled">\n'}
          { '  <span class="hui-Button__label">Give</span>\n'}
          { '</a>\n'}
        </Highlight>
      </div>

      <h3 className="DemoPage__h3">Primary Button</h3>
      <p className="DemoPage__p">The Primary button is reserved for important actions that are not CTAs. Idealy there would only be one primary button in view.</p>

      <div className="DemoPage__group">
        <div className="DemoPage__example--button">
          <Button kind='primary' label='Save' icon='chevron-right'/>
        </div>

        <h4 className="DemoPage__h4">React Example</h4>
        <Highlight>
          { '<Button kind="primary" label="Save" icon="chevron-right"/> '}
        </Highlight>

        <h4 className="DemoPage__h4">HTML Examples</h4>
        <Highlight className='html'>
          { '<button class="hui-Button hui-Button--primary hui-Button--hasIcon">\n'}
          { '  <span class="hui-Button__icon">\n'}
          { '    <i class="hui-Icon fa fa-chevron-right"></i>\n'}
          { '  </span>\n'}
          { '  <span class="hui-Button__label">Save</span>\n'}
          { '</button>\n'}
        </Highlight>

        <Highlight className='html'>
          { '<a href="/foo" class="hui-Button hui-Button--primary hui-Button--hasIcon">\n'}
          { '  <span class="hui-Button__icon">\n'}
          { '    <i class="hui-Icon fa fa-chevron-right"></i>\n'}
          { '  </span>\n'}
          { '  <span class="hui-Button__label">Save</span>\n'}
          { '</a>\n'}
        </Highlight>
      </div>

      <div className="DemoPage__group">
        <h4 className="DemoPage__h4">Inverse Example</h4>
        <div className="DemoPage__example--button--inverse">
          <Button kind='primary' inverse={ true } label='Sign Up' icon='chevron-right'/>
        </div>

        <h4 className="DemoPage__h4">React Example</h4>
        <Highlight>
          { "<Button kind='primary' inverse={ true } label='Sign Up' icon='chevron-right'/> "}
        </Highlight>

        <h4 className="DemoPage__h4">HTML Examples</h4>
        <Highlight className='html'>
          { '<a href="/foo" class="hui-Button hui-Button--primary hui-Button--inverse hui-Button--hasIcon">\n'}
          { '  <span class="hui-Button__icon">\n'}
          { '    <i class="hui-Icon fa fa-chevron-right"></i>\n'}
          { '  </span>\n'}
          { '  <span class="hui-Button__label">Sign Up</span>\n'}
          { '</a>\n'}
        </Highlight>

        <Highlight className='html'>
          { '<button class="hui-Button hui-Button--primary hui-Button--inverse hui-Button--hasIcon">\n'}
          { '  <span class="hui-Button__icon">\n'}
          { '    <i class="hui-Icon fa fa-chevron-right"></i>\n'}
          { '  </span>\n'}
          { '  <span class="hui-Button__label">Sign Up</span>\n'}
          { '</button>\n'}
        </Highlight>
      </div>

      <h3 className="DemoPage__h3">Secondary Button</h3>
      <p className="DemoPage__p">The Seconday button is reserved for less important actions. Multiply Seconday buttons can be in view.</p>

      <div className="DemoPage__group">
        <div className="DemoPage__example--button">
          <Button kind='secondary' label='Sign In' icon='chevron-right'/>
        </div>

        <h4 className="DemoPage__h4">React Example</h4>
        <Highlight>
          { "<Button kind='secondary' label='Sign In' icon='chevron-right'/> "}
        </Highlight>

        <h4 className="DemoPage__h4">HTML Examples</h4>
        <Highlight className='html'>
          { '<a href="/foo" class="hui-Button hui-Button--secondary hui-Button--hasIcon">\n'}
          { '  <span class="hui-Button__icon">\n'}
          { '    <i class="hui-Icon fa fa-chevron-right"></i>\n'}
          { '  </span>\n'}
          { '  <span class="hui-Button__label">Sign In</span>\n'}
          { '</a>\n'}
        </Highlight>

        <Highlight className='html'>
          { '<button class="hui-Button hui-Button--secondary hui-Button--hasIcon">\n'}
          { '  <span class="hui-Button__icon">\n'}
          { '    <i class="hui-Icon fa fa-chevron-right"></i>\n'}
          { '  </span>\n'}
          { '  <span class="hui-Button__label">Sign In</span>\n'}
          { '</button>\n'}
        </Highlight>
      </div>

      <div className="DemoPage__group">
        <h4 className="DemoPage__h4">Inverse Example</h4>
        <div className="DemoPage__example--button--inverse">
          <Button kind='secondary' inverse={ true } label='Sign In' icon='chevron-right'/>
        </div>

        <h4 className="DemoPage__h4">React Example</h4>
        <Highlight>
          { "<Button kind='secondary' inverse={ true } label='Sign In' icon='chevron-right'/> "}
        </Highlight>

        <h4 className="DemoPage__h4">HTML Examples</h4>
        <Highlight className='html'>
          { '<a href="/foo" class="hui-Button hui-Button--secondary ui-Button--inverse hui-Button--hasIcon">\n'}
          { '  <span class="hui-Button__icon">\n'}
          { '    <i class="hui-Icon fa fa-chevron-right"></i>\n'}
          { '  </span>\n'}
          { '  <span class="hui-Button__label">Sign In</span>\n'}
          { '</a>\n'}
        </Highlight>

        <Highlight className='html'>
          { '<button class="hui-Button hui-Button--secondary ui-Button--inverse hui-Button--hasIcon">\n'}
          { '  <span class="hui-Button__icon">\n'}
          { '    <i class="hui-Icon fa fa-chevron-right"></i>\n'}
          { '  </span>\n'}
          { '  <span class="hui-Button__label">Sign In</span>\n'}
          { '</button>\n'}
        </Highlight>
      </div>

      <h3 className="DemoPage__h3">Tertiary Button</h3>
      <p className="DemoPage__p">The Tertiary button is reserved for less important actions. Multiply Tertiary buttons can be in view.</p>

      <div className="DemoPage__group">
        <div className="DemoPage__example--button">
          <Button kind='tertiary' label='Prev' icon='chevron-left' iconLeft={ true }/>
        </div>

        <h4 className="DemoPage__h4">React Example</h4>
        <Highlight>
          { "<Button kind='tertiary' label='Prev' icon='chevron-left' iconLeft={ true }/> "}
        </Highlight>

        <h4 className="DemoPage__h4">HTML Examples</h4>
        <Highlight className='html'>
          { '<a href="/foo" class="hui-Button hui-Button--tertiary hui-Button--hasIcon hui-Button--iconLeft">\n'}
          { '  <span class="hui-Button__icon">\n'}
          { '    <i class="hui-Icon fa fa-chevron-right"></i>\n'}
          { '  </span>\n'}
          { '  <span class="hui-Button__label">Prev</span>\n'}
          { '</a>\n'}
        </Highlight>

        <Highlight className='html'>
          { '<button class="hui-Button hui-Button--tertiary hui-Button--hasIcon hui-Button--iconLeft">\n'}
          { '  <span class="hui-Button__icon">\n'}
          { '    <i class="hui-Icon fa fa-chevron-right"></i>\n'}
          { '  </span>\n'}
          { '  <span class="hui-Button__label">Prev</span>\n'}
          { '</button>\n'}
        </Highlight>
      </div>

      <div className="DemoPage__group">
        <h4 className="DemoPage__h4">Inverse Example</h4>
        <div className="DemoPage__example--button--inverse">
          <Button kind='tertiary' inverse={ true } label='Edit' icon='edit'/>
        </div>

        <h4 className="DemoPage__h4">React Example</h4>
        <Highlight>
          { "<Button kind='tertiary' inverse={ true } label='Edit' icon='edit'/> "}
        </Highlight>

        <h4 className="DemoPage__h4">HTML Examples</h4>
        <Highlight className='html'>
          { '<a href="/foo" class="hui-Button hui-Button--tertiary ui-Button--inverse hui-Button--hasIcon">\n'}
          { '  <span class="hui-Button__icon">\n'}
          { '    <i class="hui-Icon fa fa-chevron-right"></i>\n'}
          { '  </span>\n'}
          { '  <span class="hui-Button__label">Edit</span>\n'}
          { '</a>\n'}
        </Highlight>

        <Highlight className='html'>
          { '<button class="hui-Button hui-Button--tertiary ui-Button--inverse hui-Button--hasIcon">\n'}
          { '  <span class="hui-Button__icon">\n'}
          { '    <i class="hui-Icon fa fa-chevron-right"></i>\n'}
          { '  </span>\n'}
          { '  <span class="hui-Button__label">Edit</span>\n'}
          { '</button>\n'}
        </Highlight>
      </div>

      <h3 className="DemoPage__h3">Borderless Button</h3>
      <p className="DemoPage__p">The borderless button looks a bit more like a link.</p>

      <div className="DemoPage__group">
        <div className="DemoPage__example--button">
          <Button  borderless={ true } kind='cta' label='Download' icon='download'/>
        </div>

        <h4 className="DemoPage__h4">React Example</h4>
        <Highlight>
          { "<Button  borderless={ true } kind='cta' label='Download' icon='download'/>"}
        </Highlight>
      </div>


      <div className="DemoPage__group">
        <div className="DemoPage__example--button--inverse">
          <Button  borderless={ true } kind='cta' label='Download' icon='download' inverse={ true }/>
        </div>

        <h4 className="DemoPage__h4">React Example</h4>
        <Highlight>
          { "<Button  borderless={ true } kind='cta' label='Download' icon='download' inverse={ true }/>"}
        </Highlight>
      </div>

      <div className="DemoPage__group">
        <h4 className="DemoPage__h4">Primary Example</h4>
        <div className="DemoPage__example--button">
          <Button borderless={ true } kind='primary'label='Download' icon='download' />
        </div>

        <h4 className="DemoPage__h4">React Example</h4>
        <Highlight>
          { "<Button borderless={ true } kind='primary'label='Download' icon='download' />"}
        </Highlight>
      </div>

      <div className="DemoPage__group">
        <h4 className="DemoPage__h4">Primary Example Inverse</h4>
        <div className="DemoPage__example--button--inverse">
          <Button borderless={ true } kind='primary'label='Download' icon='download' inverse={ true } />
        </div>

        <h4 className="DemoPage__h4">React Example</h4>
        <Highlight>
          { "<Button borderless={ true } kind='primary'label='Download' icon='download' inverse={ true } />"}
        </Highlight>
      </div>
    </div>
    );
  }
});
