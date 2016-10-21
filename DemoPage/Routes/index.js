import React from 'react'
import Home from './Home'
import Wizard from '../examples/Wizard'
import { IndexRoute, Route } from 'react-router'

export default (
  <Route path='/' component={Home}>
    <IndexRoute component={() => (<div />)} />
    <Route path='wizard/:step' component={Wizard} />
    <Route path='*' component={() => (<div />)} />
  </Route>
)
