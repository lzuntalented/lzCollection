import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import App from './App';
import View from './View';
const RouteConfig = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="index" component={App}></Route>
        </Route>
        <Route path="/view:id" component={View}></Route>
    </Router>
);

export default RouteConfig;
