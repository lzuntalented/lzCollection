import React, { Component } from 'react';
import Layout from './Layout';
import Counter from './Counter';
import Navlabel from './Navlabel';
import Item from "./Item";
import { Router, Route, Redirect, IndexRoute, browserHistory, hashHistory } from 'react-router';
// If you use React Router, make this component
// render <Router> with your routes. Currently,
// only synchronous routes are hot reloaded, and
// you will see a warning from <Router> on every reload.
// You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182
// console.log(Item);
// console.log(Item);
// Item.setList([1,2]);
export default class View extends Component {
  constructor(){
    super();
    this.state = {
      user: 0
    }
  }
  componentDidMount() {
    this.setState({
      // route components are rendered with useful information, like URL params
      user: this.props.params.id
    })
  }

  render() {
    return (
      <div className="main-container">
	      <Navlabel date-type="nav">
	        <span className="active">掘金</span>
	        <span>简书</span>
	        <span>开发者头条</span>
	      </Navlabel>
        <div className="content-container">
          我是姿势图{this.state.user}
        </div>
      </div>
    );
  }
}
