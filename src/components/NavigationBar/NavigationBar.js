import React,{useEffect, useRef,useState} from "react"
import { useNavigate } from "react-router-dom";
import config from "../../config/config";
import libraryApi from '../../lib/Api';
import anime from 'animejs';
import './NavigationBar.css';
import * as Iconsai  from "react-icons/ai";
import * as Iconsbs  from "react-icons/bs";

function NavigationBar (){     

    const [modules,setModules] =useState(null);
    
        useEffect(()=>{
            
                libraryApi.ApiRequest.GetModules((data)=>{
                    setModules(data);
                });
               
        },[]);

    const navigate = useNavigate();
        return(
            modules?(modules.status=200?(
                <div id="Navigation_bar" style={{backgroundColor:config.GetTheme().NavBarColor}}>
                    <div>
                        <Logo value="/"/>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',gap:'25px'}}>
                    {
                       modules.data.map((data,index)=><Option key={index} index={index} icon={data.icon}/>)
                    }
                    </div>
                    <div>
                        <ThemeSwitch/>
                    </div>
                </div>)
            :(<div></div>)):(<div></div>))
    
}

function Logo(props)
{
    const navigate = useNavigate();
    const onClickHandler = () => navigate(props.value);
    const style= {width:'50px',marginTop:'25px'}
    return(
        <div style={style} onClick={onClickHandler}><img alt="logo" src="/static/logo.svg"/></div>
    )
}

function Option(props)
{
    const navigate = useNavigate();
    const main =useRef();
    let Icons = (Iconsai[props.icon]);
    if(Icons==null) Icons = (Iconsbs[props.icon])
    useEffect(()=>{
        anime({
            targets: main.current,
            'opacity':[0,1],
            'scale':[0,1],
            delay:150*(props.index+1)
    
        });
    });
    const hover = ()=>{
        anime({
            targets: main.current,
            'box-shadow': '0px 0px 15px rgba(0, 0, 0, 0.2)',
            'scale':'1.05'

        });
    }
    const unhover = ()=>{
        anime({
            targets: main.current,
            'box-shadow': '0px 0px 0px rgba(0, 0, 0, 0)',
            'scale':'1'

        });
    }
    if(Icons!=null)
    {
        
            return(
                    <div ref={main} className="option" onMouseEnter={()=>{hover()}} onMouseLeave={()=>{unhover()}} >
                        <Icons color={props.active==true?config.GetTheme().NavBarColorIconActive:config.GetTheme().NavBarColorIconDisable}/>
                    </div>
            )  
    }

}

function ThemeSwitch(props)
{
    const ToogleTheme= ()=>{
        config.ToogleTheme();
    }
    if(config.GetThemeName()=='light'){
        return(<div onClick={()=>{ToogleTheme()}} style={{backgroundColor:config.GetTheme().NavBarSecondColor}} className="Theme_switch">
            <Iconsbs.BsSunFill size={25} color={config.GetTheme().NavBarColorIconActive} />
            <Iconsbs.BsFillMoonFill size={25} color={config.GetTheme().NavBarColorIconDisable}/>
        </div>)
    }
    else {
        return(<div onClick={()=>{ToogleTheme()}} style={{backgroundColor:config.GetTheme().NavBarSecondColor}} className="Theme_switch">
            <Iconsbs.BsSunFill size={25} color={config.GetTheme().NavBarColorIconDisable} />
            <Iconsbs.BsFillMoonFill size={25} color={config.GetTheme().NavBarColorIconActive}/>
        </div>)
    }
}


export default NavigationBar;