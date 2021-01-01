var express = require('express');
var app = express();
var CryptoJS = require("crypto-js");
var mongo=require('mongodb');
let dataBase="";
var url = "mongodb://localhost:27017/";
let mailService=require('../mail_service/mail.js')
exports.createNewUser=(req)=>{
    // let a=new Promise((function (resolve,reject) {
    //     console.log("heloooooo")
        
    // }))
    // let b=new Promise((function (resolve,reject) {
    //     console.log("how are u")
        
    // }))
    // Promise.all(a,b).then((data)=>{
    //     let first= data
    //     let second=data
    //     console.log(first,second)
    // })
    return new Promise(function (resolve,reject) {
        mongo.MongoClient.connect(url,{useUnifiedTopology:true},function(err,connected){
            if(err) reject(err) ;
            dataBase=connected.db('mydb');
            dataBase.collection("users").find({email:req.body.email}).toArray(function(error,data){
              if(error) reject( error);
              if(!data.length){
                dataBase.collection("users").insertOne(req.body,function (error,data) {
                  if(error) reject( error);
                  mailService.sendMail(req.body);
                  resolve({code:200,message:"User Created Sucessfully...!"})
                })
              }else{
                resolve({code:202,message:"try with different email USer Already Exist..!"})
                }
              });
            }); 
    })
}

