var express = require('express');
var app = express();
var mongo = require('mongodb');
var url = "mongodb://localhost:27017/";
let dataBase="";
app.post('/',function(req,res){
  if(req.body.dataInput.userName!=""){
    try{
      
      mongo.MongoClient.connect(url,{ useUnifiedTopology: true },function (err,connected) {
        if(err) throw err;
        dataBase=connected.db("mydb");
        dataBase.collection("testing").find({userName:req.body.dataInput.userName}).toArray(function (err,data) {
          if(err) throw err;
          console.log(data.length)
            if(data.length>0){
              var myQuery={userName:req.body.dataInput.userName};
              dataBase.collection("testing").deleteOne(myQuery,function(err,obj) {
                if (err)throw(err);
                res.send({code:200,message:"deleted successfully"})
                console.log('deleted sucessfully');
                
              })
            }else{
              res.send({code:200,message:"user dose not exist..!"}) 
            }
            
          }); 
        });
      }catch(e){
        res.send({code:404,message:JSON.stringify(e) }) 
      }
      }else{
        res.send({code:404,message:"Name cannot be empty...!"})
      }
      });
      
      module.exports = app;
