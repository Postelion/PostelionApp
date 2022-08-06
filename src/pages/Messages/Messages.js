import React,{useEffect,useRef}from 'react'; //React
import './Messages.css'; //CSS
import libraryApi from '../../lib/Api';
import Loading from '../../components/Loading/Loading';
import {ApiComponent} from '../../lib/Classes';
import libraryTheme from '../../lib/Theme';

class Project extends ApiComponent
{

    Start()
    {
        this.AddRequest(libraryApi.ApiRequest.getMessages);
        this.StartRequest();
    }

    Success(data)
    {
        const Icon = libraryTheme.GetIcon('MdSend');
        return(
            <div id="Messages">
                <div className="values"></div>
                <div className="inputValue">
                    <div>
                        <textarea placeholder='Napisz Wiadomość' />
                        <div className='send'>
                            <Icon size='30px' color='var(--FontColor)'/>
                        </div>
                    
                    </div>
                </div>
            </div>
        )
    }
}

function Message(props)
{
    
}

export default Project;