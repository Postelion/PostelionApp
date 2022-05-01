import React from 'react'
import './Project.css'
import ProjectModule from '../components/ProjectModule';
import config from '../config/config';

class Project extends React.Component
{

    constructor(props)
    {
        super(props);
        // console.log((new URLSearchParams(window.location.search).get('project_id')));
        this.state= {projects:null};
        fetch(config.projects)
        .then(response => response.json())
        .then(data => this.setState({ projects: data }));
    }
    OnClickProject()
    {
        console.log((new URLSearchParams(window.location.search).get('asd')));
    }

    render()
    {
        if(this.state.projects)
        {
            return (
                <div id="Project">
                    {
                        this.state.projects.map((data,key) =>(
                            <ProjectModule key={key} data={data}/>
                        ))
                    } 
                </div>
            )
        }
        else 
        {
            return (
                <div id="Project">
                   
                </div>
            ) 
        }
    }

}

export default Project;