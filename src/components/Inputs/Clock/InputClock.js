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

    time.hour = time.hour==undefined? today.getHours(): time.hour;    
    time.minutes = time.minutes==undefined? today.getMinutes(): time.minutes;   
    return(<div className='ClockInput'  onClick={()=>{Dialog.OpenDialogClock(DialogContext,{hour:time.hour,minutes:time.minutes},(data)=>{setTime({hour:data.hour,minutes:data.minutes})} )}}>
        <div>{time.hour}:{time.minutes}</div>
        <div><Icon/></div>
    </div>)
}

export default DateInput;