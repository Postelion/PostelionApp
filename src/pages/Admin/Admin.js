import React, {useState, useRef, useEffect} from 'react';
import LibraryApi from '../../lib/Api';
import anime from 'animejs';
import md5 from 'md5';
import './Admin.css';
import {ApiComponent} from '../../lib/Classes';
import { useNavigate } from "react-router-dom";
import Loading from '../../components/Loading/Loading';
import NoAuth from '../../components/NoAuth/NoAuth';


class Admin extends ApiComponent
{
    

    Constr(props)
    {
        this.pass = React.createRef();
        
    }
    Start()
    {
        this.AddRequest(LibraryApi.ApiRequest.GetSpecificModules,'admin');
        this.AddRequest(LibraryApi.ApiRequest.GetAdminAlreadyLogged);
        this.StartRequest();
    }
    
    Success(data)
    {
        if(data[1].response.result=="Access")
        {
            return(<Navigator/>)
        }
        else
        {
            return(
                <div id='Admin'>
                    <span >WPISZ KOD</span>
                    <PasswordInput pass={this.pass}/>
                    <AcceptButton />
                </div>   
            )
        }
    }

    NoAuth()
    {
        return(
            <div id='Admin'>
                <NoAuth/>
            </div>
        ) 
    }
    Error()
    {
        return(
            <div id='Admin'>
                <span >WPISZ KOD</span>
                <PasswordInput pass={this.pass}/>
                <AcceptButton confirm={()=>{this.confirm()}}/>
            </div>
        ) 
    }
    Loading()
    {
        return(<div id='Admin'><Loading/></div>)
    }
    
}
function Navigator(props)
{
    const navigate = useNavigate();
    useEffect(()=>{
        navigate('/admin/panel');    
    })
    return(<div>

    </div>)
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