let express=require('express');
let app=express();
let mongo=require('mongodb');
let url = "mongodb://localhost:27017/";
var dataBase="";
app.post('/',function(req,res){
if(req.body.dataInput.userName!==""){
    try{
        mongo.MongoClient.connect(url,{useUnifiedTopology:true},function (err,connected) {
            if(err){
                throw(err);
            }
            dataBase=connected.db("mydb");
            let myQuery={userName:req.body.dataInput.userName};
            dataBase.collection("testing").find(myQuery).toArray(function(err,data){
                if(err){
                    throw(err);
                }
                if(data.length>0){
                    let newValues={$set:{userName:req.body.dataInput.userName,passWord:req.body.dataInput.password}};
                    dataBase.collection("testing").updateOne(myQuery,newValues,function(error,result){
                        if(error){
                            throw(error);
                        }
                        res.send({code:200,message:"data updated sucessfully"});
                    })
                }
            })
            

        })
    }catch(e){
        res.send({code:400,message:JSON.Stringfy(e)});
    }
}else{
    alert("userName not found");
}

})

module.exports = app;