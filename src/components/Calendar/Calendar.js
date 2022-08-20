import './Calendar.css';
import React from "react";
import libraryTheme from '../../lib/Theme';

function Calendar (props)
{
    const [state,setState] = React.useState({state:'default',year:props.year,month:props.month,day:props.day,hour:props.hour,minutes:props.minutes,yearPage:0,monthPage:0,dayPage:0});
    if(props.onChange != undefined)props.onChange({year:state.year,month:state.month+1,day:state.day});
    const months = ["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec",
    "Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"];

    const dt = new Date();
    if(state.year==undefined) setState({state:state.state,year:dt.getFullYear(),month:state.month,day:state.day,hour:state.hour,minutes:state.minutes,yearPage:state.yearPage,monthPage:state.monthPage,dayPage:state.dayPage});
    if(state.month==undefined) setState({state:state.state,year:state.year,month:dt.getMonth(),day:state.day,hour:state.hour,minutes:state.minutes,yearPage:state.yearPage,monthPage:state.monthPage,dayPage:state.dayPage});
    if(state.day==undefined) setState({state:state.state,year:state.year,month:state.month,day:dt.getDate(),hour:state.hour,minutes:state.minutes,yearPage:state.yearPage,monthPage:state.monthPage,dayPage:state.dayPage});
    const LeftArrow = libraryTheme.GetIcon('AiOutlineArrowLeft');
    const RightArrow = libraryTheme.GetIcon('AiOutlineArrowRight');
    const firstDayOfWeekMonth = new Date(state.year, state.month, 1).getDay()==0?7:new Date(state.year, state.month, 1).getDay();
    
    const numberOfDays = new Date(state.year, state.month+1, 0).getDate();
    switch(state.state)
    {
        case 'default':
            const selectDay = (day) =>{
                setState({state:'default',year:state.year,month:state.month,day:day,hour:state.hour,minutes:state.minutes,yearPage:state.yearPage,monthPage:state.monthPage,dayPage:state.dayPage});
            }
            let days = 1;
            return (
                <div className='input-calendar'>
                    <div className='input-calendar-info'>
                        <div className='input-calendar-year' onClick={()=>{setState({state:'select-year',year:state.year,month:state.month,day:state.day,hour:state.hour,minutes:state.minutes,yearPage:0,monthPage:state.monthPage,dayPage:state.dayPage})}}>{state.year}</div>
                        <div className='input-calendar-month' onClick={()=>{setState({state:'select-month',year:state.year,month:state.month,day:state.day,hour:state.hour,minutes:state.minutes,yearPage:0,monthPage:state.monthPage,dayPage:state.dayPage})}}>{months[state.month]}</div>
                    </div>
                    <div className='input-calendar-sd'>
                        <div className='input-calendar-select-day'>
                        {[...Array(42)].map((x, i) =>{
                            if(i >=firstDayOfWeekMonth-1 && i+1<firstDayOfWeekMonth + numberOfDays) // ((e) => this.handleClick(e, data))
                            {
                                if(i-firstDayOfWeekMonth+2 ==state.day)
                                {
                                    return (<div className='input-calendar-select-day-section-active' onClick={((e)=>{selectDay(i-firstDayOfWeekMonth+2)})} key={i} ><div>{i-firstDayOfWeekMonth+2}</div></div>);
                                }
                                else
                                {
                                    return (<div className='input-calendar-select-day-section' onClick={((e)=>{selectDay(i-firstDayOfWeekMonth+2)})} key={i} ><div>{i-firstDayOfWeekMonth+2}</div></div>);
                                }
                            }
                            else 
                            {
                                return (<div className='input-calendar-select-day-section-disable' key={i} ><div></div></div>) 
                            }
                        })}
                        </div>
                    </div>
                </div>
                )
        break;
        case 'select-year':
            const SelectYear = (year) =>{
                setState({state:'select-month',year:year,month:state.month,day:state.day,hour:state.hour,minutes:state.minutes,yearPage:state.yearPage,monthPage:state.monthPage,dayPage:state.dayPage});
            }
            return (
                <div className='input-calendar-sy'>
                    <div className='input-calendar-select-year'>
                        <div className='input-calendar-buttons' onClick={()=>{if(state.yearPage>-10)setState({state:'select-year',year:state.year,month:state.month,day:state.day,hour:state.hour,minutes:state.minutes,yearPage:state.yearPage-1,monthPage:state.monthPage,dayPage:state.dayPage})}}><LeftArrow/></div>
                        <div></div>
                        <div className='input-calendar-buttons' onClick={()=>{if(state.yearPage<10)setState({state:'select-year',year:state.year,month:state.month,day:state.day,hour:state.hour,minutes:state.minutes,yearPage:state.yearPage+1,monthPage:state.monthPage,dayPage:state.dayPage})}}><RightArrow/></div>
                        {[...Array(9)].map((x, i) =>
                            <div className='input-calendar-select-year-section' key={i} onClick={()=>{SelectYear(parseInt(state.year) +i-4+(state.yearPage*9))}}><div>{parseInt(state.year) +i-4+(state.yearPage*9)}</div></div>
                        )}
                    </div>
                </div>
                )
            break;
        case 'select-month':
            const SelectMonth = (month) =>{
                setState({state:'default',year:state.year,month:month,day:state.day,hour:state.hour,minutes:state.minutes,yearPage:state.yearPage,monthPage:state.monthPage,dayPage:state.dayPage});
            }
            return (
                <div className='input-calendar-sm'>
                    <div className='input-calendar-select-month'>
                    {[...Array(12)].map((x, i) =>
                            <div className='input-calendar-select-month-section' key={i} onClick={()=>{SelectMonth(i)}}><div>{months[i]}</div></div>
                        )}
                    </div>
                </div>
                )
            break;
    }
    
}
export default Calendar;



