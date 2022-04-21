import React from "react";
import './FirstScreen.css';
import anime from 'animejs';
import $ from "jquery";

class FirstScreen extends React.Component
{
    static objectFirstScreen;

    constructor(props)
    {
        super(props);
        FirstScreen.objectFirstScreen = this;
    }
    
    showComponent(callback)
    {
        $('.FirstScreen').css('opacity','1');
        $('.FirstScreen').css('visibility','visible');
        anime({
            targets: ".FirstScreen",
            translateX: ['200%','0'],
            scale:['0.8','1'],
            duration: 500,
            easing:'easeOutQuint',
            complete: function() {
                callback?.();
                FirstScreen.objectFirstScreen.HideComponentToLeft();
              }
          });

    }

    HideComponentToLeft()
    {
        anime({
            targets: ".FirstScreen",
            translateX: ['0','-200%'],
            scale:['1','0.8'],
            duration: 250,
            delay:500,
            easing:'easeInQuint',
            complete: function() {
                $('.FirstScreen').css('visibility','hidden');
              }
        })
    }
    HideComponentByOpacity()
    {
        anime({
            targets: ".FirstScreen",
            opacity: ['1','0'],
            duration: 250,
            delay:500,
            easing:'easeInQuint',
            complete: function() {
                $('.FirstScreen').css('visibility','hidden');
              }
        })
    }

    render()
    {
        return(
            <div className="FirstScreen">
                <img src ="/static/logo.svg"/>
            </div>
        );
    }
}


export default FirstScreen;
export function show(callback,isLoading=false){
    FirstScreen.objectFirstScreen.showComponent(callback,isLoading);
};
export function hideToLeft(){
    FirstScreen.objectFirstScreen.HideComponentToLeft();
};
export function hideByOpacity(){
    FirstScreen.objectFirstScreen.HideComponentByOpacity();
};