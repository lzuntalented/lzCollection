import React, { Component } from 'react';
import Layout from './Layout';
import Counter from './Counter';
import Navlabel from './Navlabel';
import Item from "./Item";
import { Router, Route, Redirect, IndexRoute, browserHistory, hashHistory } from 'react-router';
import AjaxRequest from "./AjaxRequest";
import {Link} from 'react-router';
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
      "list": [],
      active : 0
    }

    // let self = this;
    // AjaxRequest.get("sort/0",function(obj){
    //   self.state["list"] = obj;
    //   self.setState(self.state);
    // });
    // console.log("constructor");
  }

  componentDidMount() {
    // console.log(this.refs);


    if(typeof this.state !== "undefined"){
        this.state["user"] = this.props.params.id.substr(1);
        this.state["active"] = this.props.params.url.substr(1);

        let self = this;
        AjaxRequest.get("sort/" + this.state.active,function(obj){
          // self.updateIframe();
          self.state["list"] = obj;
          self.setState(self.state);
          self.updateIframe();
        });

    }else{
      this.state = {
        user: 0,
        "list": [],
        active : 0
      }
    }

    this.updateIframe();
    this.setState(this.state);
  }

  updateIframe(){
    //iframe被禁止跨域的处理
    var link = "";
    var iframe = this.refs.iframe;
    if(typeof this.state.list[this.state.user] !== "undefined"){
        link = this.state.list[this.state.user]["link"];
        if(this.state.list[this.state.user]["in_iframe"] == 1){
          iframe.src = link;
        }else{
          iframe.src = "about:black";
          iframe.contentWindow.document.write("");
          iframe.contentWindow.document.write("<a href='"+ link +"' target='_blank' style='text-align:center;width:100%;text-decoration:none;color:blue;'><div>由于原网站限制，点我跳转</div></a>");
        }

    }else{
        iframe.src = "http://www.lzuntalented.cn/loading/";
    }
    this.setState(this.state);
  }

  handleLoad(){
    // this.updateIframe();
  }

  render() {
    var link = "";
    if(typeof this.state.list[this.state.user] !== "undefined"){
        link = this.state.list[this.state.user]["link"];
    }

    var height = window.innerHeight - 112;
    return (
      <div className="main-container">
        <Navlabel>
          <Link to={"/index:0"}>
	        <span className={this.state.active == 0 && "active"} >掘金</span>
          </Link>
          <Link to={"/index:1"}>
	        <span className={this.state.active == 1 && "active"} >简书</span>
          </Link>
          <Link to={"/index:2"}>
	        <span className={this.state.active == 2 && "active"} >开发者头条</span>
          </Link>
	      </Navlabel>
        <div className="content-container">
          <iframe onLoad={this.handleLoad.bind(this)} ref="iframe" src="about:blank" width="100%" height={height} frameBorder="0" style={{borderWidth:"0px"}}>
          </iframe>
        </div>
      </div>
    );
  }
}
