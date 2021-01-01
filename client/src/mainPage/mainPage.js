const axios=require('axios');

let users={
    getUsers(data){
        return new Promise(function(resolve,reject){
            axios.get('/users/').then(res=>{
                resolve(res.data);
            }).catch(e=>{
                reject(e);
            })
        })

        
    }
 }
    
export default users;