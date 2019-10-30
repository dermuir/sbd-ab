var express = require("express");
var path = require("path");
var bodyParser = require('body-parser'); 

var app = express();
var port = process.env.port || 3000;
var srcpath  =path.join(__dirname,'/public') ;
app.use(express.static('public'));
app.use(bodyParser.json({limit:'5mb'}));  
app.use(bodyParser.urlencoded({extended:true, limit:'5mb'}));

//Controller api
var productController = require('./Controller/ProductController')();
app.use("/api/products", productController);

//Login Controller api
var loginController = require('./Controller/LoginController')
app.use("/api/login", loginController);

// call by default index.html page
app.get("*",function(req,res){ 
    res.sendFile(srcpath +'/index.html');
})

//server stat on given port
app.listen(port,function(){ 
    console.log("server start on port"+ port);
})