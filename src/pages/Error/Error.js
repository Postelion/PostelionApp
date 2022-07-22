import React from 'react'
import './Error.css';

class Error extends React.Component
{
    render()
    {
        return(
            <div id='Error'>
                <a href='/'><img style={{content:"var(--logo)"}}/></a>
                <div className='code'>404</div>
                Niestety nic tu nie ma :(
            </div>
        );
    }

}


export default Error;