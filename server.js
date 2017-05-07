/**
 * Created by PC on 2017/2/18.
 */
var express = require("express");
var app = express();
app.listen(8080);
app.use('/',express.static(__dirname));
console.log(__dirname)
app.get("/",function(req,res){
    console.log(req.headers['user-agent']);
   var userAgent = req.headers['user-agent'];
        res.sendfile(__dirname+'/dist/index.html');

})