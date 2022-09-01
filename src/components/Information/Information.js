import './Information.css';
import React, { useEffect } from "react";
import anime from 'animejs';


function Information (props)
{
    const InfoState = React.useContext(InfoContext);
    const [localData,setLocalData] = React.useState('');
    const element = React.useRef();
    useEffect(()=>{
        if(InfoState.info_status!=null && InfoState.info_status.state!=undefined)
        {
            if(InfoState.info_status.state == "error")
            {
                element.current.style.visibility= 'visible';
                setLocalData(InfoState.info_status.text);
                anime({
                    targets: element.current,
                    opacity:1,
                    scale:[0,1],
                    complete: function(anim) {
                        anime({
                            targets: element.current,
                            opacity:0,
                            delay:2000,
                            complete:function ()
                            {
                                element.current.style.visibility ='hidden';
                            }
                        });
                      }
                  });
                  ClearInfo(InfoState);
            }
        }
    },[InfoState])
    return (

    <div ref={element} className='info_view' >{localData}</div>
    )
}
export default Information;

export const InfoContext = React.createContext();

export const SetInfoError = (ic,text) =>{

   ic.setInfo_status({state:'error',text:text});
}

export const ClearInfo = (ic) =>{

    ic.setInfo_status({state:null,text:''});
}