import React,{useEffect,useRef, useState} from "react";
import * as Dialog from '../../Dialog/Dialog';
import libraryTheme from '../../../lib/Theme';
import './InputDate.css';

function DateInput(props)
{
    const DialogContext = React.useContext(Dialog.DialogContext);
    const Icon = libraryTheme.GetIcon('BsFillCalendarCheckFill');
    const dt = new Date();
    
    let year = props.year == undefined? dt.getFullYear():props.year;
    let month = props.month == undefined? dt.getMonth()+1:props.month;
    let day= props.day == undefined? dt.getDate():props.day;

    
    const [date,setDate]= useState({year:year,month:month,day:day});


    const onSuccess = (data)=>
    {
        setDate({year:data.year,month:data.month,day:data.day});
        if(props.onChange!= undefined)
        props.onChange(data);
    }
    return(<div className='DateInput' onClick={()=>{Dialog.OpenDialogDate(DialogContext,{year:date.year,month:date.month-1,day:date.day},onSuccess)}}>
        <div>{("0"+date.day).slice(-2)}.{("0"+date.month).slice(-2)}.{date.year}</div>
        <div><Icon/></div>
    </div>)
}

export default DateInput;