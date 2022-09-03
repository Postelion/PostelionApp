import React,{useState,useRef, useEffect} from 'react'
import './Home.css'
import libraryApi from '../../lib/Api';
import libraryTheme from '../../lib/Theme'
import {ApiComponent} from '../../lib/Classes'
import Loading from '../../components/Loading/Loading'
import * as Information from '../../components/Information/Information';
import { format } from "date-fns";

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
               <Meets/>     
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
    let prevValue =ValuesStat;
    const InputRef = useRef();
    const Icon = libraryTheme.GetIcon("AiFillInfoCircle");
    const infoText = "Nazwa firmy wykorzystywana w dalszych akcjach na stronie, jeżeli nazwa firmy nie jest zgodna z rzeczywistym stanem, proszę poprawić wartość poprzez edycje pola";
    const InfoContextt = React.useContext(Information.InfoContext);
    const save = () =>
    {
        if(prevValue!= InputRef.current.value)
        {
            SetValuesStat(InputRef.current.value);
            libraryApi.ApiRequest.setCurrentUser(()=>{
                Information.SetInfoError(InfoContextt,"Zmieniono nazwę");
            },InputRef.current.value);
        }
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            save();
        }
    }

        return(<div className='NameCompany'>
             <span className='widget_title'>NAZWA FIRMY<Icon className="widget_title_info" title={infoText}/></span> 
            <input  maxLength={50} ref={InputRef} defaultValue={ValuesStat} onKeyDown={handleKeyPress} onBlur={()=>{save()}}/>
            
            </div>)
}
function Meets(props)
{
    const [meetsData, setMeetsData]=React.useState({page:0,datas:null});
    useEffect(()=>
    {
        libraryApi.ApiRequest.getMeets((data)=>{
            setMeetsData(prevState => {
                return {...prevState, datas:data.data};
              });
        });
    },[])
    const IconPrev=libraryTheme.GetIcon("BsFillArrowLeftCircleFill");
    const IconNext=libraryTheme.GetIcon("BsFillArrowRightCircleFill");

    const prevPage = () =>
    {
        setMeetsData(prevState => {
            return {...prevState, page:meetsData.page-1};
          });
    }

    const nextPage = ()=>
    {
        setMeetsData(prevState => {
            return {...prevState, page:meetsData.page+1};
          });
    }
    
    const declineMeet = () =>
    {
        console.log("decline");
    }


    return (<div className='home_widget_meets'>
        {meetsData.datas!=null &&
            <span className='widget_title ' >SPOTKANIA {meetsData.datas.length>1&& meetsData.page+1 +'/'+meetsData.datas.length} {meetsData.datas.length>1&& <span className='widget_meet_title_navigation' ><div className='clickable'  onClick={()=>{if(meetsData.page!=0) prevPage()}}><IconPrev/></div><div className='clickable' onClick={()=>{if(meetsData.page+1 != meetsData.datas.length) nextPage()}}><IconNext/></div></span>}</span>
        }       
        {meetsData.datas!=null &&
        <div className='widget_content'>

            <div >
                {format(Date.parse(meetsData.datas[meetsData.page].date), "dd.MM.yyyy HH:mm")}
            </div>
            <div >{meetsData.datas[meetsData.page].city}</div>
            <div >{meetsData.datas[meetsData.page].street}</div>
            {meetsData.datas[meetsData.page].remarks!=undefined?<div >{meetsData.datas[meetsData.page].remarks}</div>:null}
            <br/>
            <div >Status: {meetsData.datas[meetsData.page].confirm_status== 0?'Oczekuje na akceptacje':meetsData.datas[meetsData.page].confirm_status== 1?'Zaakceptowano':'Brak akceptacji'}</div>
            <div ><span className='widget_meets_decline shadow clickable' onClick={()=>{declineMeet()}}>ODWOŁAJ</span></div>
        </div>
        }
        
    </div>)
}
export default Home;