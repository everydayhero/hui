'use strict';

var React      = require('react');
var Footer     = require('../../../layout/Footer');
var ImagePath  = ('../images/hui_edh_mark@x2.gif');

module.exports = React.createClass({
  displayName: 'FooterExample',

  render: function() {
    return (
    <div>
      <h3 className="DemoPage__h3" id="Footer">Footer</h3>
      <div className="DemoPage__example">
        <Footer
          imagePath={ ImagePath }/>
      </div>
    </div>
    );
  }
});
