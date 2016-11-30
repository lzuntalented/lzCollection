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
    AjaxRequest.get("sort/0",function(obj){
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

         if(scrollTop + offsetHeight >= clientHeight ){ //到达底部100px时,加载新内容
          AjaxRequest.get("sort/0",function(obj){
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
                let item_key = arguments[1];
                return (
                  <li key={item_key}>
                    <img src={item.url} />
                    <div className="content">
                      <Link to={"/View:" + item_key}>
                      <div className="title">
                        {item.title}
                      </div>
                      </Link>
                      <Navlabel>
                        {

                          item.labels.map((child) => {
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
