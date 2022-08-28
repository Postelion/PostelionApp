import React,{useEffect,useRef, useState} from "react";
import * as Dialog from '../../Dialog/Dialog';
import libraryTheme from '../../../lib/Theme';
import './InputClock.css'

function DateInput(props)
{
    const DialogContext = React.useContext(Dialog.DialogContext);
    const Icon = libraryTheme.GetIcon('AiFillClockCircle');

    const [time, setTime] = useState({hour:props.hour,minutes:props.minutes});
    
    var today = new Date();   

    time.hour = time.hour==undefined? parseInt(today.getHours()): parseInt(time.hour);    
    time.minutes = time.minutes==undefined? parseInt(today.getMinutes()): parseInt(time.minutes); 
    
    const onSuccess = (data)=>
    {
        if(props.onChange!= undefined)
        props.onChange(data);
    } 
    useEffect(()=>{if(props.onChange!= undefined)
        props.onChange({hour:time.hour,minute:time.minutes});},[time]);

    return(<div className='ClockInput'  onClick={()=>{Dialog.OpenDialogClock(DialogContext,{hour:time.hour,minutes:time.minutes},(data)=>{setTime({hour:data.hour,minutes:data.minutes});onSuccess(data)} )}}>
        <div>{time.hour}:{time.minutes}</div>
        <div><Icon/></div>
    </div>)
}

export default DateInput;