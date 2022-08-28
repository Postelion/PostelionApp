import './Text.css';
import React from 'react';
import LibraryTheme from './../../../lib/Theme';

function Text(props)
{
    const input = React.useRef();
    const Icon = LibraryTheme.GetIcon(props.icon);
    return (<div className='text_input'>
        <input ref={input} placeholder={props.placeholder} onChange={(e)=>{if(props.onChange!=undefined)props.onChange(input.current.value)}}/>
        <Icon/>
    </div>);
}

export default Text;