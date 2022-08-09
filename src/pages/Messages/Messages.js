import React,{useEffect,useRef}from 'react'; //React
import './Messages.css'; //CSS
import libraryApi from '../../lib/Api';
import Loading from '../../components/Loading/Loading';
import {ApiComponent} from '../../lib/Classes';
import libraryTheme from '../../lib/Theme';
import { format } from "date-fns";
import { BsWindowSidebar } from 'react-icons/bs';
import { render } from '@testing-library/react';

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
    const getMessages = () =>
    {
        libraryApi.ApiRequest.getMessages((data)=>
        {
            console.log(data);
        });
    }
    useEffect(()=>{
        scrollToBottom();

        // const interval = setInterval(() => getMessages(), 2500);
    });

    return (
        <div id="Messages">
            <div className='optionsMessage'>
                <div className="values">
                    <div ref={allMesagesDiv}>
                            {
                                allMessages.map((data,key) =>(
                                    <Message date={data.date} value={data.value} sender={data.sender} receiver={data.received} key={key}/>
                                ))
                            } 
                    </div>
                </div>
                <div className='options'>
                        <Option/>
                        <Option/>
                        <Option/>
                        <Option/>
                        <Option/>
                </div>
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

function Option(props)
{
    return (
    <div className='optionView'>
        Umów spotkanie
    </div>)
}

export default Project;