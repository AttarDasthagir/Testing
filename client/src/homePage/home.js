import Axios from 'axios';
var CryptoJS = require("crypto-js");

let operation={
  
    // getData(){
    //     return "user Name:"+operation.userName +"passWord:"+operation.passWord; 
    // },
    createNewUser(params){
        return new Promise(function(resolve,reject) {
            params.pass=CryptoJS.AES.encrypt(params.pass, 'myFirstApp').toString()
            Axios.post('/create/newuser',params).then((result,err)=>{
                if(err) reject(err);
                resolve(result.data);
            })
            
        })
    },
//    apiCallDelete() {
//     if(operation.userName !==""){
//         if(operation.passWord !==""){
//             let dataInput={
//                 userName:operation.userName,
//                 password:operation.passWord
//             };
//             Axios.post('/delete/',{dataInput}).then((result,err)=>{
//                 if(err){
//                     console.log(err);
//                 }
//                  alert(result.data.message);
//             });
//         }
//         else{
//             alert("password is not found");
//             console.log();
//         }
//         }
//         else{
//             alert("username is not found");
           
//         }
//     },

//      apiCallUpdate() {
//     if(operation.userName !==""){
//         if(operation.passWord !==""){
//             let dataInput={
//                 userName:operation.userName,
//                 password:operation.passWord
//             };
//             Axios.post('/update/',{dataInput}).then((result,err)=>{
//                 if(err){
//                     console.log(err);
//                 }
//                  alert(result.data.message);
//             });
//         }
//         else{
//             console.log("password is not found");
//         }
//         }
//         else{
            
//             console.log("username not found");
//         }
//     }
 };
let login={
            email:"",
            passWord:"",
    
apiCallLogin(){
    return new Promise (function (resolve,reject) {
        if(login.email !==""){
            if(login.passWord!==""){
                let dataInput={
                    email:login.email,
                    passWord:CryptoJS.AES.encrypt(login.passWord, 'myFirstApp').toString()
                    
                };
                Axios.post('/login/',
                {dataInput}).then((result,err)=>{
                    if(err) reject(result.data);
                    resolve(result.data) ;
                });
            }
            else
            {
                console.log("Password is not found");
            }
            
        }else
        {
            console.log("User Name is not found");
        }
    })


},
userNameInput(params){
    login.email=params
},

passWordInput(params){
    login.passWord=params
},
}; 

export  {operation,login};
   