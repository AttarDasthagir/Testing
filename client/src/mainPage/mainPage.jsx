import {React,Component} from 'react';
import { login } from '../homePage/home.js';
import users from './mainPage.js';
import './mainPage.scss';
class MainPage extends Component{

    constructor(props){
        super(props);
        this.state={
            userData:[]
        }
    }

    logout(){
        this.props.logout();
    }
    getData(){
        users.getUsers().then((data)=>{
            console.log(data)
            this.setState({userData:data.data})
        }).catch((e)=>{
            console.log(e)
        })
    }
   
    tableData(dataSet){

      return  dataSet.map((data)=>{
               return ( 
                        <tr>
                            <td>
                                {data.email}
                            </td>
                            <td>
                                {data.firstName}
                            </td>
                            <td>
                                {data.surName}
                            </td>
                        </tr>
                   )
            })
    }

    render(){
        let {userData}=this.state;
        return(
            <div className='mainPage'>
            <h2>Helooo this is main Page</h2>
            <button onClick={(e)=>this.getData()}>get</button>
            <button className='LogOut' onClick={(e)=>this.logout()}>log-out</button>
            {userData.length ?<table>
                <tbody>
                    <th>
                        Email
                    </th>
                    <th>
                        FirstName
                    </th>
                    <th>
                        SurName
                    </th>
                    { this.tableData(userData)}
                </tbody>
            </table>:""}
          
            </div>
            
        )
    }
};

export default MainPage;