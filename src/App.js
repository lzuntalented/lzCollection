import React, { Component } from 'react';
import Layout from './Layout';
import Counter from './Counter';
import Navlabel from './Navlabel';
import Item from "./Item";

// If you use React Router, make this component
// render <Router> with your routes. Currently,
// only synchronous routes are hot reloaded, and
// you will see a warning from <Router> on every reload.
// You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182
// console.log(Item);
// console.log(Item);
// Item.setList([1,2]);
export default class App extends Component {
  constructor(){
    super();
    this.state = {
      active : 0
    }
  }

  handleClick(id){
    this.setState({
      active : id
    });
  }

  componentDidMount() {
    if(typeof this.state !== "undefined" && this.props.params.id !== "undefined"){
        this.state["active"] = this.props.params.id && this.props.params.id.substr(1);
    }else{
      this.state = {
        active : 0
      }
    }

    this.setState(this.state);
  }

  render() {
    return (
      <div className="main-container">
	      <Navlabel>
	        <span className={this.state.active == 0 && "active"} onClick={this.handleClick.bind(this,0)}>掘金</span>
	        <span className={this.state.active == 1 && "active"} onClick={this.handleClick.bind(this,1)}>简书</span>
	        <span className={this.state.active == 2 && "active"} onClick={this.handleClick.bind(this,2)}>开发者头条</span>
	      </Navlabel>
        <div className="content-container">
          <Item dataId={this.state.active}></Item>
        </div>
      </div>
    );
  }
}
