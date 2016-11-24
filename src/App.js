import React, { Component } from 'react';
import Layout from './Layout';
import Counter from './Counter';
import Navlabel from './Navlabel';

// If you use React Router, make this component
// render <Router> with your routes. Currently,
// only synchronous routes are hot reloaded, and
// you will see a warning from <Router> on every reload.
// You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182

export default class App extends Component {
  render() {
    return (
	      <Navlabel>
	        <span>掘金</span>
	        <span>简书</span>
	        <span>开发者头条</span>
	      </Navlabel>
    );
  }
}
