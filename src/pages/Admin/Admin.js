import React, {useState, useRef} from 'react';
import LibraryApi from '../../lib/Api';
import anime from 'animejs';
import md5 from 'md5';
import './Admin.css';
import {ApiComponent} from '../../lib/Classes';
import { waitFor } from '@testing-library/react';


class Admin extends ApiComponent
{
    

    Constr(props)
    {
        this.pass = React.createRef();
        
    }
    Start()
    {
        this.WaitForRequest();
    }
    
    confirm()
    {
        this.ResetRequest();
        md5(this.pass.current.value);
        this.AddRequest(LibraryApi.ApiRequest.GetAdminSecurity,md5(this.pass.current.value))
        this.StartRequest();
    }

    Success(data)
    {
        console.log(data);
        return (<div></div>)
    }

    Waiting()
    {
        return(
            <div id='Admin'>
                <span >WPISZ KOD</span>
                <PasswordInput pass={this.pass}/>
                <AcceptButton confirm={()=>{this.confirm()}}/>
            </div>
        )
    }
    
}


function PasswordInput(props)
{

    return(
        <div>
            <input ref={props.pass} className='code' placeholder='KOD' type='password'/>
        </div>
    )
}
function AcceptButton(props)
{
    const main= useRef();
    const hover =()=>{
        anime({
            targets:main.current,
            'scale':1.05
        });
    }
    const unhover =()=>{
        anime({
            targets:main.current,
            'scale':1
        });
    }
    return(
        <button onClick={()=>{props.confirm()}} onMouseEnter={()=>{hover()}} onMouseLeave={()=>{unhover()}} ref={main} className='accept'>AKCEPTUJ</button>
    )
}
export default Admin;