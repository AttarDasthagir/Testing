var express=require('express');
var app=express();
var mongo=require('mongodb');

var url = "mongodb://localhost:27017/";
app.get('/users',function(req,res){

            try{
              mongo.MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, db) {    
                if (err) throw err;
                var dbo = db.db("mydb");
               
                dbo.collection("users").find({}).toArray(function (error, result) {
                  if (error) {
                    res.send({code:400,message:"Something went wrong in mongo..!"});
                  } else { 
                    res.send({code:200,message:"Query Success...!",data:result});
                  }
                  db.close();
                });
              });
            }catch(e){
              res.send({code:400,message:e});
            }
      
           

});

module.exports=app;