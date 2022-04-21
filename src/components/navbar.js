import './navbar.css'
import React, { useState } from 'react';
import anime from 'animejs';
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import MaterialIcon from 'material-icons-react';
import {show,hideByOpacity} from '../pages/FirstScreen';
import config from '../config/config';

class Navbar extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            ThemeDark: config.defaultDarkMode,
        }
        
    }
    toogleTheme()
    {
        this.setState({ThemeDark: !this.state.ThemeDark});
    }

    componentDidMount(){
        this.GetDefaultTheme();
    }

    GetDefaultTheme()
    {
        if(this.state.ThemeDark)
        {

                document.documentElement.style.setProperty('--primary-color','#242424');
                document.documentElement.style.setProperty('--font-color','#f0f0f0');
                $('.navBar .navBarElement .changeTheme .material-icons').html("light_mode");
        }
        else{

                document.documentElement.style.setProperty('--primary-color','#f0f0f0');
                document.documentElement.style.setProperty('--font-color','#161a1d');
                $('.navBar .navBarElement .changeTheme .material-icons').html("dark_mode");
        }
    }

    ready()
    {
        const route = config.listMenu.findIndex(object => {return object.value === window.location.pathname;})+1;
        $('.navBar > .navBarElement > .options > .option').removeClass("active");
        $('.navBar > .navBarElement > .options > .option:nth-child('+route+')').addClass("active");
        var pos = $('.navBar > .navBarElement > .options > .option:nth-child('+route+')').position();
        var wid = parseFloat($('.navBar > .navBarElement > .options > .option:nth-child('+route+')').css("width"))+50;
        $('.navBar .effect div:nth-child(2)').css('left',100 +pos.left + wid + "px");
        $('.navBar .effect div:nth-child(1)').css('width',100 +pos.left + "px");
        hideByOpacity();
    }

    render()
     
            { return (
                    
                <div className="navBar"onLoad={()=>{this.ready()}}>
                    <div className='effect'>
                        <div></div>
                        <div></div>
                    </div>
                    <div className='navBarElement'>
                        <Logo/>
                        <div className='options'>
                            {
                                config.listMenu.map((option,index)=>{
                                    return( <NavbarOption key={index}  value ={option.value} name={option.name} route={option.route} id={index}/>);
                                })
                            }
                        </div>
                        
                        <ChangeTheme parent={this} themeDark={this.state.ThemeDark} mode="light_mode" />
                    </div>
                </div>
            )
            
    }
}

function NavbarOption(props)
{

    function NewRoute(route)
    {
        $('.navBar > .navBarElement > .options > .option').removeClass("active");
        $('.navBar > .navBarElement > .options > .option:nth-child('+route+')').addClass("active");
        var pos = $('.navBar > .navBarElement > .options > .option:nth-child('+route+')').position();
        var wid = parseFloat($('.navBar > .navBarElement > .options > .option:nth-child('+route+')').css("width"))+50;
        anime({
            targets: ".navBar .effect div:nth-child(2)",
            left: 100 +pos.left + wid + "px",
            duration: 200,
            easing:'easeOutQuint'

          });
          anime({
            targets: ".navBar .effect div:nth-child(1)",
            width: 100 +pos.left + "px",
            duration: 200,
            easing:'easeOutQuint'
          });

        
    }

    const navigate = useNavigate();
    const onClickHandler = () => navigate(props.value);
    return (
                <div className='option' onClick={()=>{onClickHandler();NewRoute(props.id+1)}} >
                                {props.name}
                            </div>

    )
}
function Logo(props)
{
    function NewRoute(route)
    {
        $('.navBar > .navBarElement > .options > .option').removeClass("active");
        $('.navBar > .navBarElement > .options > .option:nth-child('+route+')').addClass("active");
        var pos = $('.navBar > .navBarElement > .options > .option:nth-child('+route+')').position();
        var wid = parseFloat($('.navBar > .navBarElement > .options > .option:nth-child('+route+')').css("width"))+50;
        anime({
            targets: ".navBar .effect div:nth-child(2)",
            left: 100 +pos.left + wid + "px",
            duration: 200,
            easing:'easeOutQuint'

          });
          anime({
            targets: ".navBar .effect div:nth-child(1)",
            width: 100 +pos.left + "px",
            duration: 200,
            easing:'easeOutQuint'
          });

        
    }

    const navigate = useNavigate();
    const onClickHandler = () => navigate("/");
    return (
        <img className='logo' alt ='logo' src='/static/logo.svg'onClick={()=>{onClickHandler();NewRoute(1)}} />
    )
}
function ChangeTheme(props)
{

    const onClickHandler = ()=>{
        props.parent.toogleTheme()
            if(props.themeDark)
            {
                show(function(){
                    var colors = {
                        primaryc: document.documentElement.style.getPropertyValue('--primary-color'),
                        fontc:document.documentElement.style.getPropertyValue('--font-color'),
                      }
                    anime({
                            targets:colors,
                            primaryc: '#242424',
                            fontc: '#f0f0f0',
                            easing: 'linear',
                            duration:150,
                            update: function() {
                                document.documentElement.style.setProperty('--primary-color',colors.primaryc);
                                document.documentElement.style.setProperty('--font-color',colors.fontc);
                              }

                    })
                    $('.navBar .navBarElement .changeTheme .material-icons').html("light_mode");
                });

            }
            else{
                show(function(){
                    var colors = {
                        primaryc: document.documentElement.style.getPropertyValue('--primary-color'),
                        fontc:document.documentElement.style.getPropertyValue('--font-color'),
                      }
                    anime({
                            targets:colors,
                            primaryc: '#f0f0f0',
                            fontc: '#161a1d',
                            easing: 'linear',
                            duration:150,
                            update: function() {
                                document.documentElement.style.setProperty('--primary-color',colors.primaryc);
                                document.documentElement.style.setProperty('--font-color',colors.fontc);
                              }

                    })
                    $('.navBar .navBarElement .changeTheme .material-icons').html("dark_mode");
                });
               
            }
    };
    if(config.allowChangeModeTheme)
    {
        return(
            //light_mode
            <div className='changeTheme' onClick={()=>{onClickHandler()}}>
                <MaterialIcon icon={props.mode} size='35'/>
            </div>

        );
    }
    else{
        return null;
    }
}
export default Navbar;