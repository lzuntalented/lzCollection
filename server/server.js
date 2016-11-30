var path = require("path");
var express = require('express');

var app = express();

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('/sort/:id', function (req, res) {
  res.set
  var id = req.params.id;
  var files = ["juejin","jianshu"];
  // res.header("Content-type",'text/json');
  res.sendFile(path.join(__dirname, files[id] + ".json"));
});


app.listen(9900, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:9900/');
});
