import './NoAuth.css';
import anime from 'animejs';
import { useEffect } from 'react';

function NoAuth(props)
{
    useEffect(() => {
        anime({
            targets: ".loading",
            opacity: [0,1],
            duration:500,
            delay:250
        });
      });

 return(
     <div className="loading">
         <img src="/static/logo2.svg"/>
         <div style={{fontSize:'25px'}}>Nie masz uprawnień do przeglądania tej treści</div>
     </div>
 )
}
export default NoAuth;