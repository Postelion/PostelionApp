import React,{useState,useRef} from 'react'
import './Home.css'
<<<<<<< HEAD
import {ApiComponent} from '../../lib/Classes';
import libraryApi from '../../lib/Api';
=======
import libraryApi from '../../lib/Api';
import libraryTheme from '../../lib/Theme'
import {ApiComponent} from '../../lib/Classes'
>>>>>>> 38fe030c9ff4dcb51d213768b908a46ab0fadf49
import Loading from '../../components/Loading/Loading'

class Home extends ApiComponent
{
    Start()
<<<<<<< HEAD
    {
        this.AddRequest(libraryApi.ApiRequest.GetUserGet);
        this.StartRequest();
=======
    {
        this.AddRequest(libraryApi.ApiRequest.GetCompanyName);
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
>>>>>>> 38fe030c9ff4dcb51d213768b908a46ab0fadf49
    }


   Success(data)
   {
    return(<div id='Home'>
        <span className='WelcomeText'>WITAJ
            <span className='NextText'>Aktualnie przypisana nazwa firmy to: {data[0].response[0].name}</span>
            <span className='NextText'></span>
        </span>

    </div>)
   }

}
function ChangeName(props)
{
    const [ValuesStat,SetValuesStat] = useState(props.value);
    const [Status,SetStatus] = useState('text');
    const Icon = libraryTheme.GetIcon("MdEdit");
    const InputRef = useRef();

    const save = () =>
    {
        SetValuesStat(InputRef.current.value);
        libraryApi.ApiRequest.SetCompanyName(null,InputRef.current.value);
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

export default Home;