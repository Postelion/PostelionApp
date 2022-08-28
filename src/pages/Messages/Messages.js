import React,{useEffect,useRef, useState}from 'react'; //React
import './Messages.css'; //CSS
import libraryApi from '../../lib/Api';
import Loading from '../../components/Loading/Loading';
import {ApiComponent} from '../../lib/Classes';
import libraryTheme from '../../lib/Theme';
import { format } from "date-fns";
import DateInput from '../../components/Inputs/Date/InputDate';
import ClockInput from '../../components/Inputs/Clock/InputClock';
import Text from '../../components/Inputs/Text/Text';
import Button from '../../components/Inputs/Button/Button';
import * as Information from '../../components/Information/Information';

class Project extends ApiComponent
{

    Start()
    {
        this.AddRequest(libraryApi.ApiRequest.getMessages);
        this.StartRequest();
    }

    Success(data)
    {
        
        return(
                    <AllMessages data={data[0].response}/>
        )
    }
    Loading()
    {
        return (
            <div id="Messages">
                <Loading/>
            </div>
        )
    }

    
}

function AllMessages(props)
{
    const inputText = React.createRef();

    const Icon = libraryTheme.GetIcon('MdSend');
    const allMesagesDiv = useRef();
    const [allMessages, setAllMessages] = React.useState(props.data)
    const scrollToBottom = () => {
        allMesagesDiv.current.scrollIntoView({  block: 'end' })
    }
    const sendMessage = () =>
    {
        if(inputText.current.value.trim().length >0)
        {
            libraryApi.ApiRequest.setSendMessages((data)=>{
                if(data.status == 200)
                {
                    libraryApi.ApiRequest.getMessages((data)=>{
                         setAllMessages(data.data);
                    })
                }
            },inputText.current.value);
            
        }
        inputText.current.value = '';
    }
    useEffect(()=>{
        scrollToBottom();
    });

    return (
        <div id="Messages">
            <div className='optionsMessage'>
                <div className="values">
                    <div ref={allMesagesDiv}>
                            {
                                allMessages.map((data,key) =>
                                    {
                                        if(data.meet_info ==undefined)
                                            return ( <Message date={data.date} value={data.value} sender={data.sender} receiver={data.received} key={key}/>);
                                        else 
                                            return ( <MessageMeet meet_info_remarks={data.meet_info.remarks} meet_info_street={data.meet_info.street} meet_info_city={data.meet_info.city} meet_info_date={data.meet_info.date} date={data.date} value={data.value} sender={data.sender} receiver={data.received} key={key}/>);
                                    }
                                )
                            } 
                    </div>
                </div>
                <Options set_all_messages = {setAllMessages}/>
            </div>
            <div className="inputValue">
                <div>
                    <textarea ref={inputText} placeholder='Napisz Wiadomość' />
                    <div className='send' onClick={()=>{sendMessage(this)}}>
                        <Icon size='30px' color='var(--FontColor)'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Options(props)
{
    const [option,setOption] = useState(0)
        return (
        <div className='options'>
            <Option text='Umów spotkanie' icon='BsFileTextFill'/>
            <FormMeet set_all_messages = {props.set_all_messages}/>
        </div>
)
}

function Message(props)
{
    let style1 ={};
    let style2 ={};
    const date = Date.parse(props.date);
    var dateString = format(date, "dd.MM.yyyy HH:mm");
    if(props.receiver)
    {
        style1 = {alignSelf:'flex-start',borderRadius:'10px 10px 10px 0px'};
        style2 = {textAlign:'left'};
    }
    else 
    {
        style1 = {alignSelf:'flex-end',borderRadius:'10px 10px 0px 10px'};
        style2 = {textAlign:'right'}; 
    }
    return(<div className='messageView' style={style1}>
        <span className='date' style={style2}>{dateString}</span>
        <span className='valueText' style={style2}>{props.value}</span>
        <span className='author' style={style2}>{props.sender}</span>
    </div>)
}

function MessageMeet(props)
{
    let style1 ={};
    let style2 ={};
    const date = Date.parse(props.meet_info_date);
    var dateString = format(date, "dd.MM.yyyy HH:mm");
    if(props.receiver)
    {
        style1 = {alignSelf:'flex-start',borderRadius:'10px 10px 10px 0px'};
        style2 = {textAlign:'left'};
    }
    else 
    {
        style1 = {alignSelf:'flex-end',borderRadius:'10px 10px 0px 10px'};
        style2 = {textAlign:'right'}; 
    }
    return(<div className='messageView' style={style1}>
            <span className='date' style={style2}>{dateString}</span>
            <div className='meetView'>
                <span className='meet_header' style={style2}>Zaplanowano Spotkanie</span>
                <div style={{height:'10px'}}/>
                <span  style={style2}>Dnia: {dateString}</span>
                <div style={{height:'10px'}}/>
                <span  style={style2}>Adres: {props.meet_info_city},<br/> {props.meet_info_street}</span>
                <div style={{height:'10px'}}/>
                <span  style={style2}>Uwagi: {props.meet_info_remarks}</span>
            </div>
            <span className='author' style={style2}>{props.sender}</span>
    </div>)
}

function Option(props)
{
    return (
    <div className='optionView'>
       
        <div className='text'>{props.text}</div>
    </div>)
}

function FormMeet(props)
{
    const [dataMeet,setDataMeet] = useState({
        date : {},
        clock : {},
        city : "",
        street : "",
        remark :"",
    });
    const InfoContextt = React.useContext(Information.InfoContext);
    const createMeet = (e) =>{
        if(dataMeet.city.length<=0)Information.SetInfoError(InfoContextt,"Pole 'Miasto' jest wymagane");
        else if(dataMeet.street.length<=0)Information.SetInfoError(InfoContextt,"Pole 'Ulica' jest wymagane");
        else {
            libraryApi.ApiRequest.setSendMessageMeet((e)=>{
                Information.SetInfoError(InfoContextt,"Zaplanowano Spotkanie");
                document.querySelectorAll('.formMeet .text_input input').forEach((item) => {
                    item.value = '';
                    setDataMeet(prevstate =>({...prevstate,city:'',street:'',remark:''}));
                  });
                libraryApi.ApiRequest.getMessages((data)=>{
                    props.set_all_messages(data.data);
               })
            },dataMeet)
        }
    }
    return (<div className='optionView'>
        <div className='formMeet'>
            <DateInput onChange={(e)=>{setDataMeet(prevstate =>({...prevstate,date:e}))}}/>
            <ClockInput onChange={(e)=>{setDataMeet(prevstate =>({...prevstate,clock:e}))}}/>
            <Text placeholder="Miasto" icon="ImOffice"  onChange={(e)=>{setDataMeet(prevstate =>({...prevstate,city:e}))}}/>
            <Text placeholder="Ulica" icon="BiCurrentLocation"  onChange={(e)=>{setDataMeet(prevstate =>({...prevstate,street:e}))}}/>
            <Text placeholder="Uwagi" icon="AiFillInfoCircle"  onChange={(e)=>{setDataMeet(prevstate =>({...prevstate,remark:e}))}}/>
            <div></div>
            <div><Button text="ZATWIERDŹ" onClick={(e)=>{createMeet()}}/></div>
        </div>
    </div>)
}



export default Project;