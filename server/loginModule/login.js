var express = require('express');
var app = express();
var CryptoJS = require("crypto-js");

var mongo=require('mongodb');
let dataBase="";
var url = "mongodb://localhost:27017/";
let mongoAction=require("../mongo/mongoActions");
app.post('/', function(req, res) {
 
try{
   var bytes = CryptoJS.AES.decrypt(req.body.dataInput.passWord, 'myFirstApp');
   var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  console.log(decryptedData)
  // req.body.userData.pass=decryptedData;
  mongo.MongoClient.connect(url,{ useUnifiedTopology: true },function (err,db) {
    if(err) throw err;
    dataBase=db.db("mydb");
    // console.log(req.body)
    dataBase.collection("users").find({email:req.body.dataInput.email,pass:decryptedData}).toArray(function (err,data) {
      if(err) throw err;
      if(data.length){
        res.send({code:200,message:"Login Sucessfull..!",data:data}) 
      }else{
        res.send({code:202,message:"User Not Found Please Create New Account...!"}) 
      }
      
    });
  });
}catch(e){
  res.send({code:404,message:JSON.stringify(e) }) 
}
});

app.post('/newuser/',async  function(req,res){
try{
  var bytes = CryptoJS.AES.decrypt(req.body.pass, 'myFirstApp');
  var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  req.body.pass=decryptedData;
 let newUser= await mongoAction.createNewUser(req);
if(newUser.code){
  res.send(newUser)
}
  }catch(e){

      res.send({code:404,message:JSON.stringify(e)})
  }
});

module.exports = app;
