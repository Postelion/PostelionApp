import {ApiComponent} from '../../../lib/Classes';
import LibraryApi from '../../../lib/Api';
import {useEffect, useRef} from 'react';
import Loading from '../../../components/Loading/Loading';
import NoAuth from '../../../components/NoAuth/NoAuth';
import './AdminPanel.css';
import anime from 'animejs';

class AdminPanel extends  ApiComponent
{
    Start()
    {
        this.AddRequest(LibraryApi.ApiRequest.GetSpecificModules,'admin');
        this.AddRequest(LibraryApi.ApiRequest.GetAdminAlreadyLogged);
        this.StartRequest();
    }

    SelectSetting(index)
    {
        this.Setting = index;
        this.ResetRequest();
        this.AddRequest(LibraryApi.ApiRequest.GetAdminConfig);
        this.StartRequest();
    }

    Success(data)
    {
        return (<div id='AdminPanel'>

                    <PanelSide select={(setting)=>{ this.SelectSetting(setting) }}/>
                    <div className='Content'><GetSetting setting={this.Setting} data={data}/></div>

        </div>)
    }
    NoAuth()
    {
        return (<div id='AdminPanel'><NoAuth/></div>)
    }
    Loading()
    {
        return (
        
        <div id='AdminPanel'>

            <PanelSide select={(setting)=>{ this.SelectSetting(setting) }}/>
            <div className='Content'><Loading/></div>

        </div>)
    }
    Error(data)
    {
        return(<div></div>)
    }

}
function PanelSide(props)
{
    const menus = ['Config','Users','Permissions'];
    const hover = (index)=>{
        anime({
            targets: '#AdminPanel .PanelSide .option_'+index,
            'box-shadow': '0px 0px 15px rgba(0, 0, 0, 0.2)',
            'scale':'1.05',
            'background-color':'red'

        });
    }
    const unhover = (index)=>{
        anime({
            targets: '#AdminPanel .PanelSide .option_'+index,
            'box-shadow': '0px 0px 0px rgba(0, 0, 0, 0)',
            'scale':'1'

        });
    }
    return(
        <div className='PanelSide'>
            {
                menus.map((element,index)=>(
                    <div onClick={()=>{props.select(element)}} onMouseEnter={()=>{hover(index)}} onMouseLeave={()=>{unhover(index)}} key={index} className={'option option_'+index}><span>{element}</span></div>

                ))
            }
    
        </div>
    )
}
function GetSetting(props)
{
    switch (props.setting)
    {
        case 'Config':
            return (<ConfigGet setting={props.setting} data={props.data}/>);
        default:
            return (<div></div>);
    }
}
function ConfigGet(props)
{
    console.log(props.data[0].response[0]);
    return (<div className='Config'>
        <span>Config</span>
        <div className='data'> 
        {
            props.data[0].response.map((element,id)=>{
                if(element.value_date != null)
                {
                    return(

                        <div key={id} name={'id['+id+']'} className='option'>{element.name+': '}<input type='date' defaultValue={element.value_date}/></div>
                    )
                } else if (element.value_int != null)
                {
                    return(<div key={id} name={'id['+id+']'} className='option'>{element.name+': '}<input type='number' defaultValue={element.value_int}/></div>) 
                } else if (element.value_string != null)
                {
                    return(<div key={id} name={'id['+id+']'} className='option'>{element.name+': '}<input type='text' defaultValue={element.value_string}/></div>) 
                }
                }
            )
                       
        }
        <div>Dodaj Nową pozycje</div>
        </div>
    </div>)
}
export default AdminPanel;