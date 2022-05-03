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
      });

 return(
     <div className="loading">
         <img src="/static/logo2.svg"/>
         <div className='loader'></div>
     </div>
 )
}
export default Loading;