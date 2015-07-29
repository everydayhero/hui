'use strict';

var React   = require('react');
var TagList = require('../../../forms/TagList');

module.exports = React.createClass({
  displayName: 'TagListExample',

  render: function() {
    var items = [
      { id: '1', name: 'American Red Cross' },
      { id: '2', name: 'Save the Animals' },
      { id: '3', name: 'A really long name for a charity' },
      { id: '4', name: 'Australian Red Cross' },
      { id: '5', name: 'Rspca Australia' },
      { id: '6', name: 'Save the children' },
      { id: '7', name: 'World Vision Australia' },
      { id: '8', name: 'Another really long name for a charity' }
    ];

    return (
    <div>
      <h3 className="DemoPage__h3" id="TagList">TagList</h3>
      <p className="DemoPage__p">Basic Tag List.</p>
      <TagList
        className="Your-TagList"
        id="charities"
        items={ items } />
    </div>
    );
  }
});
