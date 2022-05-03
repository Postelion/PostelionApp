import React,{useRef} from "react"
import "./NavigationBar.css"
import { useNavigate } from "react-router-dom";
import config from "../../config/config";
import anime from 'animejs';

class NavigationBar extends React.Component
{
    

    render(){
        
        return(
            <div id="NavigationBar">
                <Logo value="/"/>
                <div className="options">
                    {
                        config.listMenu.map((data,key) =>(
                            <Option key={key} title={data.name} value={data.value}/>
                        ))
                    }
                </div>
            </div>
        )
    }
}

function Logo(props)
{
    const navigate = useNavigate();
    const onClickHandler = () => navigate(props.value);

    return(
        <div className="logo" onClick={onClickHandler}><img alt="logo" src="/static/logo2.svg"/></div>
    )
}

function Option(props)
{
    const refdiv = useRef(null);
    const refspan = useRef(null);
    const navigate = useNavigate();
    const onClickHandler = () => 
    {
        if(window.location.pathname.split('/')[1]!==props.value)
        {
            navigate(props.value);
            if(window.location.pathname.split('/')[1]===props.value)
            {
                anime({
                    targets: refdiv.current,
                    opacity: ['0','1'],
                    duration: 100,
                    easing:'easeInQuint',
                });
            }
        }
    }
        return(
            <div onClick={onClickHandler} className={ (window.location.pathname.split('/')[1]===props.value?"active":"")}>
                <span ref={refspan}>{props.title}</span>
                <div ref={refdiv}></div>
            </div>
        )  

}


export default NavigationBar;