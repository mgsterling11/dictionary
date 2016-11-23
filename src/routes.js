import React from 'react';
import { Router, Route, browserHistory } from 'react-router'
import Home from './Home';

var routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Home}>
      <Route path='/search' component={Home}></Route>
    </Route>
  </Router>
);

export default routes;
