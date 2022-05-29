import {ApiComponent} from '../../../lib/Classes';
import LibraryApi from '../../../lib/Api';
import {useEffect, useRef} from 'react';
import Theme from '../../../lib/Theme';
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
                <div className='Content_panel'>
                    <PanelSide select={(setting)=>{ this.SelectSetting(setting) }}/>
                    <div className='Content'><GetSetting setting={this.Setting} data={data}/></div>
                </div>
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
    const inputRef=useRef();
    const selectRef=useRef();
    const nameRef=useRef();
    const RemoveIcon = Theme.GetIcon('AiFillDelete');
    function RemovePosition()
    {

    }
    function addNewPosition()
    {
        console.log(nameRef.current.value+': '+ inputRef.current.value);
    }
    function changeTypeInput(e)
    {
        if (e.target.value=='Liczba')
        {
            inputRef.current.type ='number';
        }
        else if (e.target.value=='Data')
        {
            inputRef.current.type ='date';
        }
        else if(e.target.value=='Tekst')
        {
            inputRef.current.type ='text';
        }
    }

    return (<div className='Config'>
        <span>Config</span>
        <div className='data'> 
        {
            props.data[0].response.map((element,id)=>{
                if(element.value_date != null)
                {
                    return(

                        <div key={id} name={'id['+id+']'} className='option'>{element.name+': '}<input type='date' defaultValue={element.value_date}/><RemoveIcon size='25px'/></div>
                    )
                } else if (element.value_int != null)
                {
                    return(<div key={id} name={'id['+id+']'} className='option'>{element.name+': '}<input type='number' defaultValue={element.value_int}/><RemoveIcon size='25px'/></div>) 
                } else if (element.value_string != null)
                {
                    return(<div key={id} name={'id['+id+']'} className='option'>{element.name+': '}<input type='text' defaultValue={element.value_string}/><RemoveIcon size='25px'/></div>) 
                }
                }
            )
                       
        }        
    </div>
    <div className='addNewPosition' >
        <input ref={nameRef} placeholder='Nazwa' type='text'/>
        <input ref={inputRef} placeholder='Wartość' type='text'/>
        <select ref={selectRef} onChange={changeTypeInput}>
            <option value='Tekst'>Tekst</option>
            <option value='Liczba'>Liczba</option>
            <option value='Data'>Data</option>
        </select>
        <div onClick={()=>{addNewPosition()}}>Dodaj Nowe Ustawienie</div>
    </div>
</div>)
}
export default AdminPanel;