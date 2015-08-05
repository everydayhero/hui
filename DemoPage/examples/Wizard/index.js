'use strict';

var React            = require('react');
var Router           = require('react-router');
var AppHandler       = require('./AppHandler');
var Route            = Router.Route;
var NotFoundRoute    = Router.NotFoundRoute;
var OnboardingWizard = require('./OnboardingWizard');
var router;

if (typeof document === 'object') {
  var routes = (
    <Route name="root" path="/" handler={ AppHandler }>
      <Route name="wizard" path="wizard/:step" handler={ OnboardingWizard } />
      <NotFoundRoute handler={ AppHandler } />
    </Route>
  );

  var div = document.createElement('div');
  document.body.appendChild(div);

  router = Router.create({
    routes,
    location: Router.HistoryLocation
  });

  router.run(function(Handler) {
    React.render(<Handler/>, div);
  });
}

module.exports = router;
