import React from 'react';
import './ProjectReleaseView.css';

function ProjectReleaseView(props)
{


    return(
        <div className='release'>
            <div className='title'>
                    <span>{props.data.name}{props.latest? <span className='latest'>(aktualna)</span>:<span></span>}</span>
                    <a href={props.data.zipball_url}  className='download'><div>POBIERZ</div></a>
            </div>
            <div className='descr'>
                    <span>{props.data.body}</span>
            </div>
        </div>
    )
}
export default ProjectReleaseView;