'use strict';

// var app = require('../../application');

module.exports = function(Component, data) {
  var data = data || {};
  var component;
  // var context = app.createContext();
  var location = new TestLocation(['/test']);
  var routes = [
    React.createFactory(Route)({
      name: "test",
      path: '/test',
      handler: Component
    })
  ];

  Router.run(routes, location, function (Handler) {

    // data.context = context.getComponentContext();
    var mainComponent = React.render(React.createFactory(Handler)(data), global.document.body, function() {
      component = findByType(mainComponent, Component);
    });
  });

  return component;
}

