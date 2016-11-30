import React, { Component } from 'react';
import Layout from './Layout';
import Counter from './Counter';
import Navlabel from './Navlabel';
import Item from "./Item";
import { Router, Route, Redirect, IndexRoute, browserHistory, hashHistory } from 'react-router';
import AjaxRequest from "./AjaxRequest";
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
      user: 0,
      "list": []
    }

    let self = this;
    AjaxRequest.get("sort/0",function(obj){
      self.state["list"] = obj;
      self.setState(self.state);
    });
  }

  componentDidMount() {
    if(typeof this.state !== "undefined"){
        this.state["user"] = this.props.params.id.substr(1);
    }else{
      this.state = {
        user: 0,
        "list": []
      }
    }

    this.setState(this.state);
  }

  render() {
    var link = "";
    if(typeof this.state.list[this.state.user] !== "undefined"){
        link = this.state.list[this.state.user]["link"];
    }

    var height = window.innerHeight - 112;
    return (
      <div className="main-container">
	      <Navlabel date-type="nav">
	        <span className="active">掘金</span>
	        <span>简书</span>
	        <span>开发者头条</span>
	      </Navlabel>
        <div className="content-container">
          <iframe src={link} width="100%" height={height} frameBorder="0" style={{borderWidth:"0px"}}>
          </iframe>
        </div>
      </div>
    );
  }
}
