import './Loading.css';
import anime from 'animejs';
import { useEffect } from 'react';

function Loading(props)
{
    useEffect(() => {
        anime({
            targets: ".loading",
            opacity: [0,1],
            duration:500,
            delay:250
        });

      },[]);

 return(
     <div className="loading">
         <img/>
         <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
         <br/>
         <div>{props.text}</div>
     </div>
 )
}
export default Loading;