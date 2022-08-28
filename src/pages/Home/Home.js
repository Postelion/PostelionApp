import React,{useState,useRef} from 'react'
import './Home.css'
import libraryApi from '../../lib/Api';
import libraryTheme from '../../lib/Theme'
import {ApiComponent} from '../../lib/Classes'
import Loading from '../../components/Loading/Loading'
import * as Information from '../../components/Information/Information';

class Home extends ApiComponent
{
    Start()
    {
        this.AddRequest(libraryApi.ApiRequest.getCurrentUser);
        this.StartRequest();
    }

    Success(data)
    {
        return (
            <div id="Home">
               <ChangeName value={data[0].response[0].name}/>          
            </div>
        )
    }
    Loading()
    {
        return (
            <div id="Home">
               <Loading/>       
            </div>
        )
    }



}
function ChangeName(props)
{
    const [ValuesStat,SetValuesStat] = useState(props.value);
    const [Status,SetStatus] = useState('text');
    const Icon = libraryTheme.GetIcon("MdEdit");
    const InputRef = useRef();
    const InfoContextt = React.useContext(Information.InfoContext);
    const save = () =>
    {
        SetValuesStat(InputRef.current.value);
        libraryApi.ApiRequest.setCurrentUser(()=>{
            Information.SetInfoError(InfoContextt,"Zmieniono nazwę");
        },InputRef.current.value);
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            SetStatus('text');
            save();
        }
    }

    if(Status=='input')
    {
        return(<div className='NameCompany'>
            <input maxLength={50} ref={InputRef} autoFocus defaultValue={ValuesStat} onKeyDown={handleKeyPress} onBlur={()=>{SetStatus('text')}}/>
            
            </div>)
    }
    else 
    {
        return(<div className='NameCompany' onClick={()=>{SetStatus('input')}}>
            <div className='valueName'>{ValuesStat}</div>
            <Icon className="IconEdit" size="20px"/>
            </div>)
    }
}
function Meets(props)
{
    
}
export default Home;