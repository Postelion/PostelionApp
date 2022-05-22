import React, {useState, useRef} from 'react';
import config from "../../config/config";
import library from '../../lib/Api';
import anime from 'animejs';
import md5 from 'md5';
import './Admin.css';


function Admin(props)
{
    
    const [adminData,setAdminData] = useState(null);
    const pass = useRef();
    const passconf=()=>{
        library.GetAdminSecurity(md5(pass.current.value),(data)=>{
            console.log(data);
        })
    }
    if(adminData==null)
    {
        return(
            <div id='Admin'>
                <span style={{color:config.GetTheme().FontColor}}>WPISZ KOD</span>
                <PasswordInput pass={pass}/>
                <AcceptButton confirm={()=>{passconf()}} />
            </div>
        )
    }
}


function PasswordInput(props)
{
    const inputFieldStyle = '.code::-webkit-input-placeholder{color: '+config.GetTheme().NavBarColor+';}';

    return(
        <div>
            <style>{inputFieldStyle}</style>
            <input ref={props.pass} style={{color:config.GetTheme().NavBarColor,backgroundColor:config.GetTheme().FontColor}} className='code' placeholder='KOD' type='password'/>
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
        <button onClick={()=>{props.confirm()}} onMouseEnter={()=>{hover()}} onMouseLeave={()=>{unhover()}} ref={main} className='accept' style={{color:config.GetTheme().FontColor,backgroundColor:config.GetTheme().NavBarColor}}>AKCEPTUJ</button>
    )
}
export default Admin;