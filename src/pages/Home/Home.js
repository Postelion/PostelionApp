import React,{useState,useRef} from 'react'
import './Home.css'
import libraryTheme from '../../lib/Theme';

class Home extends React.Component
{

    render()
    {
        return (
            <div id="Home">
               <ChangeName value="asd"/>          
            </div>
        )
    }

}
function ChangeName(props)
{
    const [Status,SetStatus] = useState('text');
    const Icon = libraryTheme.GetIcon("MdEdit");
    const InputRef = useRef();

    const save = () =>
    {

    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            SetStatus('text');
        }
    }

    if(Status=='input')
    {
        return(<div className='NameCompany'>
            <input ref={InputRef} autoFocus defaultValue={props.value} onKeyDown={handleKeyPress} onBlur={()=>{SetStatus('text')}}/>
            
            </div>)
    }
    else 
    {
        return(<div className='NameCompany' onClick={()=>{SetStatus('input')}}>
            <div>{props.value}</div>
            <Icon className="IconEdit" size="20px"/>
            </div>)
    }
}

export default Home;