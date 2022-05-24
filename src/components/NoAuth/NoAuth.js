import './NoAuth.css';
import anime from 'animejs';
import { useEffect } from 'react';

function NoAuth(props)
{
    useEffect(() => {
        anime({
            targets: ".NoAuth",
            opacity: [0,1],
            duration:500,
            delay:250
        });
      });

 return(
     <div className="NoAuth">
         <img/>
         <div >Nie masz uprawnień do przeglądania tej treści</div>
     </div>
 )
}
export default NoAuth;