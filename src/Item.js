import React , {Component} from "react";
import {render} from "react-dom";
import AjaxRequest from "./AjaxRequest";
import Navlabel from "./Navlabel";
import $ from "jquery";
import {Link} from 'react-router';

export default class Item extends Component {
  constructor() {
    super();
    this.state = {
      "list": []
    };

    let self = this;
    AjaxRequest.get("item.json",function(obj){
      self.setState({
        "list": obj
      });
    });

    this.addScroll();
  }

  addScroll(){
    let self = this;
    $(window).scroll(function(){
         let $this =$(this),
          offsetHeight =$(this).height(),//可见高度
          clientHeight =$("body").get(0).scrollHeight,//内容高度
          scrollTop =$(this).scrollTop();//滚动高度
          let offset = clientHeight - offsetHeight;
          console.log(offsetHeight,clientHeight,scrollTop);
         if(scrollTop + offsetHeight >= clientHeight ){ //到达底部100px时,加载新内容
          AjaxRequest.get("item.json",function(obj){
            self.state.list
            for(var i in obj){
              self.state.list.push(obj[i]);
            }
            self.setState({
              "list": self.state.list
            });
          });
        }
     });
  }
  // setList(list)

  addItem(item){
    this.list.push(item);
  }

  render(){
    let list = this.state.list;
    return (
        <ul className="item-container">
            {
              list.map(function(item){
                return (
                  <li key={item.id}>
                    <img src="" />
                    <div className="content">
                      <Link to={"/View:" + item.id}>
                      <div className="title">
                        {item.name}
                      </div>
                      </Link>
                      <Navlabel>
                        {

                          item.lables.map((child) => {
                            return <span className="color-909090">{child}</span>
                          })
                        }
                      </Navlabel>
                    </div>
                  </li>
                );
              })
            }
        </ul>
    )
  }

}
