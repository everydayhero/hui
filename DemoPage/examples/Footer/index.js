"use strict";

var React      = require('react');
var Footer     = require('../../../layout/Footer');
var Highlight  = require('react-highlight');

module.exports = React.createClass({
  displayName: 'TopBarExample',

  render: function() {
    return (
    <div>
      <h3 className="DemoPage__h3">Footer</h3>
      <p className="DemoPage__p">The footer should be consistent across all applications.</p>
      <h4 className="DemoPage__h4">Footer propTypes</h4>
      <ul className="DemoPage__ul">
        <li className="DemoPage__li">
          <span className="DemoPage__bold">beneficiary:</span> The beneficiary information to display in the footer.
        </li>
      </ul>
      <div className="DemoPage__example">
        <Footer/>
      </div>

      <h4 className="DemoPage__h4">React Example</h4>
      <Highlight className='html'>
        { '<Footer/>\n' }
      </Highlight>

      <h4 className="DemoPage__h4">HTML Example</h4>
      <Highlight className='html'>
      { '<div class="hui-Footer">\n' }
      { '</div>' }
      </Highlight>
    </div>
    );
  }
});
