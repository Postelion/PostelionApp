import './Button.css'


function Button(props)
{
    return (<div className='button_input' onClick={()=>{if(props.onClick!=undefined)props.onClick();}}>{props.text}</div>);
}

export default Button;