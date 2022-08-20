import './Clock.css';
import React from "react";
import libraryTheme from '../../lib/Theme';

function Clock (props)
{
   let previousvalueHour= "0";
   let previousvalueMinutes= "0";
   let hour = props.hour;
   let minutes =props.minutes;

   const limiterHour =(e) => {

      if(e.target.value>23) e.target.value=23;
      else if (e.target.value<0) e.target.value=0;

      if(e.target.value.toString()=="")
      {
         e.target.value =previousvalueHour;
      }
      else 
      {
         if(e.target.value.toString().length>2)
         {
            e.target.value =previousvalueHour;
         }
         else {previousvalueHour=e.target.value;}
         previousvalueHour=e.target.value;
      }
      hour = e.target.value;
      props.onChange({hour:hour,minutes:minutes});
   }
   props.onChange({hour:hour,minutes:minutes});
   const limiterMinutes = (e) =>{
      
      if(e.target.value>59) e.target.value=59;
      else if (e.target.value<0) e.target.value=0;


      if(e.target.value.toString()=="")
      {
         e.target.value =previousvalueMinutes;
      }
      else 
      {
         if(e.target.value.toString().length>2)
         {
            e.target.value =previousvalueMinutes;
         }
         else {previousvalueMinutes=e.target.value;}
         previousvalueMinutes=e.target.value;
      }
      minutes = e.target.value;
      props.onChange({hour:hour,minutes:minutes});
   }  
   
   return (
   <div className='ClockView'><span>WYBIERZ GODZINE</span>
      <div className='Clock'>
         <div className='inputValue'>
               <input type="number" defaultValue={props.hour} onChange={(e)=>{limiterHour(e)}}/>
         </div>
         <div className='separator'>:</div>
         <div className='inputValue'>
               <input type="number"  defaultValue={props.minutes} onChange={(e)=>{limiterMinutes(e)}}/>
         </div>
      </div>
   </div>);
    
}
export default Clock;



