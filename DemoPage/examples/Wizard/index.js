'use strict'

import React            from 'react'
import ReactDOM         from 'react-dom'
import AppHandler       from './AppHandler'
import OnboardingWizard from './OnboardingWizard'
import Router, {
  Route,
  NotFoundRoute,
  hashHistory
} from 'react-router'

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

export default router;
