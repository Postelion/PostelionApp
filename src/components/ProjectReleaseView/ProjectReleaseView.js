import React from 'react';
import './ProjectReleaseView.css';

function ProjectReleaseView(props)
{
    function formatDescription(descr)
    {

        return (
            <div>
                {
                    descr.split(/\n/g).map((data,key) =>(
                         <span key={key}>{data}<br/></span>
                    ))
                }
            </div>
        );
    }

    return(
        <div className='release'>
            <div className='title'>
                    <span>{props.data.name}{props.latest? <span className='latest'>(aktualna)</span>:<span></span>}</span>
                    <a href={props.data.zipball_url}  className='download'><div>POBIERZ</div></a>
            </div>
            <div className='descr'>
                    <span>{formatDescription(props.data.body)}</span>
            </div>
        </div>
    )
}
export default ProjectReleaseView;