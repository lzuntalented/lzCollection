import $ from "jquery";

var url_prefix = "http://192.168.0.12:9900/";

export default {
  post: function(url,param,callback){
    $.post(url_prefix + url,param,function(obj){
      callback(obj);
    });
  },
  get: function(url,callback){
    $.get(url_prefix + url,function(obj){
      callback(obj);
    });
  }
}
