import {React,Component} from 'react';
import {operation,login}  from './home.js';
import './home.scss';
import MainPage from '../mainPage/mainPage.jsx'
class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            userData:{},
            createPopup:false,
            loggedInStatus:false
        };
        this.login={};
    };

    componentDidMount(){
    }
    loginUser(){
         login.apiCallLogin().then((data)=>{
             if(data.code===202){
                 alert(data.message);
                 this.setState({createPopup:true})
             }else if(data.code===200){
               this.toggleLoginPage();
                //   alert(data.message);
             }
         });
    }
    // deleteDoc(){
    //     operation.apiCallDelete();
    // }
    // updateDoc(){
    //     operation.apiCallUpdate();
    // }
    firstName(value){
        //to update an object in state variable
        this.setState(previousState=>({userData:{...previousState.userData,firstName:value}}))

    }
   surName(value){
        this.setState(previousState=>({
           userData:{
               ...previousState.userData,
               surName:value
           } 
        }));
    }
    email(value){
        this.setState(previousState=>({
            userData:{
                ...previousState.userData,
                email:value
            }
        }));
    }
    pass(value){
        this.setState(previousState=>({
            userData:{
                ...previousState.userData,
                pass:value
            }
        }));
    }
    sUP(){
        this.setState({signUp:true},function(err,data){
         
            if(!this.error){
                         operation.createNewUser(this.state.userData).then((data)=>{
                            if(data.code===202){
                                alert(data.message);
                            }else if(data.code===200){
                                alert("User Created Sucessfully. Please login...!");
                                this.toggleCreatePopUp();
                            }
                }).catch((e)=>{
                    alert(e);
                })
            }
    })
}


className(className,fieldName){
    if(this.state.signUp){
        fieldName?this.error=false:this.error=true;
       return fieldName?className:className+" error";
    }else{
       return className; 
    }
}

toggleCreatePopUp(){
    this.setState({createPopup:!this.state.createPopup,signUp:false})
}
toggleLoginPage(){
    this.setState({loggedInStatus:!this.state.loggedInStatus})
}
createPopUp=()=>{
    return(
        <div className="create-popup">
           <div className="popup-container" >

            <div className="tags">
                 <span className="cross" onClick={(e)=>{this.toggleCreatePopUp()}}>X</span>
                 <h1>Sign Up</h1>
                 <p className="quick-text">It's quick and easy.</p>
            </div>

            <div className="names">
                 <input  className={this.className("firstname",this.state.userData.firstName)} type="text" placeholder="First name" onChange={(e)=>{this.firstName(e.target.value)}}/>
                 <input  className={this.className("surname",this.state.userData.surName)} type="text" placeholder="Sur name"onChange={(e)=>{this.surName(e.target.value)}}/>
            </div>

            <input className={this.className("email",this.state.userData.email)} type="text" placeholder="Email" onChange={(e)=>{this.email(e.target.value)}}></input>
            <input className={this.className("passWord",this.state.userData.pass)} type="password" placeholder="Password" onChange={(e)=>{this.pass(e.target.value)}}></input>
            <p className="bottom-content">By clicking Sign Up, you agree to our Terms, Data Policy and Cookie Policy. You may receive SMS notifications from us and can opt out at any time.</p>
            <button className="sign-up" onClick={(e)=>{this.sUP()}}>Sign Up</button>
           </div>
           <div className="opacity"></div>
       </div>

    )
}
loginPage=()=>{
    return (<div className="homePage">
    <div className="lhs">
       
    <img src='https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg'></img>
    <h2>Facebook helps you connect and share with the people in your life.</h2>
    </div>
    <div className="rhs">
        <div className="main-container">                       
              <div className="container">
                 <input type="text" placeholder="Email address or phone number" onChange={(e)=>{login.userNameInput(e.target.value)}}></input>
                 <input type="password" placeholder="password" onChange={(e)=>{login.passWordInput(e.target.value)}}></input>
                 <button className='login-button' onClick={(e)=>{this.loginUser()}}>Log In</button>
                 <span className='forgetten'><p>Forgotten password?</p></span>
                 <hr className='line'></hr>
                 <button className='create-button' onClick={(e)=>{this.toggleCreatePopUp()}}>Create New Account</button>
            </div>

            <span className='content'><p><strong>Create a Page</strong> for a celebrity, band or business.</p></span>
            </div>

    </div>
{this.state.createPopup && this.createPopUp()}
</div>)

}
render(){
    return(
        // this.state.loggedInStatus? <MainPage logout={()=>{this.toggleLoginPage()}}/>:this.loginPage()
        <MainPage/>
        )
}
}
export default Home