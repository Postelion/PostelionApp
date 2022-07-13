import {useEffect, useRef, useState} from "react"
import { useNavigate } from "react-router-dom";
import libraryApi from '../../lib/Api';
import anime from 'animejs';
import './NavigationBar.css';
import {ApiComponent} from '../../lib/Classes';
import libraryTheme from '../../lib/Theme';

class NavigationBar extends ApiComponent{     

    Start()
    {
        this.AddRequest(libraryApi.ApiRequest.GetModules);
        this.StartRequest();
    }

    Loading()
    {
        return(
            <div id="Navigation_bar">
                <div>
                    <Logo/>
                </div>
                <div></div>
                <ThemeSwitch/>
            </div> 
        )
    }
    Success(data)
    {
        console.log(data);
        return(
            
            <div id="Navigation_bar">
                <div>
                    <Logo/>
                </div>
                <div className="options">
                    {
                        data[0].response.map((element,key)=>
                            <Option key={key} index={key} icon={element.icon} value={element.value} title={element.name}/>
                        )
                    }
                </div>
                <ThemeSwitch/>
            </div> 
        )
    }
    Error()
    {
        return(
            <div id="Navigation_bar">
                <div>
                    <Logo/>
                </div>
                <div></div>
                <ThemeSwitch/>
            </div> 
        )
    }
    NoAuth()
    {
        return(
            <div id="Navigation_bar">
                <div>
                    <Logo/>
                </div>
                <div></div>
                <ThemeSwitch/>
            </div> 
        )
    }
}

function Logo(props)
{
    const navigate = useNavigate();
    const onClickHandler = () => navigate('/');
    return(
        <div className="logo" onClick={onClickHandler}><img alt="logo"/></div>
    )
}

function Option(props)
{
    const active= window.location.pathname===props.value;
    const navigate = useNavigate();
    const main =useRef();

    const Icon = libraryTheme.GetIcon(props.icon);
    useEffect(()=>{
        anime({
            targets: main.current,
            'opacity':[0,1],
            'scale':[0,1],
            delay:150*(props.index+1)
    
        });
    });
    const click = ()=>{
        navigate(props.value);
    }
    const hover = ()=>{
        anime({
            targets: main.current,
            'box-shadow': '0px 0px 15px rgba(0, 0, 0, 0.2)',
            'scale':'1.05',
            'background-color':'red'

        });
    }
    const unhover = ()=>{
        anime({
            targets: main.current,
            'box-shadow': '0px 0px 0px rgba(0, 0, 0, 0)',
            'scale':'1'

        });
    }
    if(Icon!=null)
    {
            return(
                    <div title={props.title} ref={main} onClick={()=>{click();}} className={active?'optionactive':'option'} onMouseEnter={()=>{hover()}} onMouseLeave={()=>{unhover()}} >
                        <Icon/>
                    </div>
            )  
    }

}

function ThemeSwitch(props)
{
    const [theme,setTheme] = useState(libraryTheme.GetTheme(true));
    const ToogleTheme= ()=>{
        libraryTheme.ChangeTheme();
        setTheme(libraryTheme.GetTheme(true));
    }
    useEffect(()=>{
        if(libraryTheme.GetTheme(true)==='light')
        {
            anime(
                {
                    targets: '#Navigation_bar .theme_switch_switcher > div',
                    'margin-top':'8px',
                    easing: 'easeOutExpo',
                    duration:500
                }
            )
        }
        else 
        {
            anime(
                {
                    targets: '#Navigation_bar .theme_switch_switcher > div',
                    'margin-top':'62px',
                    easing: 'easeOutExpo',
                    duration:500
                }
            )
        }
    })
    const Light = libraryTheme.GetIcon('BsSunFill');
    const Dark = libraryTheme.GetIcon('BsFillMoonFill');

    return(
        <div onClick={()=>{ToogleTheme()}} >
            {
                    theme==='light'?
                    <div className="Theme_switch">
                        <Light size={24} color="var(--FontColor)"/>
                        <Dark size={24} color="var(--NavBarColor)"/>
                    </div>:
                    <div className="Theme_switch">
                        <Light size={24} color="var(--NavBarColor)"/>
                        <Dark size={24} color="var(--FontColor)"/>
                    </div>

            }
            <div className="theme_switch_switcher">
                <div></div>
            </div>
        </div>
    )

    
}


export default NavigationBar;